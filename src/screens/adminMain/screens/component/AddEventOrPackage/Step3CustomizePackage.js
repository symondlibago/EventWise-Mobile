import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Step3CustomizePackage = ({
  servicesList,
  selectedServices,
  handleServiceToggle,
  totalPrice,
  styles,
}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Customize Your Package</Text>

      {["Food Catering", "Photography", "Videography"].map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {servicesList
            .filter(
              (service) =>
                service.serviceCategory.toLowerCase() === category.toLowerCase()
            )
            .map((service) => (
              <TouchableOpacity
                key={service.serviceId}
                style={styles.serviceItem}
                onPress={() =>
                  handleServiceToggle(category, service.serviceName)
                }
              >
                <View style={styles.checkbox}>
                  {selectedServices[category] &&
                  selectedServices[category].includes(service.serviceName) ? (
                    <Text style={styles.checkboxText}>✔️</Text>
                  ) : null}
                </View>
                <Text style={styles.serviceName}>
                  {service.serviceName} (${service.basePrice})
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      ))}

      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>Total Price: ${totalPrice}</Text>
      </View>
    </>
  );
};

export default Step3CustomizePackage;
