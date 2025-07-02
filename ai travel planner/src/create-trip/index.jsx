import React, { useState, useEffect } from 'react';
import useTripStore from '../store/useTripStore';
import CitySelector from '../components/custom/DestinationSelector';
import { Input } from "@/components/ui/input";
import { BudgetOptionsList, SelectTravelsList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

function CreateTrip() {
  const selectedCity = useTripStore((state) => state.selectedCity);
  const [formData, setFormData] = useState({});

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

  const onGenerateTrip=()=>{
    if (
  formData?.noOfDays > 5 && (
    !formData?.location || 
    !formData?.budget || formData?.budget < 0 || 
    !formData?.noOfDays || formData?.noOfDays < 0 || 
    !formData?.destination
  )
) {
  toast("Please fill all details correctly")
  return;
}

    console.log("form submitted",formData);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Plan Your Perfect Trip 🧭
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Select your destination, travel style, and preferences — our AI will build your itinerary instantly.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-200 space-y-8">
        {/* Destination */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">🌍 Destination</h3>
          <CitySelector />
         
        </div>

        {/* Trip Duration */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">🗓️ Duration</h3>
          <Input
            placeholder="Number of days (e.g. 5)"
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">💰 Budget</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BudgetOptionsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`rounded-xl p-4 border text-center cursor-pointer transition-all duration-200 ${
                  formData.budget === item.title
                    ? ' shadow-lg border-blue-500 bg-blue-50'
                    : 'hover:border-blue-300'
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
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🧳 Who's going?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('travelWith', item.title)}
                className={`rounded-xl p-4 border text-center cursor-pointer transition-all duration-200 ${
                  formData.travelWith === item.title
                    ? '  border-blue-500 shadow-lg bg-blue-50'
                    : 'hover:border-blue-300'
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
            size="lg"
            
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={onGenerateTrip}
          >
            🧠 Generate My Trip
          </Button >
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
