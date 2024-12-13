import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";
import logo from "../../../../../assets/logo.png";

import EMS_LOGO_FINAL from "../../../../../assets/EMS_LOGO_FINAL.png";

const HeaderAdmin = ({
  title,
  onMessagePress,
  onNotificationPress,
  navigation,
  activeTab, // New prop to track the active tab
}) => {
  return (
    <SafeAreaView style={styles.headerContainer} edges={"top"}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu-outline" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
      <Image source={EMS_LOGO_FINAL} style={styles.logo} />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onMessagePress} style={styles.headerButton}>
          {/* Conditionally render the icon: filled when "messages" tab is active, otherwise outline */}
          <Ionicons
            name={
              activeTab === "messages" ? "chatbubble" : "chatbubble-outline"
            }
            size={20}
            color="#333"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.headerButton}
        >
          {/* Conditionally render the icon: filled when "notifications" tab is active, otherwise outline */}
          <Ionicons
            name={
              activeTab === "notifications"
                ? "notifications"
                : "notifications-outline"
            }
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HeaderAdmin;
