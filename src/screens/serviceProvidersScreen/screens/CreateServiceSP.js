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

const CreateServiceSP = () => {
  const navigation = useNavigation();
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  const handleCreateService = () => {
    // Handle Create Service button press
    Alert.alert('Create Service', 'Service created successfully.');
  };

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']} // Gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }}   // Bottom
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Header with a back icon and Create Service text */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={32} color="#FFC42B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create Service</Text>
        </View>

        {/* Broken Line Box */}
        <View style={styles.brokenBoxContainer}>
          <Text style={styles.label}>Service Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Service Name"
            placeholderTextColor="#B0B0B0"
            value={serviceName}
            onChangeText={setServiceName}
          />

          <Text style={styles.label}>Service Price</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Service Price"
            placeholderTextColor="#B0B0B0"
            value={servicePrice}
            onChangeText={setServicePrice}
          />
        </View>

        {/* Fading Line */}
        <LinearGradient
          colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']} // White fading effect
          start={{ x: 0, y: 0.5 }} // Horizontal gradient
          end={{ x: 1, y: 0.5 }}   // Horizontal gradient
          style={styles.line}
        />

        {/* Create Service Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateService}
        >
          <Text style={styles.createButtonText}>Create</Text>
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
  brokenBoxContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed', // Dashed border style
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20, // Space between the broken box and the button
  },
  label: {
    fontSize: 14,
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
  createButton: {
    backgroundColor: '#FFC42B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateServiceSP;
