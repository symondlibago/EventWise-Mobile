import React from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import Header2 from "../elements/Header2";

const FeedbackDetailView = ({ route }) => {
  const { feedbackData } = route.params;

  const aggregateCategorySentiment = (category) => {
    let positive = 0, neutral = 0, negative = 0;
  
    feedbackData.forEach(feedback => {
      // Ensure category sentiment exists before accessing its properties
      const sentiment = feedback[`${category}_sentiment`];
      
      if (sentiment) {
        positive += sentiment.pos || 0;  // Default to 0 if pos is null or undefined
        neutral += sentiment.neu || 0;    // Default to 0 if neu is null or undefined
        negative += sentiment.neg || 0;   // Default to 0 if neg is null or undefined
      }
    });
  
    return [
      { name: "Positive", population: positive, color: "#00FF00" },
      { name: "Neutral", population: neutral, color: "#FFFF00" },
      { name: "Negative", population: negative, color: "#FF0000" },
    ];
  };  

  const renderPieChart = (title, category) => (
    <View style={styles.feedbackSection}>
      <Text style={styles.feedbackTitle}>{title} Feedback</Text>
      <PieChart
        data={aggregateCategorySentiment(category)}
        width={250}
        height={150}
        chartConfig={{
          color: () => `rgba(255, 255, 255, 0.5)`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="5"
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header2 />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.eventTitle}>Feedback Details for Mr. & Mrs. Malik Wedding</Text>
        
        {renderPieChart("Venue", "venue")}
        {renderPieChart("Food Catering", "catering")}
        {renderPieChart("Decoration", "decoration")}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  eventTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  feedbackSection: { marginBottom: 20, padding: 10, backgroundColor: "#FFFAE5", borderRadius: 8 },
  feedbackTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default FeedbackDetailView;
