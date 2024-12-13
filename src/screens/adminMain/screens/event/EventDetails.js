// EventDetails.js
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Touchable,
} from "react-native";
import { Button } from "react-native-paper";

const EventDetails = ({ route }) => {
  const { event } = route.params; // Destructure the event data from route params
  const navigation = useNavigation();
  console.log(event);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Event Cover Image */}
      <Image source={{ uri: event?.coverPhoto }} style={styles.coverImage} />

      {/* Event Title */}
      <Text style={styles.title}>{event?.title}</Text>

      {/* Event Type */}
      <Text style={styles.text}>Event Types: {event?.eventType}</Text>

      {/* Event Date and Time */}
      <Text style={styles.text}>Date: {event?.eventDate}</Text>
      <Text style={styles.text}>Time: {event?.eventTime}</Text>

      {/* Event Location */}
      <Text style={styles.text}>Location: {event?.location}</Text>

      {/* Event Description */}
      <Text style={styles.text}>Description: {event?.description}</Text>

      {/* Services and Guests */}
      <Text style={styles.subtitle}>Services Selected:</Text>
      {event?.eventPackageSelected?.map((service, index) => (
        <Text key={index} style={styles.text}>
          - {service}
        </Text>
      ))}
      <Button title="Back" onPress={() => navigation.goBack()} />

      <Text style={styles.subtitle}>Guests:</Text>
      {event?.guests?.map((guest, index) => (
        <Text key={index} style={styles.text}>
          - {guest.name} ({guest.email})
        </Text>
      ))}

      {/* Total Price */}
      <Text style={styles.text}>Total Price: ${event?.totalPrice}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  coverImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default EventDetails;
