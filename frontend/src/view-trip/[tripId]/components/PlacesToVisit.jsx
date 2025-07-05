import React from 'react';
import { FaStar } from 'react-icons/fa';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary || [];

  if (itinerary.length === 0) {
    return <p className="text-gray-600 mt-4">No itinerary found for this trip.</p>;
  }

  return (
    <div className="my-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📍 Places to Visit</h2>

      {itinerary.map((day, index) => (
        <div key={index} className="mb-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-600 mb-2">Day {day.Day}</h3>
          <p className="text-gray-700 mb-6">{day.DayPlanDescription}</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {day.Activities.map((activity, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                <img
                  src={activity.PlaceImageUrl}
                  alt={activity.PlaceName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-1">
                  <h4 className="text-lg font-semibold text-gray-800">{activity.PlaceName}</h4>
                  <p className="text-sm text-gray-600">{activity.PlaceDetails}</p>

                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full w-fit">
                      ⏱️ Time to Spend: {activity.TimeTravel}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full w-fit">
                      🎫 Ticket: {activity.TicketPricing}
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full w-fit">
                      🕒 Best Time: {activity.BestTimeToVisit}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(activity.Rating) ? 'text-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm text-gray-600">({activity.Rating})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
