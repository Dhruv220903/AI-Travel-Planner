import React, { useState, useEffect  } from "react";
import useTripStore from "../store/useTripStore";
import CitySelector from "../components/custom/DestinationSelector";
import { Input } from "@/components/ui/input";
import {AI_PROMPT,BudgetOptionsList,SelectTravelsList,} from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";  
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "../service/firebaseConfig";
import { useNavigate} from "react-router-dom";


function CreateTrip() {
  const selectedCity = useTripStore((state) => state.selectedCity);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog]=useState(false);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    if (selectedCity) {
      setFormData((prev) => ({ ...prev, destination: selectedCity }));
    }
  }, [selectedCity]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login=useGoogleLogin({
    onSuccess:(Response)=>getUserProfile(Response),
    onError:(e)=>console.log(e),
  })

 const getUserProfile = (tokenInfo) => {
  axios
    .get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
      params: {
        access_token: tokenInfo?.access_token, // correct spelling
      },
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('user',
        JSON.stringify(res.data))
        setOpenDialog(false);
        onGenerateTrip();
    })
    .catch((err) => {
      console.error('Error fetching user profile:', err);
    });
};
const onGenerateTrip = async () => {

    const user=localStorage.getItem('user')
    if(!user){
      setOpenDialog(true);
      return
    }
    if (
      formData?.noOfDays > 5 &&
      (!formData?.budget ||
        formData?.budget < 0 ||
        !formData?.noOfDays ||
        formData?.noOfDays < 0 ||
        !formData?.destination)
    ) {
      toast("Please fill all details correctly");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.destination)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.travelWith)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

      

       try {
    const res = await fetch('https://ai-travel-planner-7yhg.onrender.com/api/generate-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: FINAL_PROMPT }),
    });

    const data = await res.json();
    setLoading(false);
    console.log( data.response);
    SaveAiTrip(data.response);
  } catch (error) {
    toast.error("Error:", error);
  }
  };

  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
 
    const user=JSON.parse(localStorage.getItem('user'))
    const docId=Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
  userSelection: formData,
  tripData: TripData,
  userEmail: user.email,
  id:docId,

});

setLoading(false);
navigate(`/view-trip/${docId}`);
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      ,{/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Plan Your Perfect Trip 🧭
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Select your destination, travel style, and preferences — our AI will
          build your itinerary instantly.
        </p>
      </div>
      {/* Form */}
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-200 space-y-8">
        {/* Destination */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            🌍 Destination
          </h3>
          <CitySelector />
        </div>

        {/* Trip Duration */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            🗓️ Duration
          </h3>
          <Input
            placeholder="Number of days (e.g. 5)"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            💰 Budget
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BudgetOptionsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`rounded-xl p-4 border text-center cursor-pointer transition-all duration-200 ${
                  formData.budget === item.title
                    ? " shadow-lg border-blue-500 bg-blue-50"
                    : "hover:border-blue-300"
                }`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Type */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            🧳 Who's going?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("travelWith", item.title)}
                className={`rounded-xl p-4 border text-center cursor-pointer transition-all duration-200 ${
                  formData.travelWith === item.title
                    ? "  border-blue-500 shadow-lg bg-blue-50"
                    : "hover:border-blue-300"
                }`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
          disabled={loading}
            size="lg"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={onGenerateTrip}>
            {loading ? <> <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> Generating Trip...</>: "🧠 Generate My Trip"}
          
           
          </Button>
        </div>
      </div>

            <Dialog open={openDialog}>
       
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Sign IN
            </DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with google authentication securely</p>
              <Button className="w-full mt-5" onClick={login}><FcGoogle />Sign in with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
