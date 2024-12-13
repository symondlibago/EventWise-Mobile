import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";
import event3 from "../../../../../assets/event3.png";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../../stateManagement/useStore";

const EventMainCard = ({ event, likedEvents, toggleLike }) => {
  const { eventData } = useStore();
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const { selectedDrawerScreen, setSelectedDrawerScreen } = useStore();
  const navigation = useNavigation();
  const toggleMore = () => {
    setShowMoreVisible(!showMoreVisible);
    // console.log(showMoreVisible);
  };
  // const handleMorePress = () => {
  //   console.log("test");
  // };
  // list down all eventData

  const DropdownItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.dropdownItem} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color="black"
        style={styles.dropdownIcon}
      />
      <Text style={styles.dropdownItemText}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <View key={event.id} style={styles.eventCard}>
      <Image source={event3} style={styles.eventImage} />
      <TouchableOpacity
        onPress={() => toggleLike(event.id)}
        style={[
          styles.eventHeartIcon,
          likedEvents[event.id] ? styles.heartLiked : null,
        ]}
      >
        <MaterialCommunityIcons
          name={likedEvents[event.id] ? "heart" : "heart-outline"}
          color={likedEvents[event.id] ? "#FF0000" : "#888"}
          size={20}
        />
      </TouchableOpacity>

      <View>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text>{event.description}</Text>
      </View>
      <View style={styles.eventPackageDetailRow}>
        <View style={styles.eventDetailRow}>
          <View style={styles.eventDetailContainer}>
            <Text style={styles.eventDetailText}>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color="#2A93D5"
              />
              {event.date}
            </Text>
          </View>
          <View style={styles.eventDetailContainer}>
            <Text style={styles.eventDetailText}>
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                color="#2A93D5"
              />
              {event.location}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleMore} style={[]}>
          <SimpleLineIcons
            name={showMoreVisible ? "close" : "options-vertical"}
            color={showMoreVisible ? "#FF0000" : "#888"}
            size={20}
          />
        </TouchableOpacity>
        {showMoreVisible && (
          <View
            style={[
              {
                position: "absolute",
                backgroundColor: "rgba(255,235,137,1)",
                zIndex: 1,
                bottom: 45,
                height: 100,
                width: 150,
                left: 60,
                // padding: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
                paddingLeft: 15,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              },
            ]}
          >
            <DropdownItem
              icon="folder-star"
              label="Atendee"
              onPress={() => {
                setShowMoreVisible(false);
                // navigation.navigate("Account");

                navigation.navigate("Attendee Tracker");
                setSelectedDrawerScreen("Attendee Tracker");
              }}
            />
            <DropdownItem
              icon="folder-star"
              label="Feedback"
              onPress={() => {
                setShowMoreVisible(false);
                // navigation.navigate("Account");

                navigation.push("FeedbackEventDetails", { eventData1 });
              }}
            />
            <DropdownItem
              icon="folder-star"
              label="Inventory"
              onPress={() => {
                setShowMoreVisible(false);
                navigation.navigate("Inventory Tracker");
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default EventMainCard;
