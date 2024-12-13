import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header2 from "../elements/Header2";

const CreateAnotherAccount = () => {
  const [isToggled, setIsToggled] = useState(false);
  const navigator = useNavigation(); 
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}> 
        <Header2 />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Create Account</Text>
          </View>

          <View style={styles.accountsSection}>
           <Divider style={styles.accDivider}/>
            <Text style={styles.accountsHeader}>Another Account</Text>
            <Text style={styles.accountType}>Service Provider</Text>
            <View style={styles.accountCard}>
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>Register as Service Provider</Text>
                <Divider style={styles.accDiv}/>
              </View>
              <TouchableOpacity onPress={() => setIsToggled(!isToggled)}>
                <FontAwesome 
                  name={isToggled ? "check-circle" : "circle"} 
                  size={24} 
                  color={isToggled ? "green" : "gray"} 
                  style={styles.icon} 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              onPress={() => isToggled && navigator.navigate("Register")} 
              disabled={!isToggled}
            >
              <View style={[styles.nextButton, { backgroundColor: isToggled ? "#e6b800" : "#ccc" }]}>
                <Text style={[styles.nextButtonText, { color: isToggled ? "#fff" : "#888" }]}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#000',
    fontSize: 24,
  },
  accountsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f4e7b5",
    borderRadius: 10,
  },
  accDivider: {
    height: 7,
    width: 50,
    backgroundColor: "#878787",
    alignSelf: "center",
    marginBottom: 20,
  },
  accountsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "#545454",
    backgroundColor: "#d1c38b",
    marginBottom: 15,
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  accDiv: {
    marginVertical: 1,
    height: 1,
    backgroundColor: "#000",
    marginRight: 40,
  },
  accountImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  accountInfo: {
    flex: 1,
    marginLeft: 10,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accountType: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
    marginLeft: 13,
  },
  icon: {
    marginRight: 20,
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 35,
    marginLeft: 120,
    marginRight: 120,
  },
  nextButtonText: {
    fontSize: 18,
  },
});

export default CreateAnotherAccount;
