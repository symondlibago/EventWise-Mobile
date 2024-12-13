import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
const useFeedbackStore = create((set) => ({
  currentFeedbacks: {
    positive_count: 0,
    neutral_count: 0,
    negative_count: 0,
    total_feedback: 0,
  },
  setCurrentFeedbacks: (feedbacks) => set({ currentFeedbacks: feedbacks }),

  feedbacksByEvent: [],

  setFeedbacksByEvent: (feedbacksByEvent) => set({ feedbacksByEvent }),
}));

export { useFeedbackStore };
