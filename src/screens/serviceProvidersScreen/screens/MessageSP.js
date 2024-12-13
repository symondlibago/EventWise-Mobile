import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import proPic from '../assets/pro_pic.png'; // Import profile picture

const initialMessagesData = [
  { id: '1', name: 'John Doe', messages: [{ text: 'Looking forward to the event!', time: 'Today 9:27 PM', fromUser: false }], unreadCount: 2 },
  { id: '2', name: 'Jane Smith', messages: [{ text: 'Can I get more details?', time: '3d', fromUser: false }], unreadCount: 1 },
  { id: '3', name: 'Emily Johnson', messages: [{ text: 'Excited to attend!', time: '5d', fromUser: false }], unreadCount: 0 },
];

const MessageSP = ({ navigation }) => {
  const [messagesData, setMessagesData] = useState(initialMessagesData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedMessage) {
      const updatedMessages = [
        ...selectedMessage.messages,
        { text: newMessage, time: 'now', fromUser: true }
      ];

      const updatedMessagesData = messagesData.map(message =>
        message.id === selectedMessage.id ? { ...message, messages: updatedMessages } : message
      );

      setMessagesData(updatedMessagesData);
      setSelectedMessage({ ...selectedMessage, messages: updatedMessages });
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {messagesData.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageContainer} onPress={() => {
            setSelectedMessage(message);
            setModalVisible(true);
          }}>
            <Image source={proPic} style={styles.profileImage} />
            <View style={styles.messageContent}>
              <Text style={styles.senderName}>{message.name}</Text>
              <Text style={styles.messagePreview}>{message.messages[message.messages.length - 1]?.text}</Text>
            </View>
            <View style={styles.messageDetails}>
              <Text style={styles.daysAgo}>{message.messages[message.messages.length - 1]?.time}</Text>
              {message.unreadCount > 0 && (
                <View style={styles.reminderCircle}>
                  <Text style={styles.reminderText}>{message.unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        transparent={false}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
              <Ionicons name="close" size={32} color="black" />
            </TouchableOpacity>
            <Image source={proPic} style={styles.profilePic} />
            <Text style={styles.modalTitle}>{selectedMessage?.name}</Text>
          </View>
          <View style={styles.separator} />
          <Text style={styles.modalTime}>{selectedMessage?.messages[selectedMessage.messages.length - 1]?.time}</Text>
          <ScrollView style={styles.chatContainer}>
            {selectedMessage?.messages.map((msg, index) => (
              <View key={index} style={[styles.chatMessage, msg.fromUser ? styles.sentMessage : styles.receivedMessage]}>
                <Text style={msg.fromUser ? styles.sentText : styles.receivedText}>{msg.text}</Text>
                <Text style={styles.chatTime}>{msg.time}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type your message"
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Ionicons name="send" size={24} color="#FFC42B" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
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
    color: '#000000',
    fontWeight: 'bold',
  },
  messagePreview: {
    color: '#000000',
  },
  messageDetails: {
    alignItems: 'flex-end',
  },
  daysAgo: {
    color: '#000000',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC42B',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    opacity: 0.3,
    marginVertical: 10,
    width: '100%',
  },
  modalTime: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#000000',
  },
  chatContainer: {
    flex: 1,
    maxHeight: '60%',
  },
  chatMessage: {
    marginBottom: 5,
    borderRadius: 5,
    padding: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFC42B',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#000000',
  },
  chatTime: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default MessageSP;
