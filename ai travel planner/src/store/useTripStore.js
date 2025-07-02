// src/store/useTripStore.js
import { create } from 'zustand';

const useTripStore = create((set) => ({
  selectedCity: '',
  setSelectedCity: (city) => set({ selectedCity: city }),
}));

export default useTripStore;
