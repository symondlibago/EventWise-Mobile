import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../elements/SearchBAr';

const CustomizePackage = () => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Photographer');
  const [selectedServices, setSelectedServices] = useState([]);

  const serviceData = {
    Photographer: [
      { name: 'Diwata Photography', price: 10, image: require('../pictures/cp2.png') },
      { name: '1 Photography', price: 10, image: require('../pictures/cp1.png') },
      { name: '2 Photography', price: 10, image: require('../pictures/cp3.png') },
    ],
    'Food Catering': [
      { name: 'Diwata Pares', price: 20, image: require('../pictures/cp1.png') },
      { name: 'Pitik ni Diwata', price: 20, image: require('../pictures/cp.png') },
      { name: 'Diwata ni', price: 20, image: require('../pictures/cp2.png') },
    ],
    Decoration: [
      { name: 'Diwata Decor', price: 25, image: require('../pictures/cp3.png') },
      { name: 'Diwata 1', price: 25, image: require('../pictures/cp2.png') },
      { name: 'Diwata 2', price: 25, image: require('../pictures/cp1.png') },
    ],
    'Service A': [
      { name: 'Service 1', price: 25, image: require('../pictures/cp3.png') },
      { name: 'Service 2', price: 25, image: require('../pictures/cp.png') },
      { name: 'Service 3', price: 25, image: require('../pictures/cp1.png') },
    ],
    'Service B': [
      { name: 'Service 4', price: 25, image: require('../pictures/cp2.png') },
      { name: 'Service 5', price: 25, image: require('../pictures/cp1.png') },
      { name: 'Service 6', price: 25, image: require('../pictures/cp3.png') },
    ],
    'Service C': [
      { name: 'Service 7', price: 25, image: require('../pictures/cp.png') },
      { name: 'Service 8', price: 25, image: require('../pictures/cp2.png') },
      { name: 'Service 9', price: 25, image: require('../pictures/cp1.png') },
    ],
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.some((item) => item.name === service.name)
        ? prev.filter((item) => item.name !== service.name)
        : [...prev, { ...service, type: selectedTab }]
    );
  };

  const handleSubmitPress = () => {
    const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
    navigation.navigate('BookingContinuation2', { selectedPackage: selectedServices, totalPrice: total });
  };
  
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}> 
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.head}>
              <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Image
                source={require("../../../../assets/logoWhite.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Image
              source={require("../pictures/line.png")}
              style={styles.line}
              resizeMode="contain"
            />
          </SafeAreaView>
          {/* <View style={styles.header}>
            <Text style={styles.headText}>Package</Text>
            <TouchableOpacity
              onPress={() => setShowSearch(true)}
              style={styles.iconButton}
            >
              <Icon name="search" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {showSearch && (
            <SearchBar
              onClose={() => setShowSearch(false)}
              onSearch={handleSearch}
            />
          )} */}
          <ScrollView>
            {/* <Text style={styles.debutText}>Debut Packages</Text> */}
           
            <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.tabScrollViewContent} 
          >
            <View style={styles.tabContainer}>
              {Object.keys(serviceData).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text style={[styles.tabButtonText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
            {serviceData[selectedTab].map((service, index) => (
              <View key={index} style={styles.serviceButton} onPress={() => toggleService(service)}>
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceName}>{service.name}</Text>
                <TouchableOpacity style={styles.addButtonContainer} onPress={() => toggleService(service)}>
                  <Text style={styles.addButton}>{selectedServices.some((item) => item.name === service.name) ? '✔️' : '+'}</Text>
                </TouchableOpacity>
                <Text style={styles.servicePrice}>{service.price}k</Text>
              </View>
            ))}
          </ScrollView>
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Name</Text>
              <Text style={styles.summaryTitle}>Type</Text>
              <Text style={styles.summaryTitle}>Price</Text>
            </View>
            <View style={styles.summaryContainer}>
              {selectedServices.map((service, index) => (
                <View key={index} style={styles.summaryRow}>
                  <Text style={styles.summaryText}>{service.name}</Text>
                  <Text style={styles.summaryText}>{service.type}</Text>
                  <Text style={styles.summaryText}>{service.price}k</Text>
                </View>
              ))}
              <Text style={styles.totalText}>TOTAL: {total}k</Text>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPress}>
              <Text style={styles.submitButtonText}>SAVE</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    padding: 10,
    marginTop: 5,
    marginLeft: 8
  },
  logo: {
    flex: 1,
    height: "100%",
    marginEnd: 50,
  },
  iconButton: {
    marginLeft: -20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 5
  },
  line2: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headText: {
    color: '#e6b800',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
  headerText: {
    color: '#e6b800',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Poppins",
  },
  shText: {
    color: '#000',
    fontSize: 16,
    textAlign: "left",
    marginStart: 20,
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  searchButton: {
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
  searchButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: "Poppins",
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
  },
  debutText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: "Poppins",
  },
  customizeText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  tabScrollViewContent: {
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  headerEType: {
    color: '#000',
    fontSize: 14,
    marginBottom: -2,
    marginTop: 20,
    marginLeft: 20,
    fontFamily: "Poppins",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 3,
    marginTop: 20,
  },
  tabButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  activeTab: {
    backgroundColor: '#e6b800',
    borderWidth: 1,
    borderColor: '#e6b800',
    elevation: 5,
  },
  activeTabText: {
    color: '#1e1e1e',
    fontFamily: "Poppins",
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  serviceButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    marginRight: 10,
  },
  serviceImage: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  serviceName: {
    color: '#000',
    fontSize: 18,
    marginTop: 10,
    textAlign: "left",
    fontFamily: "Poppins",
  },
  servicePrice: {
    color: '#000',
    fontSize: 16,
    marginTop: 5,
    textAlign: "left",
    fontFamily: "Poppins",
  },
  addButtonContainer: {
    backgroundColor: '#000',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addButton: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: "Poppins",
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  summaryTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    width: '33%',
    textAlign: 'center',
    fontFamily: "Poppins",
  },
  summaryContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    color: '#000',
    fontSize: 14,
    width: '33%',
    textAlign: 'center',
    fontFamily: "Poppins",
  },
  totalText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
    fontFamily: "Poppins",
  },
  submitButton: {
    backgroundColor: '#FFC42B',
    padding: 15,
    borderRadius: 25,
    marginLeft: 100,
    marginRight: 100,
    margin: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
});

export default CustomizePackage;
