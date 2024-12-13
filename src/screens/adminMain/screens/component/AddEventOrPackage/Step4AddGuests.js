import React from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";

const Step4AddGuests = ({ guests, updateGuest, addGuest, styles }) => {
  return (
    <View>
      <Text style={styles.subTitle}>Add Guests</Text>
      <FlatList
        data={guests}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.guestContainer}>
            <TextInput
              style={styles.input}
              placeholder="Guest Name"
              value={item.name}
              onChangeText={(text) => updateGuest(index, "name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Guest Email"
              value={item.email}
              onChangeText={(text) => updateGuest(index, "email", text)}
            />
          </View>
        )}
      />
      <Button title="Add Guest" onPress={addGuest} />
    </View>
  );
};

export default Step4AddGuests;
