import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import proPic from './assets/pro_pic.png'; // Import profile picture

const initialMessages = [
  { id: '1', name: 'John Doe', message: 'Looking forward to the event!', daysAgo: '1d', unreadCount: 2 },
  { id: '2', name: 'Jane Smith', message: 'Can I get more details?', daysAgo: '3d', unreadCount: 1 },
  { id: '3', name: 'Emily Johnson', message: 'Excited to attend!', daysAgo: '5d', unreadCount: 0 },
  // Add more message data as needed
];

const Messages = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.gradientContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {initialMessages.map((message) => (
          <View key={message.id} style={styles.messageContainer}>
            <Image source={proPic} style={styles.profileImage} />
            <View style={styles.messageContent}>
              <Text style={styles.senderName}>{message.name}</Text>
              <Text style={styles.messagePreview}>{message.message}</Text>
            </View>
            <View style={styles.messageDetails}>
              <Text style={styles.daysAgo}>{message.daysAgo}</Text>
              {message.unreadCount > 0 && (
                <View style={styles.reminderCircle}>
                  <Text style={styles.reminderText}>{message.unreadCount}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
    
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    backgroundColor: '#2A2600', // Dark background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  closeButton: {
    position: 'absolute',
    left: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC42B',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F4F4F', // Gray background for message rectangles
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  senderName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messagePreview: {
    color: '#B0B0B0',
  },
  messageDetails: {
    alignItems: 'flex-end',
  },
  daysAgo: {
    color: '#B0B0B0',
    marginBottom: 5,
  },
  reminderCircle: {
    backgroundColor: '#FFC42B',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default Messages;
