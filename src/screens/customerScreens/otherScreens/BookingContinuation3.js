import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  Alert, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../elements/Header";

const BookingContinuation3 = () => {
  const [selectedVenueLocation, setSelectedVenueLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.selectedVenueLocation) {
      setSelectedVenueLocation(route.params.selectedVenueLocation);
    }
  }, [route.params]);

  const navigateToVenue = () => {
    navigation.navigate('Venue', {
      setVenueLocation: (venueLocation) => setSelectedVenueLocation(venueLocation),
    });
  };

  const handleNextStep = async () => {
    if (!selectedVenueLocation) {
      Alert.alert('Venue is required', 'Please choose a venue before proceeding.');
    } else {
      try {
        // Save the selected venue location to AsyncStorage
        await AsyncStorage.setItem('selectedVenueLocation', selectedVenueLocation);
        navigation.navigate("BookingContinuation4", { selectedVenueLocation });
      } catch (error) {
        console.error('Failed to save venue location to AsyncStorage:', error);
        Alert.alert('Error', 'Failed to save venue location.');
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Venue</Text>
        </View>

          <TouchableOpacity style={styles.navigateButton} onPress={navigateToVenue}>
            <Text style={styles.navigateButtonText}>Choose Venue</Text>
          </TouchableOpacity>

          <View style={styles.selectedVenueContainer}>
            {selectedVenueLocation ? (
              <Text style={styles.selectedVenueText}>{selectedVenueLocation}</Text>
            ) : (
              <Text style={styles.placeholderText}>No venue selected</Text>
            )}
          </View>

          <View style={styles.navigationContainer}>
            <TouchableOpacity 
              style={styles.bookButton} 
              onPress={handleNextStep}
            >
              <Text style={styles.bookButtonText}>Next</Text>
            </TouchableOpacity>
            
          </View>    
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',  
    textAlign: 'center',
    fontFamily: "Poppins",
  },  
  navigateButton: {
    backgroundColor: "rgba(194, 176, 103, .2)",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontFamily: "Poppins",
    borderColor: '#C2B067',
    borderWidth: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  navigateButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  selectedVenueContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  selectedVenueText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
  placeholderText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    fontFamily: "Poppins",
  },
  navigationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bookButton: {
    backgroundColor: '#FFC42B',  
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: '40%',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',  
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 'bold',
  },
});

export default BookingContinuation3;
