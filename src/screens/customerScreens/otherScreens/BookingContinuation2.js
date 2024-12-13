import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Image,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-root-toast";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../elements/Header";

const BookingContinuation2 = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const navigator = useNavigation();

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, { duration: Toast.durations.LONG });
  };

  useEffect(() => {
    if (route.params) {
      const { selectedPackage, totalPrice } = route.params;
      if (selectedPackage) setSelectedPackage(selectedPackage);
      if (totalPrice) setTotalPrice(totalPrice);
    }
  }, [route.params]);

const handlePackageSelection = async () => {
  if (selectedPackage) {
    showToast('Package already selected');
  } else {
    navigation.navigate('Package');
  }
};

useEffect(() => {
  const savePackageData = async () => {
    try {
      await AsyncStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
      await AsyncStorage.setItem('totalPrice', totalPrice.toString());
    } catch (error) {
      console.error('Error saving package data:', error);
    }
  };

  savePackageData();
}, [selectedPackage, totalPrice]);


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
          <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Package</Text>
          </View>
          
          <View style={styles.formButton}>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={handlePackageSelection}
            >
              <Text style={styles.navigateButtonText}>Choose Package</Text>
            </TouchableOpacity>
            <View style={styles.selectedItemsContainer}>
              {selectedPackage ? (
                Array.isArray(selectedPackage) ? (
                  selectedPackage.map((pkg, index) => (
                    <View key={index} style={styles.serviceItem}>
                      <Image source={pkg.image} style={styles.serviceImage} />
                      <View style={styles.serviceS}>
                        <Text style={styles.serviceName}>{pkg.name}</Text>
                        <Text style={styles.serviceType}>{pkg.type}</Text>
                        <Text style={styles.servicePrice}>{pkg.price}k</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  // PACKAGE (NOT CUSTOMIZE)
                  <View style={styles.packageContainer}>
                    <Image
                      source={selectedPackage}
                      style={styles.selectedImage}
                    />
                  </View>
                )
              ) : (
                <Text style={styles.noSelection}>No package selected</Text>
              )}
              {Array.isArray(selectedPackage) && (
                <View>
                  <Text style={styles.selectedText}>
                    Total Price: {totalPrice}k
                  </Text>
                </View>
              )}
            </View>
            </View>

          <View style={styles.navigationContainer}>
            <TouchableOpacity 
              style={styles.bookButton} 
              onPress={() => {
                if (!selectedPackage) {
                  Alert.alert('Package is required', 'Please choose a package before proceeding.');
                } else {
                  navigator.navigate("BookingContinuation3");
                }
              }}
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
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  headerText: {
    color: '#000',  
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: "Poppins",
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },

  formButton: {
    marginVertical: 20,
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
    color: 'black',  
    fontSize: 16,
    fontFamily: "Poppins",
  },
  selectedItemsContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  noSelection: {
    fontSize: 16,
    color: 'gray',
    fontFamily: "Poppins",  
  },  
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  serviceS: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  serviceName: {
    fontSize: 18,
    color: 'black', 
    fontFamily: "Poppins", 
  },
  serviceType: {
    fontSize: 16,
    color: 'black', 
    fontFamily: "Poppins", 
  },
  servicePrice: {
    fontSize: 16,
    color: 'black', 
    fontFamily: "Poppins", 
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    fontFamily: "Poppins",  
  },
  noSelection: {
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

export default BookingContinuation2;
