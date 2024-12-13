import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { useFeedbackStore } from "../../../../stateManagement/admin/useFeedbackStore";
const HomeTotalFeedback = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const {
    currentFeedbacks,
    setCurrentFeedbacks,
    feedbacksByEvent,
    setFeedbacksByEvent,
  } = useFeedbackStore();

  const sliceColor = ["#ff3c00", "rgba(9,226,0,1)", "#fbd203"];
  const handleGoToButtonPress = () => {
    navigation.navigate("Feedback");
  };
  // Prepare data for the PieChart
  const feedbackAggregatedData = [
    {
      name: "Positive",
      population: currentFeedbacks.positive_count,
      color: sliceColor[1],
      legendFontColor: "#666",
      legendFontSize: 14,
    },
    {
      name: "Neutral",
      population: currentFeedbacks.neutral_count,
      color: sliceColor[2],
      legendFontColor: "#666",
      legendFontSize: 14,
    },
    {
      name: "Negative",
      population: currentFeedbacks.negative_count,
      color: sliceColor[0],
      legendFontColor: "#666",
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Feedback</Text>
      <TouchableOpacity onPress={handleGoToButtonPress}>
        <Text style={styles.subtitle}>Go to Feedback</Text>
        <AntDesign name="swapright" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.feedbackSummary}>
        <Text style={styles.label}>
          Positive: {currentFeedbacks.positive_count}
        </Text>
        <Text style={styles.label}>
          Neutral: {currentFeedbacks.neutral_count}
        </Text>
        <Text style={styles.label}>
          Negative: {currentFeedbacks.negative_count}
        </Text>
        <Text style={styles.label}>
          Total: {currentFeedbacks.total_feedback}
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <PieChart
          data={feedbackAggregatedData}
          width={screenWidth - 30}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 0]}
          absolute // Show absolute numbers instead of percentages
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  feedbackSummary: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeTotalFeedback;
