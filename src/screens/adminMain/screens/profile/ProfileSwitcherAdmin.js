import React, { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getUser, getAccountProfile } from "../../../../services/authServices";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../../../../stateManagement/useStore";

const ProfileSwitcherAdmin = () => {
  const switchProfile = useStore((state) => state.switchProfile);
  const activeProfile = useStore((state) => state.activeProfile);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const accountProfiles = useStore((state) => state.accountProfiles);
  const setAccountProfiles = useStore((state) => state.setAccountProfiles);

  const handleSwitchProfile = (profile) => {
    try {
      switchProfile(profile.role_id);
      console.log("profile roleID ", profile.role_id);
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchAccountProfile = async () => {
        try {
          const user = await getUser();
          setUser(user);

          const profileResponse = await getAccountProfile();
          const profiles = profileResponse.data;

          const filteredProfiles = profiles.filter(
            (profile) => profile.user_id === user.id
          );

          setAccountProfiles(filteredProfiles);
        } catch (error) {
          console.error("Error fetching account profiles:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAccountProfile();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (!user || !activeProfile) {
    return <Text>Loading user or profile data...</Text>;
  }

  if (!accountProfiles.length) {
    return <Text>No profiles available</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.title}>Switch Account</Text>
        
        {/* Profile Switch Buttons Container */}
        <View style={styles.profileButtonContainer}>
          {accountProfiles.map((profile) => (
            <View key={profile.role_id} style={styles.profileButtonWrapper}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => handleSwitchProfile(profile)}
              >
                <View style={styles.profileContent}>
                  <Text style={styles.profileText}>
                    {`Switch to ${profile.service_provider_name}`}
                  </Text>
                  <View
                    style={[
                      styles.roundIndicator,
                      activeProfile === profile.role_id && styles.selectedIndicator,
                    ]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f9fa",
  },
  accountContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileButtonContainer: {
    marginTop: 10,
  },
  profileButtonWrapper: {
    marginBottom: 10, // Adds spacing between buttons
  },
  profileButton: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0e0e0", // Optional: background for each button container
    borderRadius: 8, // Rounded corners for buttons
    shadowColor: "#000", // Optional: shadow for buttons
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  profileText: {
    fontSize: 13,
    color: "#333",
    marginLeft: 10,
  },
  roundIndicator: {
    width: 18,
    height: 18,
    marginRight: 10,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#eeba2b", // Default border color
    backgroundColor: "transparent", // Default background
  },
  selectedIndicator: {
    backgroundColor: "#eeba2b", // Filled circle when selected
  },
});

export default ProfileSwitcherAdmin;
