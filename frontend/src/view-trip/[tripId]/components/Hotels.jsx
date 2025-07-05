import React from 'react';
import { FaStar } from 'react-icons/fa';

function Hotel({ trip }) {
  const hotelList = trip?.tripData?.Hotels?.map((hotel, idx) => ({
    ...hotel,
    hotelImageUrl: hotel.hotelImageUrl || `https://source.unsplash.com/400x300/?hotel,room,${idx}`,
  })) || [];

  if (hotelList.length === 0) {
    return <p className="text-gray-600 mt-4">No hotel recommendations available.</p>;
  }

  const getGoogleMapsUrl = (name, address) => {
    const query = encodeURIComponent(`${name} ${address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full">
      <h2 className="font-bold text-2xl mb-4 text-gray-800">Hotel Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotelList.map((item, index) => (
          <a
            key={index}
            href={getGoogleMapsUrl(item.hotelName, item.hotelAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <img
              src={item.hotelImageUrl}
              alt={item.hotelName}
              className="h-[180px] w-full object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.hotelName}</h3>
              <p className="text-sm text-gray-600">{item.hotelAddress}</p>
              <p className="text-sm text-gray-600">Price: ₹{item.pricePerNightINR}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(item.rating) ? 'text-yellow-500' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({item.rating})</span>
              </div>
              <p className="text-blue-600 text-sm underline mt-1">View on Map</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hotel;
