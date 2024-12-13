import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";
import { fetchPackages } from "../services/organizer/organizerServices";
const useStore = create((set) => ({
  user: null,
  accountProfiles: [],
  activeProfile: null,
  loading: true,
  navigation: null, // Store navigation object here

  // Theme-related state and methods
  theme: "default", // Initial theme state
  setTheme: async (theme) => {
    await AsyncStorage.setItem("Theme", theme); // Persist the theme
    set({ theme });
  },
  initializeTheme: async () => {
    const savedTheme = await AsyncStorage.getItem("Theme");
    if (savedTheme) {
      set({ theme: savedTheme });
    } else {
      set({ theme: "default" });
    }
  },

  // User-related state and methods
  setUser: (user) => set({ user }),
  setAccountProfiles: (profiles) => set({ accountProfiles: profiles }),
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  setLoading: (loading) => set({ loading }),
  setNavigation: (navigation) => set({ navigation }),

  // Fetch and set user and account profiles
  fetchUserAndProfiles: async () => {
    set({ loading: true });
    try {
      const user = await getUser();
      set({ user });

      const profileResponse = await getAccountProfile();
      const profiles = profileResponse.data.filter(
        (profile) => profile.user_id === user.id
      );
      set({ accountProfiles: profiles });

      const storedProfile = await AsyncStorage.getItem("activeProfile");
      if (storedProfile) {
        set({ activeProfile: JSON.parse(storedProfile) });
      } else if (profiles.length > 0) {
        set({ activeProfile: profiles[0] });
      }
    } catch (error) {
      console.error("Error fetching user and profiles:", error);
    } finally {
      set({ loading: false });
    }
  },
  // profile infomration
  userName: "Avril Carasco",
  userEmail: "AvrilCarasco@gmail.com",
  userPhone: "1234567890",
  userPassword: "1234567890",
  setUserName: (name) => set({ userName: name }),
  setUserEmail: (email) => set({ userEmail: email }),
  setUserPhone: (phone) => set({ userPhone: phone }),
  setUserPassword: (password) => set({ userPassword: password }),

  // handling save for backend API
  // const handleSave = async () => {
  //   try {
  //     await AsyncStorage.setItem('userProfile', JSON.stringify({
  //       userName,
  //       userEmail,
  //       userPassword,
  //       userPhone,
  //     }));
  //     Alert.alert("Success", "Profile saved locally!");
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to save profile.");
  //     console.error(error);
  //   }
  // };
  // switch profile
  switchProfile: async (profile) => {
    try {
      set({ activeProfile: profile });
      await AsyncStorage.setItem("activeProfile", JSON.stringify(profile));

      // Handle token update if necessary
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        await AsyncStorage.setItem(`authToken-${profile.id}`, token);
      }

      // Navigate to the main screen after profile switch
      const { navigation } = get();
      if (navigation) {
        navigation.navigate("CustomerStack", { screen: "TabNav" }); // Adjust the route as needed
      }
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  },
  // adminDrawerContent Drawer Admin
  selectedDrawerScreen: "HomeAdmin",
  setSelectedDrawerScreen: (screenName) =>
    set({ selectedDrawerScreen: screenName }),

  // calendar-related state and methods

  // attendee-related state and methods attendee modals
  attendeeSeries: [150, 700, 500], // Add series state
  attendeeSliceColor: ["#ff3c00", "rgba(9,226,0,1)", "#fbd203"], // Add sliceColor state
  modalVisiblePresent: false,
  modalVisibleAbsent: false,
  modalVisibleLate: false,
  setmodalVisiblePresent: (visible) => set({ modalVisiblePresent: visible }),
  setmodalVisibleAbsent: (visible) => set({ modalVisibleAbsent: visible }),
  setmodalVisibleLate: (visible) => set({ modalVisibleLate: visible }),
  // feedback-related state and methods feedback analysis, feedback form,
  // event and feedback concern

  // For event data and methods also package
  // Event-related state and methods

  count: 0,
  increaseCount: async () => {
    set((state) => {
      const newCount = state.count + 1;
      AsyncStorage.setItem("likedEventsCount", JSON.stringify(newCount));
      return { count: newCount };
    });
  },
  decreaseCount: async () => {
    set((state) => {
      const newCount = state.count - 1;
      AsyncStorage.setItem("likedEventsCount", JSON.stringify(newCount));
      return { count: newCount };
    });
  },

  likedEvents: {},

  toggleLike: async (eventId) => {
    set((state) => {
      const updatedLikedEvents = {
        ...state.likedEvents,
        [eventId]: !state.likedEvents[eventId],
      };

      // Update count based on whether the event is liked or not
      const updatedCount = state.count + (state.likedEvents[eventId] ? -1 : 1);

      // Persist the updated liked events and count
      AsyncStorage.setItem("likedEvents", JSON.stringify(updatedLikedEvents));
      AsyncStorage.setItem("likedEventsCount", JSON.stringify(updatedCount));

      return {
        likedEvents: updatedLikedEvents,
        count: updatedCount,
      };
    });
  },

  initializeLikedEvents: async () => {
    const savedLikedEvents = await AsyncStorage.getItem("likedEvents");
    const savedCount = await AsyncStorage.getItem("likedEventsCount");

    if (savedLikedEvents) {
      set({ likedEvents: JSON.parse(savedLikedEvents) });
    }

    if (savedCount) {
      set({ count: JSON.parse(savedCount) });
    }
  },

  // addEvent: (newEvent) =>
  //   set((state) => ({
  //     events: [...state.events, { ...newEvent, id: Date.now() }], // Add unique ID
  //   })),
  addEvent: (newEvent) =>
    set((state) => ({
      eventData: [
        ...state.eventData,
        {
          eventId: Date.now().toString(),
          ...newEvent,
          eventImage: newEvent.coverPhoto
            ? { uri: newEvent.coverPhoto }
            : // : require("../../../../../assets/event2.png"),
              null,
          feedbackData: [], // Initialize with empty feedback or as needed
        },
      ],
    })),

  eventData: [],

  eventPackages: [
    // {
    //   packageId: "package1",
    //   packageName: "Debut 18 Special Package",
    //   eventType: "Birthday",
    //   serviceInclude: [{ serviceId: "service1" }, { serviceId: "service2" }],
    //   basePrice: 3000,
    //   packageImage: "", //require("../../../../../assets/package1.png"), // Ensure correct path
    //   packageDescription:
    //     "A special package tailored for Debut 18 celebrations, including food and photography services.",
    // },
    // Add more packages for other event types (e.g., Wedding, Conference)
  ],

  // Function to add a new package
  addEventPackage: (newPackage) =>
    set((state) => ({
      eventPackages: [
        ...state.eventPackages,
        {
          packageId: newPackage.id || Date.now().toString(), // Use package ID from backend or generate one
          ...newPackage,
          packageImage: newPackage.coverPhoto
            ? { uri: newPackage.coverPhoto }
            : null,
          totalPrice: newPackage.totalPrice || 0,
        },
      ],
    })),

  // Function to fetch packages and set them in the store
  fetchEventPackages: async () => {
    try {
      const packages = await fetchPackages();
      set({ eventPackages: packages });
    } catch (error) {
      console.error("Failed to fetch event packages:", error);
      // Optionally handle error state
    }
  },

  // Updated fetchPackages to set directly
  setEventPackages: (packages) => set({ eventPackages: packages }),

  // addEventPackage: (newPackage) =>
  //   set((state) => ({
  //     eventPackages: [
  //       ...state.eventPackages,
  //       {
  //         packageId: Date.now().toString(),
  //         ...newPackage,
  //         packageImage: newPackage.coverPhoto
  //           ? { uri: newPackage.coverPhoto }
  //           : //  require("../../../../../assets/event2.png"),
  //             null,
  //         totalPrice: newPackage.totalPrice || 0,
  //       },
  //     ],
  //   })),
  servicesList: [
    {
      serviceId: "service1",
      serviceName: "Jolibee special food package",
      serviceCategory: "Food Catering",
      basePrice: 1400,
    },
    {
      serviceId: "service2",
      serviceName: "McDonald's party package",
      serviceCategory: "Food Catering",
      basePrice: 1200,
    },
    {
      serviceId: "service3",
      serviceName: "KFC bucket meal",
      serviceCategory: "Food Catering",
      basePrice: 1000,
    },
    {
      serviceId: "service4",
      serviceName: "Wedding photography package",
      serviceCategory: "Event Services",
      basePrice: 8000,
    },
    {
      serviceId: "service5",
      serviceName: "DJ services for events",
      serviceCategory: "Event Services",
      basePrice: 5000,
    },
    {
      serviceId: "service6",
      serviceName: "Floral arrangement for events",
      serviceCategory: "Event Services",
      basePrice: 3000,
    },
    {
      serviceId: "service7",
      serviceName: "Catering services for corporate events",
      serviceCategory: "Food Catering",
      basePrice: 2000,
    },
    {
      serviceId: "service8",
      serviceName: "Event planning and coordination",
      serviceCategory: "Event Services",
      basePrice: 10000,
    },
    {
      serviceId: "service9",
      serviceName: "Audio-visual equipment rental",
      serviceCategory: "Event Services",
      basePrice: 1500,
    },
    {
      serviceId: "service10",
      serviceName: "Wedding videography package",
      serviceCategory: "Event Services",
      basePrice: 6000,
    },
    {
      serviceId: "service11",
      serviceName: "Food truck services for events",
      serviceCategory: "Food Catering",
      basePrice: 2500,
    },
    {
      serviceId: "service12",
      serviceName: "Event staffing and management",
      serviceCategory: "Event Services",
      basePrice: 8000,
    },
    {
      serviceId: "service13",
      serviceName: "Customized event decorations",
      serviceCategory: "Event Services",
      basePrice: 4000,
    },
    {
      serviceId: "service14",
      serviceName: "Live band performance for events",
      serviceCategory: "Event Services",
      basePrice: 10000,
    },
    {
      serviceId: "service15",
      serviceName: "Event lighting and sound services",
      serviceCategory: "Event Services",
      basePrice: 2000,
    },
    {
      serviceId: "service16",
      serviceName: "Wedding cake design and creation",
      serviceCategory: "Food Catering",
      basePrice: 3000,
    },
    {
      serviceId: "service17",
      serviceName: "Event furniture and equipment rental",
      serviceCategory: "Event Services",
      basePrice: 1500,
    },
    {
      serviceId: "service18",
      serviceName: "Customized event invitations",
      serviceCategory: "Event Services",
      basePrice: 1000,
    },
    {
      serviceId: "service19",
      serviceName: "Event photography package",
      serviceCategory: "Event Services",
      basePrice: 5000,
    },
    {
      serviceId: "service20",
      serviceName: "Full-service event planning and coordination",
      serviceCategory: "Event Services",
      basePrice: 15000,
    },
    {
      serviceId: "service02",
      serviceName: "Diwata Beef pares",
      serviceCategory: "Food Catering",
      basePrice: 1600,
    },
    {
      serviceId: "service3",
      serviceName: "Wedding Photography Package",
      serviceCategory: "Photography",
      basePrice: 5000,
    },
    {
      serviceId: "service4",
      serviceName: "Birthday Photography Package",
      serviceCategory: "Photography",
      basePrice: 3000,
    },
    {
      serviceId: "service5",
      serviceName: "Wedding Videography Package",
      serviceCategory: "Videography",
      basePrice: 7000,
    },
    {
      serviceId: "service6",
      serviceName: "Corporate Videography Package",
      serviceCategory: "Videography",
      basePrice: 6000,
    },
    {
      serviceId: "service7",
      serviceName: "Event Host - Professional MC",
      serviceCategory: "Host",
      basePrice: 4000,
    },
    {
      serviceId: "service8",
      serviceName: "Event Host - Bilingual MC",
      serviceCategory: "Host",
      basePrice: 4500,
    },
    {
      serviceId: "service9",
      serviceName: "Event Host - Comedian",
      serviceCategory: "Host",
      basePrice: 5000,
    },
    {
      serviceId: "service10",
      serviceName: "Event Host - Celebrity MC",
      serviceCategory: "Host",
      basePrice: 10000,
    },
    {
      serviceId: "service11",
      serviceName: "Sound System Rental",
      serviceCategory: "Others",
      basePrice: 2500,
    },
    {
      serviceId: "service12",
      serviceName: "Event Lighting Package",
      serviceCategory: "Others",
      basePrice: 3000,
    },
  ],

  //   {
  //     eventId: "event1",
  //     eventName: "Summer Picnic",
  //     feedbackData: [
  //       { aspect: "Food", positive: 10, negative: 2, neutral: 1 },
  //       { aspect: "Entertainment", positive: 8, negative: 1, neutral: 3 },
  //       { aspect: "Venue", positive: 12, negative: 0, neutral: 2 },
  //       { aspect: "Organization", positive: 9, negative: 3, neutral: 1 },
  //     ],
  //   },
  //   {
  //     eventId: "event2",
  //     eventName: "Company Gala",
  //     feedbackData: [
  //       { aspect: "Decor", positive: 15, negative: 1, neutral: 2 },
  //       { aspect: "Food", positive: 12, negative: 2, neutral: 3 },
  //       { aspect: "Entertainment", positive: 10, negative: 3, neutral: 2 },
  //       { aspect: "Networking", positive: 8, negative: 2, neutral: 4 },
  //     ],
  //   },
  //   {
  //     eventId: "event3",
  //     eventName: "Product Launch",
  //     feedbackData: [
  //       { aspect: "Presentation", positive: 18, negative: 1, neutral: 2 },
  //       { aspect: "Product Demo", positive: 15, negative: 2, neutral: 3 },
  //       { aspect: "Venue", positive: 12, negative: 3, neutral: 2 },
  //       { aspect: "Networking", positive: 8, negative: 4, neutral: 3 },
  //     ],
  //   },
  //   {
  //     eventId: "event4",
  //     eventName: "Team Building Workshop",
  //     feedbackData: [
  //       { aspect: "Activities", positive: 16, negative: 2, neutral: 3 },
  //       { aspect: "Food", positive: 14, negative: 3, neutral: 2 },
  //       { aspect: "Teamwork", positive: 18, negative: 1, neutral: 2 },
  //       { aspect: "Organization", positive: 15, negative: 2, neutral: 3 },
  //     ],
  //   },
  //   {
  //     eventId: "event5",
  //     eventName: "Charity Gala",
  //     feedbackData: [
  //       { aspect: "Cause", positive: 20, negative: 0, neutral: 1 },
  //       { aspect: "Entertainment", positive: 18, negative: 2, neutral: 2 },
  //       { aspect: "Food", positive: 15, negative: 3, neutral: 2 },
  //       { aspect: "Organization", positive: 17, negative: 2, neutral: 3 },
  //     ],
  //   },
  // ],

  // series: [150, 700, 500], // Add series state this is just a sample for feedback component pie chart
  sliceColor: ["#ff3c00", "rgba(9,226,0,1)", "#fbd203"], // Add sliceColor state
  // function to set event data
  setEventData: (data) => set({ eventData: data }),

  // function to calculate feedback series based on event data
  calculateFeedbackSeries: () => {
    const { eventData } = get(); // Get event data from store
    const feedbackData = eventData.feedbackData || []; // Handle potential missing data

    const positiveCount = feedbackData.filter(
      (feedback) => feedback.sentiment === "positive"
    ).length;
    const negativeCount = feedbackData.filter(
      (feedback) => feedback.sentiment === "negative"
    ).length;
    const neutralCount = feedbackData.filter(
      (feedback) => feedback.sentiment === "neutral"
    ).length;

    const series = [negativeCount, positiveCount, neutralCount];
    return series;
  },
  setFeedbackSeries: () => {
    const series = calculateFeedbackSeries();
    set({ series });
  },

  // Profile-related state and methods
  accountProfiles: [],
  activeProfile: null,
  loading: true,

  setAccountProfiles: (profiles) => set({ accountProfiles: profiles }),
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  setLoading: (loading) => set({ loading }),

  fetchUserAndProfiles: async () => {
    set({ loading: true });
    try {
      const user = await getUser();
      const profileResponse = await getAccountProfile();
      const profiles = profileResponse.data.filter(
        (profile) => profile.user_id === user.id
      );
      set({ accountProfiles: profiles });

      // Load the active profile from AsyncStorage if it exists
      const storedProfile = await AsyncStorage.getItem("activeProfile");
      if (storedProfile) {
        set({ activeProfile: JSON.parse(storedProfile) });
      } else if (profiles.length > 0) {
        set({ activeProfile: profiles[0] }); // Default to the first profile
      }
    } catch (error) {
      console.error("Error fetching user and profiles:", error);
    } finally {
      set({ loading: false });
    }
  },

  switchProfile: async (index) => {
    try {
      const profiles = get().accountProfiles;
      const profile = profiles[index];
      if (profile) {
        set({ activeProfile: profile });
        await AsyncStorage.setItem("activeProfile", JSON.stringify(profile));
        console.log("Switched to profile:", profile);

        // Retrieve navigation object from state and navigate if necessary
        const navigation = get().navigation;
        if (navigation) {
          navigation.navigate("CustomerStack", { screen: "TabNav" }); // Adjust route as needed
        }
      } else {
        console.error("Invalid profile index");
      }
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  },
  // Profile management states
  // Profile-related state and methods
  accountProfiles: [],
  activeProfile: null,
  loading: true,

  setAccountProfiles: (profiles) => set({ accountProfiles: profiles }),
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  setLoading: (loading) => set({ loading }),

  fetchUserAndProfiles: async () => {
    set({ loading: true });
    try {
      const user = await getUser();
      const profileResponse = await getAccountProfile();
      const profiles = profileResponse.data.filter(
        (profile) => profile.user_id === user.id
      );
      set({ accountProfiles: profiles });

      // Load the active profile from AsyncStorage if it exists
      const storedProfile = await AsyncStorage.getItem("activeProfile");
      if (storedProfile) {
        set({ activeProfile: JSON.parse(storedProfile) });
      } else if (profiles.length > 0) {
        set({ activeProfile: profiles[0] }); // Default to the first profile
      }
    } catch (error) {
      console.error("Error fetching user and profiles:", error);
    } finally {
      set({ loading: false });
    }
  },

  switchProfile: async (index) => {
    try {
      const profiles = get().accountProfiles;
      const profile = profiles[index];
      if (profile) {
        set({ activeProfile: profile });
        await AsyncStorage.setItem("activeProfile", JSON.stringify(profile));
        console.log("Switched to profile:", profile);

        // Retrieve navigation object from state and navigate if necessary
        const navigation = get().navigation;
        if (navigation) {
          navigation.navigate("CustomerStack", { screen: "TabNav" }); // Adjust route as needed
        }
      } else {
        console.error("Invalid profile index");
      }
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  },
}));

// Helper functions
export const saveString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const save = async (key, value) =>
  saveString(key, JSON.stringify(value));

export const get = async (key) => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString) {
      return JSON.parse(itemString);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default useStore;
