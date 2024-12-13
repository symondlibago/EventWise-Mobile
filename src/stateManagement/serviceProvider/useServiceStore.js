import { create } from "zustand";

const useServiceStore = create((set) => ({
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
}));

export { useServiceStore };
