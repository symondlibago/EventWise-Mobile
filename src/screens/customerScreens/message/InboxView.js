import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../elements/SearchBAr';

const conversations = [
  { id: '1', name: 'Adelyn Eyana', lastMessage: 'Hey there!', time: '9:41' },
  { id: '2', name: 'Adelyn Eyana', lastMessage: 'See you soon.', time: '9:41' },
  { id: '3', name: 'Adelyn Eyana', lastMessage: 'Got it, thanks!', time: '9:41' },
  { id: '4', name: 'Adelyn Eyana', lastMessage: 'Call me back.', time: '9:41' },
  { id: '5', name: 'Adelyn Eyana', lastMessage: 'Meeting at 3 PM.', time: '9:41' },
  { id: '6', name: 'Adelyn Eyana', lastMessage: 'Can we reschedule?', time: '9:41' },
  { id: '7', name: 'Adelyn Eyana', lastMessage: 'Check this out!', time: '9:41' },
  { id: '8', name: 'Adelyn Eyana', lastMessage: 'Good night.', time: '9:41' },
];

const InboxView = () => {
  const navigator = useNavigation();
  const [showSearch, setShowSearch] = useState(false);

  const renderConversation = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactContainer} 
      onPress={() => navigator.navigate('ConvoView', { contact: item })}
    >
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactMessage}>{item.lastMessage}</Text>
      <Text style={styles.contactTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigator.goBack()}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowSearch(true)}
          style={styles.searchIconButton}
        >
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      {showSearch && (
        <SearchBar
          onClose={() => setShowSearch(false)}
          onSearch={handleSearch}
        />
      )}
      <View style={styles.titleCon}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contactsList}
      />
      <TouchableOpacity 
        style={styles.newMessageButton} 
        onPress={() => navigator.navigate('SelectContactView')}
      >
        <Icon name="plus" size={20} color="#000" />
        <Text style={styles.newMessageButtonText}>Create New Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 5,
  },
  searchIconButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  title: {
    marginLeft: 10,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: 'bold',
    color: "#000",
    alignItems: "center"
  },
  titleCon: {
    alignSelf: "center",
    marginTop: -20,
  },
  contactsList: {
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  contactContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: 'bold',
    color: '#000',
  },
  contactMessage: {
    color: '#666',
    marginVertical: 4,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  contactTime: {
    color: '#999',
    alignSelf: 'flex-end',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  newMessageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6e6',
    padding: 16,
    borderRadius: 20,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  newMessageButtonText: {
    color: '#000',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: "Poppins",
  },
});

export default InboxView;
