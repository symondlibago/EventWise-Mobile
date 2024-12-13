import { StyleSheet } from "react-native";
import Colors from "./Colors";

// Shared static styles
export const styles = StyleSheet.create({
  // For screens
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  // For logo
  logo: {
    flex: 1,
    height: "110%",
    resizeMode: "contain",
    marginLeft:50,
    marginBottom: 20,
  },
  // For header
  headerContainer: {
    height: 85,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    elevation: 4,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom  : 10,
  },
  headerButton: {
    marginLeft: 20,
  },
  // For UI components
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#331234",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

// Dynamic styling based on theme
export const styling = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      paddingHorizontal: 20,
    },
    textStyle: {
      color: Colors[theme]?.white || "#000",
    },
    textInputStyle: {
      borderColor: Colors[theme]?.gray || "#ccc",
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      width: "100%",
      marginTop: 20,
      color: Colors[theme]?.white || "#000",
    },
    touchableStyle: {
      backgroundColor: Colors[theme]?.sky || "#87ceeb",
      padding: 10,
      borderRadius: 6,
      width: "100%",
      height: 57,
      justifyContent: "center",
      marginTop: 20,
    },
    buttonTextStyle: {
      textAlign: "center",
      color: Colors[theme]?.commonWhite || "#fff",
      fontSize: 20,
      fontWeight: "500",
    },
  });
