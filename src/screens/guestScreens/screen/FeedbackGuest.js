import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
  Modal,
} from "react-native";
import CustomHeader from "../elements/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const FeedbackGuest = () => {
  const navigation = useNavigation();
  const [defaultRating, setDefaultRating] = useState(2);
  const maxRating = [1, 2, 3, 4, 5];
  const [feedback, setFeedback] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBar}>
        {maxRating.map((item) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}
          >
            <Image
              style={styles.starImgStyle}
              source={
                item <= defaultRating
                  ? { uri: starImgFilled }
                  : { uri: starImgCorner }
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const backgroundImage = require("../assets/Wallpaper.png");

  const handleFeedbackSubmit = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateToHomeScreen = () => {
    navigation.navigate("HomeGuest");
  };

  return (
    <ImageBackground style={styles.background} source={backgroundImage}>
      <CustomHeader
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.textStyle}>Please Rate Us</Text>
        <CustomRatingBar />
        <Text style={styles.textStylele}>
          {defaultRating + " / " + maxRating.length}
        </Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="Type your feedback here"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          onChangeText={(text) => setFeedback(text)}
          value={feedback}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={handleFeedbackSubmit}
        >
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Image
                source={require("../assets/Popf.png")}
                style={styles.popupImage}
              />
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>

      {/* Bottom Navigation Icons */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={navigateToHomeScreen}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.navText}>Event</Text>
        </TouchableOpacity>
        <View style={styles.navItem}>
          <View style={styles.navDivider}></View>
          <Ionicons name="chatbubble" size={24} color="black" />
          <Text style={styles.navText}>Feedback</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 26,
    marginBottom: 20,
    color: "white",
    marginBottom: 40,
  },
  textStylele: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 15,
    color: "white",
    marginBottom: 20,
  },
  customRatingBar: {
    flexDirection: "row",
    justifyContent: "center",
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  inputStyle: {
    width: "100%",
    height: 70,
    backgroundColor: "#333",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#9F7E1C",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 16,
    marginBottom: 130,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    position: "absolute",
    top: 25,
    right: 20,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  popupImage: {
    width: 250,
    height: 250,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#9F7E1C",
    paddingVertical: 10,
    borderRadius: 20,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 90,
  },
  navItem: {
    alignItems: "center",
    marginLeft: 30,
  },
  navText: {
    color: "black",
    marginTop: 3,
  },
  navDivider: {
    borderTopColor: "black",
    borderTopWidth: 4,
    borderRadius: 3,
    marginBottom: 7,
    width: 75,
    marginTop: -5,
  },
});

export default FeedbackGuest;
