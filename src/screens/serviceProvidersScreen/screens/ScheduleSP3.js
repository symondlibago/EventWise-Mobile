// import React, { useCallback, useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   useColorScheme,
//   View,
// } from "react-native";
// import RadioButtonRN from "radio-buttons-react-native";
// import Colors from "../styles";
// import { get, save } from "../../../stateManagement/store";
// import { LinearGradient } from "expo-linear-gradient";

// import { styling } from "../styles/styles";
// const ScheduleSP = () => {
//   const [themeValue, setThemeValue] = useState("default");
//   const [initialValue, setInitialValue] = useState(3);
//   const themes = useColorScheme();

//   const data = [
//     { label: "Light Mode", value: "light" },
//     { label: "Dark Mode", value: "dark" },
//     { label: "System Default", value: "default" },
//   ];

//   const themeOperations = (theme) => {
//     switch (theme) {
//       case "dark":
//         setTheme(theme, false);
//         setInitialValue(2);
//         break;
//       case "light":
//         setTheme(theme, false);
//         setInitialValue(1);
//         break;
//       case "default":
//         setTheme(themes, true);
//         setInitialValue(3);
//         break;
//       default:
//         setTheme(themes, true);
//         setInitialValue(3);
//         break;
//     }
//   };

//   const getAppTheme = useCallback(async () => {
//     const theme = await get("Theme");
//     const isDefault = await get("IsDefault");
//     isDefault ? themeOperations("default") : themeOperations(theme);
//   }, []);

//   const setTheme = useCallback(async (theme, isDefault) => {
//     await save("Theme", theme);
//     await save("IsDefault", isDefault);
//     setThemeValue(theme);
//   }, []);

//   useEffect(() => {
//     getAppTheme();
//   }, [getAppTheme]);

//   const styles = styling(themeValue);
//   const gradientColors =
//     themeValue === "dark"
//       ? ["#1e1e1e", "#3c3c3c"] // Dark mode gradient
//       : themeValue === "light"
//       ? ["#ffffff", "#ff0000"] // Light mode gradient
//       : ["#87ceeb", "#1e90ff"]; // Default gradient (sky blue)

//   return (
//     <LinearGradient
//       colors={gradientColors} // Example gradient colors
//       // colors={Colors[themeValue]?.themeColor || ["#87ceeb", "#1e90ff"]}
//       style={styles.container}
//     >
//       <Text style={styles.textStyle}>
//         This is a demo of default dark/light theme with switch/Buttons using
//         async storage.
//       </Text>
//       <TextInput
//         style={styles.textInputStyle}
//         placeholder="Type here"
//         placeholderTextColor={Colors[themeValue]?.gray || "#888"}
//       />
//       <TouchableOpacity style={styles.touchableStyle}>
//         <Text style={styles.buttonTextStyle}>Button</Text>
//       </TouchableOpacity>
//       <RadioButtonRN
//         data={data}
//         selectedBtn={(e) => themeOperations(e?.value)}
//         initial={initialValue}
//         activeColor={Colors[themeValue]?.activeColor || "#000"}
//         deactiveColor={Colors[themeValue]?.deactiveColor || "#ccc"}
//         boxActiveBgColor={Colors[themeValue]?.boxActiveColor || "#ddd"}
//         // boxDeactiveBgColor={Colors[themeValue]?.themeColor || "#fff"}
//         textColor={Colors[themeValue]?.white || "#000"}
//       />
//     </LinearGradient>
//   );
// };

// export default ScheduleSP;
