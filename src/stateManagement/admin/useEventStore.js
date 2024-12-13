import { create } from "zustand";

const useEventStore = create((set) => ({
  currentEvents: [],
  newEvent: {
    name: "",
    type: "",
    pax: "",
    status: "",
    totalPrice: "",
    date: "",
    time: "",
    location: "",
    description: "",
    coverPhoto: "",
    packages: [],
  },

  updateNewEvent: (key, value) =>
    set((state) => ({
      newEvent: {
        ...state.newEvent,
        [key]: value,
      },
    })),

  // Function to set the list of events
  setCurrentEvents: (currentEvents) => set({ currentEvents }),

  // Function to add a package to the packages array
  addPackage: (packageId) =>
    set((state) => ({
      newEvent: {
        ...state.newEvent,
        packages: [...state.newEvent.packages, packageId],
      },
    })),

  // Function to remove a package from the packages array
  removePackage: (packageId) =>
    set((state) => ({
      newEvent: {
        ...state.newEvent,
        packages: state.newEvent.packages.filter((id) => id !== packageId),
      },
    })),

  // Function to reset newEvent to default values
  resetNewEvent: () =>
    set(() => ({
      newEvent: {
        name: "",
        type: "",
        pax: "",
        status: "",
        totalPrice: "",
        date: "",
        time: "",
        location: "",
        description: "",
        coverPhoto: "",
        packages: [],
      },
    })),

  // Add any other functions needed for managing event data in your store here.
}));

export { useEventStore };
