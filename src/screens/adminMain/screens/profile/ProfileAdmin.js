import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileMyEvents from "./ProfileMyEvents";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../../stateManagement/useStore";
import ProfileMyPackages from "./ProfileMyPackages";
import MyProfileAdmin from "./MyProfileAdmin";
import ProfileSwitcherAdmin from "./ProfileSwitcherAdmin";
const ProfileAdmin = () => (
  <SafeAreaView
    style={[
      styles.container,
      { paddingTop: -20, padding: 0, paddingHorizontal: 12 },
    ]}
  >
    <ScrollView>
      <MyProfileAdmin />
      {/* <View style={[]}>
        <View
          style={[
            {
              backgroundColor: "rgba(194,176,103,0.17)",
              height: 218,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#C2B067",
              top: 60,
              display: "flex",

              flexDirection: "column",
              padding: 20,
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            },
          ]}
        >
          <Text style={styles.header}>
            <Text style={styles.title}>My Events</Text>
          </Text>
        </View>
      </View> */}
      {/*   - put the profile switch here - apply profile switch between
      admin and serviceProviderd - serviceprovider: crud services - admin:
      crud packages, events - customer: crud bookings. */}
      <ProfileSwitcherAdmin />
      <ProfileMyEvents />
      <ProfileMyPackages />
    </ScrollView>
  </SafeAreaView>
);

export default ProfileAdmin;
