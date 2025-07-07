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

export const AI_PROMPT = `
Generate a travel plan for the location: {location}, for {totalDays} days for {traveler} with a {budget} budget.

1. Provide a hotels list with each hotel having:
- hotelName
- hotelAddress
- price
- hotelImageUrl
- geoCoordinates
- rating
- description

2. Suggest an itinerary for {totalDays} days.
For each day, list places with:
- placeName
- placeDetails
- placeImageUrl
- geoCoordinates
- ticketPricing
- rating
- timeTravel
- bestTimeToVisit

Format your entire response in **valid JSON only**. Do not include markdown or text outside the JSON.

🚨 Important Instructions:
- Use **camelCase** for all keys (e.g., hotelName, placeImageUrl)
- **Do not** use snake_case or PascalCase
- All keys must start with a **lowercase** letter
- Respond with JSON only
`;
