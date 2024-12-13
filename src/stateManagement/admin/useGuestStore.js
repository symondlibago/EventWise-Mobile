import { create } from "zustand";

const useGuestStore = create((set) => ({
  guests: [], // Array to hold the fetched guest data
  newGuest: {
    GuestName: "",
    email: "",
    phone: "",
  }, // Template for a new guest entry
  updateNewGuest: (key, value) =>
    set((state) => ({
      newGuest: { ...state.newGuest, [key]: value },
    })), // Update a specific field in newGuest
  setGuests: (guests) => set({ guests }), // Set the fetched guests array
  addGuest: (guest) => set((state) => ({ guests: [...state.guests, guest] })), // Add a new guest to the array
  removeGuest: (id) =>
    set((state) => ({
      guests: state.guests.filter((guest) => guest.id !== id),
    })), // Remove a guest by ID
}));

export { useGuestStore };
