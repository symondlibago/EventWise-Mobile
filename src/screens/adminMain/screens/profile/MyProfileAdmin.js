import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { getUser} from "../../../../services/authServices";

const MyProfileAdmin = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();  // Assuming this function returns user data
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: "rgba(194,176,103,0.17)",
          height: 218,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#C2B067",
          marginTop: 60,
          display: "flex",
          flexDirection: "column",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",
          bottom: 90,
        }}
      >
        <Image
          source={require("../../../../../assets/profilepic.jpg")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            position: "absolute",
            zIndex: 1,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
          bottom: 10,
        }}
      >
        {/* Only render user data if user is available */}
        {user ? (
          <>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.title}>{user.email}</Text>
          </>
        ) : (
          // Show loading indicator or placeholder
          <Text>Loading...</Text>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfileAdmin")}>
          <View
            style={{
              backgroundColor: "gold",
              borderRadius: 15,
              width: 130,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 15,
              borderRadius: 15,
            }}
          >
            <MaterialCommunityIcons name="account-edit" size={23} color="white" />
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  
};

export default MyProfileAdmin;
