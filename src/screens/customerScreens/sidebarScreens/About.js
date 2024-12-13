import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../elements/Header";

const About = () => {
  const navigator = useNavigation();
  const [activeTab, setActiveTab] = useState("A&A Events");

  const renderContent = () => {
    switch (activeTab) {
      case "A&A Events":
        return (
          <View style={styles.content}>
            <Text style={styles.contentText}>
              A&A Creations is a DTI and BIR registered event organizing team from Cagayan de Oro City.{"\n\n"}
              Founded by a married couple, Mr. Arvil and Ms. Alysa, thus the name A&A, of the year 2018.{"\n\n"}
              A&A Creations is now a growing team offering event needs and services. Nevertheless, its team is composed of equipped individuals ready to cater to its clients' needs. Even before the team was created, Mr. Arvil and most of his company partners were involved in event planning and coordination.{"\n\n"}
              A&A Creations aims to make the clients' plans into reality. The company also believes that a tight budget is not a hindrance in making memories to treasure, with the ones close to our hearts.
            </Text>
          </View>
        );
      case "EventWise":
        return (
          <View style={styles.content}>
            <Text style={styles.contentText}>
              EventWise is committed to providing the best possible experience for both customers and service providers.{"\n\n"}
              I am dedicated to creating a welcoming and inclusive atmosphere that celebrates diversity & promotes cultural exchange.{"\n\n"}
              With continuing to set the standard for event organization and curation in the world event community.
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerText}>About</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("A&A Events")}
          style={[styles.tab, activeTab === "A&A Events" && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === "A&A Events" && styles.activeTabText]}>
            A&A Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("EventWise")}
          style={[styles.tab, activeTab === "EventWise" && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === "EventWise" && styles.activeTabText]}>
            EventWise
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {renderContent()}
      </ScrollView>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text
            style={{ color: "#8d8d8d" }}
            onPress={() => Linking.openURL("http://google.com")}
          >
            EventWise
          </Text>{" "}
          © 2024
        </Text>
        <Text style={styles.footerText}>
          Powered by{" "}
          <Text
            style={{ color: "#8d8d8d" }}
            onPress={() => Linking.openURL("http://google.com")}
          >
            EventTech
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  tab: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#e6b800",
  },
  tabText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#e6b800",
  },
  content: {
    marginTop: 20,
    marginBottom: 20, // Ensures separation between content and footer
    paddingHorizontal: 20,
  },
  contentText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#9a9a9a",
    marginVertical: 10,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#8d8d8d",
  },
});

export default About;
