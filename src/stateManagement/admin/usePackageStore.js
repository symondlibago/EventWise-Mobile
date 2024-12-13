import { create } from "zustand";

const usePackageStore = create((set) => ({
  currentPackages: [],
  newPackage: {
    packageName: "",
    eventType: "",
    services: [], // Initialize services as an empty array
    totalPrice: "",
    coverPhoto: "",
    packageCreatedDate: "",
  },

  updateNewPackage: (key, value) =>
    set((state) => ({
      newPackage: {
        ...state.newPackage,
        [key]: value,
      },
    })),

  // Function to set the list of packages
  setCurrentPackages: (currentPackages) => set({ currentPackages }),

  // Function to add a service ID to the services array
  addService: (serviceId) =>
    set((state) => ({
      newPackage: {
        ...state.newPackage,
        services: [...state.newPackage.services, serviceId],
      },
    })),

  // Function to remove a service ID from the services array
  removeService: (serviceId) =>
    set((state) => ({
      newPackage: {
        ...state.newPackage,
        services: state.newPackage.services.filter((id) => id !== serviceId),
      },
    })),

  // Function to reset newPackage to default values
  resetNewPackage: () =>
    set(() => ({
      newPackage: {
        packageName: "",
        eventType: "",
        services: [],
        totalPrice: "",
        coverPhoto: "",
        packageCreatedDate: "",
      },
    })),

  // Add any other functions needed for managing package data in your store here.
}));

export { usePackageStore };
