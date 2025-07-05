export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A solo adventure begins',
    icon: '🧍‍♂️',
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Exploring the world together',
    icon: '👫',
    people: '2 People',
  },
  {
    id: 3,
    title: 'With Friends',
    desc: 'Memories made with the crew',
    icon: '👬',
    people: '3–5 People',
  },
  {
    id: 4,
    title: 'Family Trip',
    desc: 'Fun for all ages',
    icon: '👨‍👩‍👧‍👦',
    people: '4+ People',
  }
];

export const BudgetOptionsList = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Backpack-style on a shoestring',
    icon: '💸',
    range: '₹',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balanced comfort and cost',
    icon: '💰',
    range: '₹₹',
  },
  {
    id: 3,
    title: 'Premium',
    desc: 'Upscale and stylish choices',
    icon: '🪙',
    range: '₹₹₹',
  },
  {
    id: 4,
    title: 'Luxury',
    desc: 'Top-tier indulgent experience',
    icon: '💎',
    range: '₹₹₹₹',
  }
];

export const AI_PROMPT="Generate Travel Plan for Location: {location}, for {totalDays} for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. Respond only with valid JSON. Do not include markdown."