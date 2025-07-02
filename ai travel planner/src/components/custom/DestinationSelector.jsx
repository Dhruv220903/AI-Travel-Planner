import React, { useState } from "react";
import { cities } from "world-cities-json";
import useTripStore from "../../store/useTripStore"; // update path if needed

const CitySelector = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const setSelectedCity = useTripStore((state) => state.setSelectedCity);

  const handleChange = (e) => {
    const input = e.target.value;
    setSearch(input);

    const results = cities
      .filter((c) =>
        c.city_ascii.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 20);

    setFiltered(input ? results : []);
  };

  const handleSelect = (cityObj) => {
    const full = `${cityObj.city_ascii}, ${cityObj.country}`;
    setSelectedCity(full); // ✅ Store in Zustand
    setSearch(full);
    setFiltered([]);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Start typing a city..."
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {filtered.length > 0 && (
        <ul className="border rounded-md mt-1 shadow-md max-h-60 overflow-y-auto bg-white z-10">
          {filtered.map((c, i) => (
            <li
              key={i}
              onClick={() => handleSelect(c)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {c.city_ascii}, {c.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelector;
