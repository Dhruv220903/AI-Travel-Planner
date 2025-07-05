import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";  
import { toast } from 'sonner';
import { db } from '../../service/firebaseConfig';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit'
function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    try {
      const docs = doc(db, "AiTrips", tripId);
      const singleDoc = await getDoc(docs);
      if (singleDoc.exists()) {
        setTrip(singleDoc.data());
      } else {
        toast.error("No trip found");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Something went wrong while fetching trip data");
    }
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-46">
      {trip ? <InfoSection trip={trip} /> : <p>Loading trip data...</p>}

      <Hotels trip={trip}></Hotels>

      <PlacesToVisit trip={trip}></PlacesToVisit>
    </div>
  )
}

export default ViewTrip;
