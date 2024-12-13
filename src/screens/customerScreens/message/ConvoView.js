import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConvoView = ({ route }) => {
  const navigator = useNavigation();
  const { contact } = route.params;

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi', sender: 'other', timestamp: '2021-06-01T09:41:00Z' },
    { id: 2, text: 'How are you?', sender: 'other', timestamp: '2021-06-01T09:42:00Z' },
    { id: 3, text: 'Fine! What\'s your email?', sender: 'user', timestamp: '2021-06-01T09:43:00Z' },
    { id: 4, text: 'Good Night.', sender: 'other', timestamp: '2021-06-01T09:44:00Z' }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigator.goBack()}
          >
            <Icon name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{contact.name}</Text>
        </View>
        
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender === 'user' ? styles.userMessage : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.messageTimestamp}>{formatTimestamp(item.timestamp)}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesList}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginTop: 10,
  },
  goBackButton: {
    marginRight: 20,
    marginLeft: 10,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4a4a4a',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2a2a2a',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#e6b800',
    borderRadius: 20,
  },
});

export default ConvoView;