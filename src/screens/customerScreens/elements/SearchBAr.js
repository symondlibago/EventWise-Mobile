import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SearchBar = ({ onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => onSearch(searchQuery)}
      />
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icon name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 6,
    backgroundColor: '#D9D9D9',  
    borderRadius: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#D9D9D9',  
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  closeButton: {
    padding: 10,
  },
});

export default SearchBar;
