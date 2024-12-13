import { create } from "zustand";

const useServicesStore = create((set) => ({
  services: [],
  newService: {
    serviceName: "",
    serviceCategory: "",
    serviceFeatures: "",
    basePrice: "",
    servicePhoto: "",
    pax: "",
    requirements: "",
    availability_status: true,
  },

  updateNewService: (key, value) =>
    set((state) => ({ newService: { ...state.newService, [key]: value } })),
  setServices: (services) => set({ services }),

  inEventServices: [],
  setInEventServices: (services) => set({ inEventServices: services }),
}));

export { useServicesStore };
