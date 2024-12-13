import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  ScrollView 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const AboutMeSP = () => {
  const navigation = useNavigation();
  const [selectedAbout, setSelectedAbout] = useState("A&A");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const lineAnim = useRef(new Animated.Value(0)).current;
  const [currentDescription, setCurrentDescription] = useState("A&A");

  const descriptions = {
    "A&A": `A&A Creations is a DTI and BIR registered event organizing team from Cagayan de Oro City. 

Founded by a married couple, Mr. Arvil and Ms. Alysa, thus the name A&A, of the year 2018. 

A&A Creations is now a growing team offering event needs and services. Nevertheless, its team is composed of equipped individuals ready to cater to its clients' needs. Even before the team was created, Mr. Arvil and most of his company partners were involved in event planning and coordination.

A&A Creations aims to make the clients' plans into reality. The company also believes that a tight budget is not a hindrance in making memories to treasure, with the ones close to our hearts.`,
    EMS: `EventWise is a premier service provider specializing in equipment and logistics for large-scale events. 

Our solutions ensure seamless execution and support, making EMS the preferred choice for organizations looking for reliable event services.`,
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentDescription(selectedAbout);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const newX = selectedAbout === "A&A" ? 0 : width * 0.5;
    Animated.timing(lineAnim, {
      toValue: newX,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedAbout]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeSP")}>
          <Ionicons name="arrow-back" size={24} color="#FFCE00" />
        </TouchableOpacity>
        <Text style={styles.title}>About Us</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setSelectedAbout("A&A")}
          >
            <Text
              style={[
                styles.tabText,
                selectedAbout === "A&A" && styles.activeTabText,
              ]}
            >
              A&A
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setSelectedAbout("EMS")}
          >
            <Text
              style={[
                styles.tabText,
                selectedAbout === "EMS" && styles.activeTabText,
              ]}
            >
              EMS
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lineContainer}>
          <Animated.View
            style={[
              styles.activeLine,
              { transform: [{ translateX: lineAnim }] },
            ]}
          />
        </View>

        <Animated.View
          style={[styles.descriptionContainer, { opacity: fadeAnim }]}
        >
          <Text style={styles.descriptionText}>
            {descriptions[currentDescription]}
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  closeButton: {
    position: "absolute",
    left: 30,
    top: 20,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    position: "relative",
  },
  tabItem: {
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    fontSize: 18,
    color: "#888",
  },
  activeTabText: {
    color: "#eeba2b",
    fontWeight: "bold",
  },
  lineContainer: {
    width: "100%",
    height: 3,
    position: "relative",
    marginTop: 5,
  },
  activeLine: {
    width: "43%",
    height: 3,
    backgroundColor: "#eeba2b",
    position: "absolute",
    left: 0,
    alignItems: "center",
  },
  descriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 60, // Added padding at the bottom
  },
  descriptionText: {
    fontSize: 16,
    color: "#000",
    lineHeight: 20,
    textAlign: "center",
  },
});

export default AboutMeSP;
