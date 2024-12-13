import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ServicePortfolio = () => {
  const navigation = useNavigation();
  const [serviceType, setServiceType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleAddCoverPhoto = () => {
    // Handle the functionality to pick an image for the cover photo
    Alert.alert('Add Cover Photo', 'Functionality to choose an image for the cover photo.');
  };

  const handleCreatePortfolio = () => {
    // Handle Create Service Portfolio button press
    Alert.alert('Create Service Portfolio', 'Functionality to create a new service portfolio.');
  };

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']} // Gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }}   // Bottom
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Header with a back icon and Service Details text */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.backButton}>
  <Ionicons name="arrow-back" size={32} color="#FFC42B" />
</TouchableOpacity>

          <Text style={styles.headerText}>Service Details</Text>
        </View>

        {/* Add Cover Photo Section */}
        <TouchableOpacity
          style={styles.coverPhotoContainer}
          onPress={handleAddCoverPhoto}
        >
          <Ionicons name="add" size={24} color="white" style={styles.coverPhotoIcon} />
          <Text style={styles.coverPhotoText}>Add Cover</Text>
        </TouchableOpacity>

        {/* Fading Line */}
        <LinearGradient
          colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}  // White fading effect
          start={{ x: 0, y: 0.5 }}  // Horizontal gradient
          end={{ x: 1, y: 0.5 }}    // Horizontal gradient
          style={styles.line}
        />

        <Text style={styles.labels}>Event Details</Text>
        <Text style={styles.label}></Text>
        {/* Service Type */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Name"
          placeholderTextColor="#B0B0B0"
          value={serviceType}
          onChangeText={setServiceType}
        />
        
        <Text style={styles.label}>Type of Services</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Type of Services"
          placeholderTextColor="#B0B0B0"
          value={serviceType}
          onChangeText={setServiceType}
        />

        {/* Price Range */}
        <Text style={styles.label}>Price Range</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Price Range"
          placeholderTextColor="#B0B0B0"
          value={priceRange}
          onChangeText={setPriceRange}
        />

        {/* Create Service Portfolio Button */}
        <TouchableOpacity
          style={styles.createPortfolioButton}
          onPress={handleCreatePortfolio}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.createPortfolioText}>Create Service Portfolio</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC42B',
    flex: 1,
    textAlign: 'center',
  },
  coverPhotoContainer: {
    flexDirection: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 100,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed', // Dashed border style
    borderRadius: 10,
  },
  coverPhotoIcon: {
    marginRight: 10,
  },
  coverPhotoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,  // Space between the cover photo section and the text inputs
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  labels: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    color: '#000000',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
  createPortfolioButton: {
    backgroundColor: '#FFC42B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFC42B',
  },
  createPortfolioText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ServicePortfolio;
