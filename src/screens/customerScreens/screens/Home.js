import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-paper";
import Header from "../elements/Header";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const { width } = Dimensions.get("window");

const Home = () => {
  const navigator = useNavigation();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [calendarDates, setCalendarDates] = useState([]);

  useEffect(() => {
    generateCalendarDates();
  }, []);

  const generateCalendarDates = () => {
    const dates = [];
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    let currentDay = startOfMonth.clone();
    while (currentDay.isBefore(endOfMonth)) {
      dates.push(currentDay.clone());
      currentDay.add(1, "days");
    }
    setCalendarDates(dates);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.head}>
          <Text style={styles.sectionTitle}>Popular Events</Text>
          <TouchableOpacity
            style={styles.viewProfileButton}
            onPress={() => {
              navigator.navigate("Book");
            }}
          >
            <Text style={styles.viewProfileButtonText}>Customize Event</Text>
            <Divider style={styles.viewLine} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.eventList}
        >
          {[
            {
              title: "Mr. & Mrs. Malik Wedding",
              location: "Cagayan de Oro City",
              date: "23 Sept, 23",
              image: require("../pictures/event1.png"),
            },
            {
              title: "Barbella's Birthday",
              location: "Cagayan de Oro City",
              date: "27 July, 23",
              image: require("../pictures/event2.png"),
            },
            {
              title: "Class of 1979 Reunion",
              location: "Cagayan de Oro City",
              date: "12 August, 23",
              image: require("../pictures/event3.png"),
            },
            {
              title: "Barbella's Debut",
              location: "Cagayan de Oro City",
              date: "23 Sept, 25",
              image: require("../pictures/event4.png"),
            },
            {
              title: "Kids Party",
              location: "Cagayan de Oro City",
              date: "12 August, 24",
              image: require("../pictures/event5.png"),
            },
          ].map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Image source={event.image} style={styles.eventImage} />
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventLocation}>{event.location}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.calendarContainer}>
          <View style={styles.dateRow}>
            <Text style={styles.dateTodayText}>Date Today</Text>
            <Text style={styles.dateToday}>
              {selectedDate.format("ddd MMM DD, YYYY")}
            </Text>
          </View>

          <View style={styles.calendarBox}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.datesContainer}
            >
              {calendarDates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    selectedDate.isSame(date, "day") && styles.selectedDateItem,
                  ]}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate.isSame(date, "day") &&
                        styles.selectedDateText,
                    ]}
                  >
                    {date.format("ddd")}
                  </Text>
                  <Text
                    style={[
                      styles.dateNumber,
                      selectedDate.isSame(date, "day") &&
                        styles.selectedDateNumber,
                    ]}
                  >
                    {date.format("DD")}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <Text style={styles.pckgTitle}>Event Packages</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.packageList}
        >
          <TouchableOpacity
            style={styles.pckg}
            onPress={() => {
              navigator.navigate("EventPackageCustomer");
            }}
          >
            <Image
              source={require("../pictures/pckg1.png")}
              style={styles.packageImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pckg}
            onPress={() => {
              navigator.navigate("EventPackageCustomer");
            }}
          >
            <Image
              source={require("../pictures/pckg2.png")}
              style={styles.packageImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pckg}
            onPress={() => {
              navigator.navigate("EventPackageCustomer");
            }}
          >
            <Image
              source={require("../pictures/pckg3.png")}
              style={styles.packageImage}
            />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingBottom: 40,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -15,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginVertical: 20,
    fontFamily: "Poppins",
  },
  viewProfileButton: {
    marginVertical: 20,
    marginTop: 30,
  },
  viewProfileButtonText: {
    color: "gray",
    fontSize: 12,
    fontFamily: "Poppins",
  },
  viewLine: {
    width: 90,
    backgroundColor: "gray",
  },
  eventList: {
    marginVertical: 10,
  },
  eventItem: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    width: 200,
    marginHorizontal: 8,
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000",
    fontFamily: "Poppins",
  },
  eventLocation: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins",
  },
  eventDate: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins",
  },
  calendarContainer: {
    marginTop: 20,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateTodayText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins",
  },
  dateToday: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#8B8B8B",
    fontFamily: "Poppins",
  },
  calendarBox: {
    backgroundColor: "#FDF1C7",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateItem: {
    padding: 10,
    borderRadius: 20,
    width: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDateItem: {
    backgroundColor: "#F4A300",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#000",
    fontFamily: "Poppins",
  },
  selectedDateText: {
    color: "#FFF",
    fontFamily: "Poppins",
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Poppins",
  },
  selectedDateNumber: {
    color: "#FFF",
    fontFamily: "Poppins",
  },
  venueTitle: {
    fontSize: 20,
    color: "#000",
    marginVertical: 20,
    fontFamily: "Poppins",
  },
  pckgTitle: {
    fontSize: 20,
    color: "#000",
    marginVertical: 20,
    marginBottom: -60,
    fontFamily: "Poppins",
  },
  packageList: {
    marginVertical: 10,
  },
  packageImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 8,
    marginRight: 10,
  },
  venueImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default Home;
