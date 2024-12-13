import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "Present",
    population: 18,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Absent",
    population: 36,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Late",
    population: 6,
    color: "#FFFF00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const Attendee = () => {
  const navigation = useNavigation();
  const [eventDetails, setEventDetails] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const route = useRoute();
  const { event } = route.params || {};

  useEffect(() => {
    if (event) {
      fetchEventDetails(event.id); // Fetch event details and attendees
    } else {
      ToastAndroid.show('No event data provided.', ToastAndroid.SHORT);
    }
  }, [event]);

  const fetchEventDetails = async (eventId) => {
    try {
      const response = await fetch(`http://192.168.1.39:5000/api/event-details?eventId=${eventId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched event details:', data); // Debug log
        setEventDetails(data);
        setAttendees(data.guests || []);
      } else {
        console.error('Failed to fetch event details:', response.status, response.statusText);
        ToastAndroid.show('Failed to fetch event details.', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      ToastAndroid.show('Error fetching event details.', ToastAndroid.SHORT);
    }
  };   

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.headerSection}>
          <Image
            style={styles.image}
            source={{ uri: "https://via.placeholder.com/150" }}
          />
          {eventDetails ? (
          <View style={styles.headerText}>
            <Text style={styles.title}>{eventDetails.eventName || 'No Name Available'}</Text>
            <Text style={styles.details}>{eventDetails.eventDate || 'No Date Available'}</Text>
            <Text style={styles.details}>Total Guests: {attendees.length}</Text>
          </View>
        ) : (
            <Text style={styles.errorText}>No event details available.</Text>
          )}
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.scanButtonText}>📷 Scan me!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            absolute
          />
          <View style={styles.legend}>
            <Text style={[styles.legendText, { color: "green" }]}>Present</Text>
            <Text style={[styles.legendText, { color: "red" }]}>Absent</Text>
            <Text style={[styles.legendText, { color: "yellow" }]}>Late</Text>
          </View>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
            <Text style={styles.filterButtonText}>ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>PRESENT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>ABSENT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>LATE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>NAME</Text>
          <Text style={styles.tableHeaderText}>EMAIL</Text>
        </View>
        {attendees.length > 0 ? (
          attendees.map((attendee, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{attendee.name || 'No Name'}</Text>
              <Text style={styles.tableRowText}>{attendee.email || 'No Email'}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>No guests available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  headerSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#444',
  },
  headerText: {
    marginLeft: 20,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    color: '#ccc',
    marginTop: 5,
  },
  scanButton: {
    backgroundColor: '#ff0',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonText: {
    fontSize: 16,
  },
  chartContainer: {
    padding: 20,
    backgroundColor: '#555',
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legendText: {
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#666',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#777',
    borderRadius: 5,
  },
  filterButtonActive: {
    backgroundColor: '#ff0',
  },
  filterButtonText: {
    color: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#888',
  },
  tableHeaderText: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#999',
    borderBottomWidth: 1,
    borderBottomColor: '#777',
  },
  tableRowText: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  }
});

export default Attendee;
