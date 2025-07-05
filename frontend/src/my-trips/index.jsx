import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig'; // adjust path
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const MyTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchTrips = async () => {
      try {
        const tripsRef = collection(db, 'AiTrips');
        const q = query(tripsRef, where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);

        const fetchedTrips = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [navigate, user]);

  const handleDelete = async (tripId) => {
    try {
      await deleteDoc(doc(db, 'AiTrips', tripId));
      setTrips(prev => prev.filter(trip => trip.id !== tripId));
    } catch (error) {
      console.error("Failed to delete trip:", error);
    }
  };

  const handleViewTrip = (tripId) => {
    navigate(`/view-trip/${tripId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Trips</h1>

      {trips.length === 0 ? (
        <p className="text-gray-600">No trips found for your account.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const data = trip.tripData || {};
            const hotels = data.hotels || [];
            const image = hotels[0]?.image_url || 'https://via.placeholder.com/300x200';
            const location = data.location || data.userSelection?.destination || 'Unknown';
            const duration = data.duration_days || data.userSelection?.noOfDays || '-';
            const tripType = data.trip_type || data.userSelection?.travelWith || '-';

            return (
              <Card key={trip.id} className="overflow-hidden shadow-lg">
                <img src={image} alt="Trip" className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{location}</h2>
                  <p className="text-sm text-gray-600 mb-2">🗓 {duration} days &nbsp;|&nbsp; 👨‍👩‍👧 {tripType}</p>
                  <div className="flex justify-between mt-3">
                    <Button onClick={() => handleViewTrip(trip.id)}>View</Button>
                    <Button variant="destructive" onClick={() => handleDelete(trip.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
