import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FeedbackPage = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleStarPress = (index) => {
    setRating(index + 1); // Set rating based on star index (0-based)
  };

  const handleSubmit = () => {
    // Handle feedback submission logic
    console.log("Feedback submitted:", { rating, feedback });
    // Reset fields after submission if needed
    setRating(0);
    setFeedback("");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('EventsSP')}>
            <Ionicons name="arrow-back" size={24} color="#FFCE00" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Feedback</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
              <Ionicons
                name={index < rating ? "star" : "star-outline"}
                size={40} // Increased star size
                color={index < rating ? "#FFCE00" : "gray"}
              />
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.ratingText}>{rating} {rating === 1 ? "Star" : "Stars"} Rated</Text>
        
        <TextInput
          style={styles.input}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Type your feedback here"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#eeba2b',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Center header text
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the stars
    marginBottom: 10,
  },
  ratingText: {
    textAlign: 'center', // Center the rating indication text
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FeedbackPage;
