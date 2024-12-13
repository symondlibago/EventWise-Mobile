import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { useNavigation } from '@react-navigation/native';

const ServicePortfolioSP = () => {
  const navigation = useNavigation();
  const [serviceType, setServiceType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [loading, setLoading] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleAddCoverPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      Alert.alert('Image selection was cancelled.');
      return;
    }

    if (result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setCoverPhoto(imageUri);
    } else {
      Alert.alert('No image was selected.');
    }
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhoto(null);
  };

  const handleCreatePortfolio = () => {
    if (!serviceType || !priceRange) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Service Portfolio created successfully!');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('ServiceSP')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={32} color="#FFC42B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Service Details</Text>
        </View>

        <TouchableOpacity style={styles.coverPhotoContainer} onPress={handleAddCoverPhoto}>
          {coverPhoto ? (
            <>
              <Image source={{ uri: coverPhoto }} style={styles.coverPhotoImage} />
              <TouchableOpacity onPress={handleRemoveCoverPhoto} style={styles.removePhotoButton}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Ionicons name="add" size={24} color="black" style={styles.coverPhotoIcon} />
              <Text style={styles.coverPhotoText}>Add Cover</Text>
            </>
          )}
        </TouchableOpacity>

        <LinearGradient colors={['#00000000', '#000000', '#00000000']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.line} />

        <Text style={styles.labels}>Service Details</Text>

        <Text style={styles.label}>Service Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Type of Services"
          placeholderTextColor="#B0B0B0"
          value={serviceType}
          onChangeText={setServiceType}
        />

        <Text style={styles.label}>Price Range</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Price Range"
          placeholderTextColor="#B0B0B0"
          value={priceRange}
          onChangeText={setPriceRange}
        />

        <TouchableOpacity style={styles.createPortfolioButton} onPress={handleCreatePortfolio} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="add" size={24} color="white" />
              <Text style={styles.createPortfolioText}>Create Service Portfolio</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 100,
  },
  scrollViewContent: {
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
    color: '#eeba2b',
    flex: 1,
    textAlign: 'center',
  },
  coverPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dashed',
    position: 'relative',
    overflow: 'hidden',
    height: 200, // Ensure the container has a fixed height
  },
  coverPhotoImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    top: 0,
    left: 0,
  },
  coverPhotoIcon: {
    marginRight: 10,
  },
  coverPhotoText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 5,
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  labels: {
    fontSize: 20,
    color: '#000000',
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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

export default ServicePortfolioSP;
