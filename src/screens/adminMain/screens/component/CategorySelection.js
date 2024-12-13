// components/CategorySelection.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";

const CategorySelection = ({
  packageId,
  category,
  selectedOptions,
  onOptionToggle,
}) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{category.categoryName}</Text>
      {category.options.map((option) => (
        <View key={option.optionId} style={styles.optionContainer}>
          <Checkbox
            status={
              selectedOptions[packageId] &&
              selectedOptions[packageId][category.categoryId] &&
              selectedOptions[packageId][category.categoryId].includes(
                option.optionId
              )
                ? "checked"
                : "unchecked"
            }
            onPress={() =>
              onOptionToggle(
                packageId,
                category.categoryId,
                option.optionId,
                option.price
              )
            }
          />
          <Text style={styles.optionText}>
            {option.optionName} (${option.price})
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CategorySelection;

const styles = StyleSheet.create({
  categoryContainer: {
    width: "100%",
    marginBottom: 10,
    paddingLeft: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  optionText: {
    fontSize: 14,
    color: "#555",
  },
});
