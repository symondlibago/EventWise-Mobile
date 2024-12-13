import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const TotalEventFeedback = ({ eventFeedback, sliceColor }) => {
  const navigation = useNavigation();

  const handleGoToButtonPress = () => {
    navigation.navigate("Feedback");
  };

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const data = [
    {
      name: "Positive",
      population: eventFeedback.positive_count,
      color: sliceColor[1],
    },
    {
      name: "Neutral",
      population: eventFeedback.neutral_count,
      color: sliceColor[2],
    },
    {
      name: "Negative",
      population: eventFeedback.negative_count,
      color: sliceColor[0],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedbackContainer}>
        <Text style={styles.chartTitle}>
          Total Feedback {eventFeedback.total_feedback}
        </Text>
        <TouchableOpacity onPress={handleGoToButtonPress}>
          <Text style={styles.subtitle}>Go to Feedback</Text>
          <AntDesign name="swapright" size={24} color="black" />
        </TouchableOpacity>
        <PieChart
          data={data}
          width={Dimensions.get("window").width - 40}
          height={200}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    paddingTop: 10,
    height: "100%",
    width: "100%",
  },
  feedbackContainer: {
    flexDirection: "column",
    backgroundColor: "rgba(255,252,221,99)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#888" },
});

export default TotalEventFeedback;
