import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const EventPackageDetails = ({ route }) => {
  const { packageItem } = route.params;

  // console.log(packageItem);

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.header}>Package ID: {packageItem.id}</Text> */}

      <ScrollView>
        <View style={styles.packageInfo}>
          <Text style={styles.label}>Package Name:</Text>
          <Text style={styles.value}>{packageItem.packageName}</Text>

          <Text style={styles.label}>Package Descriptionsss:</Text>
          <Text style={styles.value}>{packageItem.packageDescription}</Text>

          <Text style={styles.label}>Package Type:</Text>
          <Text style={styles.value}>{packageItem.eventType}</Text>

          <Text style={styles.label}>Package Inclusions:</Text>
          <View style={styles.servicesContainer}>
            {packageItem.services.map((service, index) => (
              <Text key={index} style={styles.service}>
                • {service}
              </Text>
            ))}
          </View>

          <Text style={styles.label}>Package Price:</Text>
          <Text style={styles.value}>{packageItem.totalPrice}</Text>

          <Text style={styles.label}>Package Date:</Text>
          <Text style={styles.value}>{packageItem.packageCreatedDate}</Text>
        </View>
        {/* <View style={{ height: 500 }}></View> */}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packageInfo: {
    // backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  servicesContainer: {
    marginBottom: 10,
  },
  service: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EventPackageDetails;
