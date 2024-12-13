import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import profilepic from "../../../../../assets/profilepic.jpg";

const NotificationAdmin = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("All");

  const notificationsData = {
    "This Week": [
      {
        id: "1",
        title: "Jane Wedding",
        joined: "Diwata Pares, Heart Catering, and 35 others",
        daysAgo: "1d Ago",
        rightImage: profilepic,
      },
      {
        id: "2",
        title: "John Birthday",
        joined: "Happy Cakes, DJ Mix, and 20 others",
        daysAgo: "3d Ago",
        rightImage: profilepic,
      },
    ],
    "Booking Request": [
      {
        id: "1",
        name: "Jane Doe",
        title: "Wedding",
        daysAgo: "2d Ago",
      },
      {
        id: "2",
        name: "John Smith",
        title: "Birthday",
        daysAgo: "4d Ago",
      },
    ],
    "Service Provider Request": [
      {
        id: "1",
        name: "Emily Johnson",
        service: "Photographer",
        daysAgo: "5d Ago",
      },
      {
        id: "2",
        name: "Michael Brown",
        service: "Food Catering",
        daysAgo: "6d Ago",
      },
    ],
    All: [
      {
        id: "1",
        title: "Jane Wedding",
        joined: "Diwata Pares, Heart Catering, and 35 others",
        daysAgo: "1d Ago",
        rightImage: profilepic,
      },
      {
        id: "2",
        name: "Jane Doe",
        title: "Wedding",
        daysAgo: "2d Ago",
      },
      {
        id: "3",
        name: "Emily Johnson",
        service: "Photographer",
        daysAgo: "5d Ago",
      },
    ],
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "This Week":
        return notificationsData["This Week"].map((notification) => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              <Image source={profilepic} style={styles.profilePicture} />
              <View style={styles.notificationDetails}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationJoined}>
                  {notification.joined}
                </Text>
              </View>
            </View>
            {notification.rightImage && (
              <View style={styles.rightContainer}>
                <Image
                  source={notification.rightImage}
                  style={styles.rightImage}
                />
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            )}
          </View>
        ));
      case "Booking Request":
        return notificationsData["Booking Request"].map((notification) => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              <Image source={profilepic} style={styles.profilePicture} />
              <View style={styles.notificationDetails}>
                <Text style={styles.notificationName}>{notification.name}</Text>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ));
      case "Service Provider Request":
        return notificationsData["Service Provider Request"].map(
          (notification) => (
            <View key={notification.id} style={styles.notificationBox}>
              <View style={styles.leftContainer}>
                <Image source={profilepic} style={styles.profilePicture} />
                <View style={styles.notificationDetails}>
                  <Text style={styles.notificationName}>
                    {notification.name}
                  </Text>
                  <Text style={styles.notificationService}>
                    {notification.service}
                  </Text>
                  <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton}>
                  <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        );
      case "All":
        return notificationsData["All"].map((notification) => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              <Image source={profilepic} style={styles.profilePicture} />
              <View style={styles.notificationDetails}>
                {notification.title && (
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                )}
                {notification.name && (
                  <Text style={styles.notificationName}>
                    {notification.name}
                  </Text>
                )}
                {notification.service && (
                  <Text style={styles.notificationService}>
                    {notification.service}
                  </Text>
                )}
                {notification.joined && (
                  <Text style={styles.notificationJoined}>
                    {notification.joined}
                  </Text>
                )}
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            </View>
          </View>
        ));
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={["#0D0D0D", "#1A1A1A"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification</Text>
      </View>
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.tabsContentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {[
            "All",
            "This Week",
            "Booking Request",
            "Service Provider Request",
          ].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                {
                  backgroundColor: selectedTab === tab ? "#FFC42B" : "#1A1A1A",
                  borderColor: selectedTab === tab ? "#FFC42B" : "#FFFFFF",
                },
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === tab ? "#000000" : "#FFFFFF" },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // Your styles here...
});

export default NotificationAdmin;
