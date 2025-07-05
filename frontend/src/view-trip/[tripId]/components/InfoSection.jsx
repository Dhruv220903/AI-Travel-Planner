import React from 'react';
import { FaMapMarkerAlt, FaClock, FaWallet, FaUsers } from 'react-icons/fa';

function InfoSection({ trip }) {
  console.log(trip);

  return (
    <div className="space-y-6">
      {/* Trip image */}
      <img
        src="/placeholder.jpg"
        alt="Trip destination"
        className="h-[300px] w-full object-cover rounded-2xl shadow-md"
      />

      {/* Trip details */}
      <div className="space-y-3">
        {/* Destination */}
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-600" />
          {trip?.userSelection?.destination}
        </h2>

        {/* Info badges */}
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm shadow-sm">
            <FaClock className="text-gray-500" />
            {trip?.userSelection?.noOfDays} days
          </div>
          <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm shadow-sm">
            <FaWallet className="text-gray-500" />
            ₹{trip?.userSelection?.budget}
          </div>
          <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm shadow-sm">
            <FaUsers className="text-gray-500" />
            {trip?.userSelection?.traveler}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
