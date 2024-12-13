import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const contacts = [
  { id: '1', name: 'Adelyn Eyana' },
  { id: '2', name: 'Adelyn Eyana' },
  { id: '3', name: 'Adelyn Eyana' },
  { id: '4', name: 'Adelyn Eyana' },
  { id: '5', name: 'Adelyn Eyana' },
  { id: '6', name: 'Adelyn Eyana' },
  { id: '7', name: 'Adelyn Eyana' },
  { id: '8', name: 'Adelyn Eyana' },
];

const SelectContactView = () => {
  const navigator = useNavigation();

  const renderContact = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactContainer} 
      onPress={() => navigator.navigate('ConvoView', { contact: item })}
    >
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigator.goBack()}>
        <Icon name="arrow-left" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Select Contact</Text>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contactsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  goBackButton: {
    marginLeft: 10,
    marginTop: 18,
  },
  title: {
    marginLeft: 10,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 25,
    fontWeight: 'bold',
  },
  contactsList: {
    paddingBottom: 16,
  },
  contactContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default SelectContactView;