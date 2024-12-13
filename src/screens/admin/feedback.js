import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the burger icon
import NavBar from "./nav"; // Import NavBar component

const Feedback = () => {
  const navigation = useNavigation(); // Hook to use navigation

  const feedbackData = {
    total: 100,
    positive: 50,
    neutral: 30,
    negative: 20,
  };

  const serviceProviders = [
    { role: "Photographer", positive: 70, neutral: 20, negative: 10 },
    { role: "Videographer", positive: 50, neutral: 30, negative: 20 },
    { role: "Makeup Artist", positive: 80, neutral: 10, negative: 10 },
    { role: "DJ", positive: 90, neutral: 5, negative: 5 },
    { role: "Caterer", positive: 40, neutral: 30, negative: 30 },
    { role: "Florist", positive: 60, neutral: 20, negative: 20 },
  ];

  const renderRatingBar = (positive, neutral, negative) => (
    <View style={styles.ratingBarContainer}>
      <View
        style={[styles.ratingBar, styles.positive, { width: `${positive}%` }]}
      />
      <View
        style={[styles.ratingBar, styles.neutral, { width: `${neutral}%` }]}
      />
      <View
        style={[styles.ratingBar, styles.negative, { width: `${negative}%` }]}
      />
    </View>
  );

  return (
    <LinearGradient
      colors={["#2A2600", "#000000"]}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
          <View style={styles.iconsContainer}>
            <Ionicons
              name="chatbubble-outline"
              size={30}
              color="white"
              style={styles.icon}
            />
            <Ionicons
              name="notifications-outline"
              size={30}
              color="white"
              style={styles.icon}
            />
          </View>
        </View>

        {/* Content */}
        <Text style={styles.sentimentAnalysis}>Sentiment Analysis</Text>
        <View style={styles.line} />

        <Text style={styles.welcomeText}>Welcome back, Arvil!</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.feedbackSummaryContainer}>
            <View style={[styles.feedbackSummaryBox, styles.positiveBox]}>
              <Text style={styles.boxText}>Total Feedback</Text>
              <Text style={styles.boxValue}>{feedbackData.total}</Text>
            </View>
            <View style={[styles.feedbackSummaryBox, styles.positiveBox]}>
              <Text style={styles.boxText}>Positive</Text>
              <Text style={styles.boxValue}>{feedbackData.positive}</Text>
            </View>
            <View style={[styles.feedbackSummaryBox, styles.neutralBox]}>
              <Text style={styles.boxText}>Neutral</Text>
              <Text style={styles.boxValue}>{feedbackData.neutral}</Text>
            </View>
            <View style={[styles.feedbackSummaryBox, styles.negativeBox]}>
              <Text style={styles.boxText}>Negative</Text>
              <Text style={styles.boxValue}>{feedbackData.negative}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bigBox}>
          <View style={styles.bigBoxHeader}>
            <Text style={styles.bigBoxHeaderLeft}>Service Providers</Text>
            <Text style={styles.bigBoxHeaderRight}>Ratings</Text>
          </View>
          <FlatList
            data={serviceProviders}
            keyExtractor={(item) => item.role}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.role}</Text>
                <View style={styles.tableCell}>
                  {renderRatingBar(item.positive, item.neutral, item.negative)}
                </View>
              </View>
            )}
          />
        </View>

        {/* NavBar */}
        <NavBar />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40, // Adjust margin for the header
  },
  menuButton: {
    marginLeft: 10,
  },
  logo: {
    width: 120,
    height: 40,
    marginLeft: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 15,
  },
  sentimentAnalysis: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  line: {
    height: 2,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 1,
    opacity: 0.5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  summary: {
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  feedbackSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  feedbackSummaryBox: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
  },
  positiveBox: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  neutralBox: {
    backgroundColor: "rgba(255, 255, 0, 0.1)",
  },
  negativeBox: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  boxValue: {
    fontSize: 20,
    color: "white",
  },
  bigBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  bigBoxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bigBoxHeaderLeft: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  bigBoxHeaderRight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tableCell: {
    flex: 1,
    color: "white",
  },
  ratingBarContainer: {
    flexDirection: "row",
    height: 20,
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  ratingBar: {
    height: "100%",
  },
  positive: {
    backgroundColor: "green",
  },
  neutral: {
    backgroundColor: "yellow",
  },
  negative: {
    backgroundColor: "red",
  },
});

export default Feedback;
