import React from "react";
import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";

const Step2SelectPackage = ({
  filteredPackages,
  selectedPackage,
  handlePackageSelect,
  styles,
}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Choose an Event Package</Text>

      {filteredPackages.length > 0 ? (
        <FlatList
          data={filteredPackages}
          keyExtractor={(item) => item.packageId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.packageItem,
                selectedPackage?.packageId === item.packageId &&
                  styles.packageItemSelected,
              ]}
              onPress={() => handlePackageSelect(item)}
            >
              <Image
                source={
                  item.packageImage ? item.packageImage : null //require("path_to_placeholder")
                }
                style={styles.packageImage}
              />
              <View style={styles.packageInfo}>
                <Text style={styles.packageName}>{item.packageName}</Text>
                <Text style={styles.packagePrice}>
                  Base Price: ${item.basePrice}
                </Text>
                <Text style={styles.packageDescription}>
                  {item.packageDescription}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noPackagesText}>
          No packages available for the selected event type.
        </Text>
      )}
    </>
  );
};

export default Step2SelectPackage;
