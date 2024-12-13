import React, { useContext, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { ProfileContext } from "../../../services/profileContextcp";
import useStore from "../../../stateManagement/store";
import { useFocusEffect } from "@react-navigation/native";
import { getUser, getAccountProfile } from "../../../services/authServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ProfileSwitcher = () => {
  const navigation = useNavigation();
  const { switchProfile } = useContext(ProfileContext);

  const [loading, setLoading] = useState(true); // Correct state management
  const {
    user,
    accountProfiles,
    setUser,
    setAccountProfiles,
    setActiveProfile,
    activeProfile,
  } = useStore();

  // const navigateBasedOnProfile = (profile) => {
  //   if (profile.id === 5) {
  //     navigation.navigate("ServiceProviderStack");
  //   } else {
  //     navigation.navigate("CustomCustomerStack");
  //   }
  // };

  const handleSwitchProfile = async (profile) => {
    try {
      setActiveProfile(profile);
      console.log("Switching profile to:", profile.id);
      switchProfile(profile);
      // navigateBasedOnProfile(profile);
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
          console.log("Current user: ", user);

          const filteredProfiles = profiles.filter(
            (profile) => profile.user_id === user.id
          );

          setAccountProfiles(filteredProfiles);
          if (filteredProfiles.length > 0) {
            setActiveProfile(filteredProfiles[0]);
          }
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
    return <ActivityIndicator size="large" color="#0fs0ff" />;
  }

  if (!user || !activeProfile) {
    return <Text>Loading user or profile data...</Text>;
  }

  if (!accountProfiles.length) {
    return <Text>No profiles available</Text>;
  }

  return (
    <SafeAreaView>
      <View>
        <Text>
          Current Profile: {user ? user.name : "No User Data"} -
          {activeProfile
            ? activeProfile.service_provider_name
            : "No Profile Selected"}
        </Text>

        <Text>Available Profiles:</Text>
        {accountProfiles.map((profile) => (
          <Text key={profile.id}>{profile.service_provider_name}</Text>
        ))}
        {accountProfiles.map((profile) => (
          <Button
            key={profile.id}
            title={`Switch to ${profile.service_provider_name}`}
            onPress={() => handleSwitchProfile(profile)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ProfileSwitcher;
