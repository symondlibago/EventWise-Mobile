import React, { useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { getUser, getAccountProfile } from "../../../../services/authServices";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../../stateManagement/useStore";

const ProfileSwitchSP = () => {
  const switchProfile = useStore((state) => state.switchProfile);
  const activeProfile = useStore((state) => state.activeProfile);
  const setActiveProfile = useStore((state) => state.setActiveProfile);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const accountProfiles = useStore((state) => state.accountProfiles);
  const setAccountProfiles = useStore((state) => state.setAccountProfiles);
  const navigation = useNavigation();

  const handleSwitchProfile = (profile) => {
    try {
      setActiveProfile(profile);
      switch (profile.role_id) {
        case 1:
          navigation.navigate("CustomAdminStack");
          break;
        case 2:
          navigation.navigate("CustomCustomerStack");
          break;
        case 3:
          navigation.navigate("CustomServiceProviderStack");
          break;
        default:
          console.error("Invalid role_id:", profile.role_id);
      }

      switchProfile(profile.role_id);
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchAccountProfile = async () => {
        try {
          const fetchedUser = await getUser();
          setUser(fetchedUser);
          const profileResponse = await getAccountProfile();
          const profiles = profileResponse.data;
          const filteredProfiles = profiles.filter(
            (profile) => profile.user_id === fetchedUser.id
          );
          setAccountProfiles(filteredProfiles);
          setActiveProfile(filteredProfiles[0] || null);
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
    <View style={styles.switchAccountContainer}>
    <Text style={styles.header}>Switch Account</Text>

    {accountProfiles.map((profile) => (
        <TouchableOpacity
          key={profile.role_id}
          style={styles.profileContainer}
          onPress={() => handleSwitchProfile(profile)}
        >
          <View style={styles.row}>
            <Text style={styles.profileName}>{profile.service_provider_name}</Text>
            <View
              style={[
                styles.circle,
                activeProfile === profile.role_id && styles.filledCircle,
              ]}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
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
    padding: 100,
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
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileName: {
    fontSize: 13,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // Ensures vertical alignment
    justifyContent: "space-between", // Ensures spacing between name and circle
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#eeba2b", // Default border color
    backgroundColor: "transparent", // Default background
    marginLeft: 10, // Adds space between the name and circle
  },
  filledCircle: {
    backgroundColor: "#eeba2b", // Fill color when selected
  },
  switchAccountContainer: {
    padding: 15, // Optional, for spacing inside the container
    elevation: 5, // Shadow for Android
    backgroundColor: "#ffffff", // Required to make shadow visible
    borderRadius: 10,
  },
});

export default ProfileSwitchSP;