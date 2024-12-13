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
// import { LinearGradient } from "expo-linear-gradient";
// import useStore from "../../../stateManagement/store"; // Ensure the correct path

// const ScheduleSP = () => {
//   const themes = useColorScheme();
//   const [initialValue, setInitialValue] = useState(3);
//   const { theme, setTheme, initializeTheme } = useStore((state) => ({
//     theme: state.theme,
//     setTheme: state.setTheme,
//     initializeTheme: state.initializeTheme,
//   }));

//   const data = [
//     { label: "Light Mode", value: "light" },
//     { label: "Dark Mode", value: "dark" },
//     { label: "System Default", value: "default" },
//   ];

//   const themeOperations = (theme) => {
//     switch (theme) {
//       case "dark":
//         setTheme(theme);
//         setInitialValue(2);
//         break;
//       case "light":
//         setTheme(theme);
//         setInitialValue(1);
//         break;
//       case "default":
//         setTheme(themes);
//         setInitialValue(3);
//         break;
//       default:
//         setTheme(themes);
//         setInitialValue(3);
//         break;
//     }
//   };

//   const getAppTheme = useCallback(async () => {
//     await initializeTheme();
//     themeOperations(theme);
//   }, [initializeTheme, theme]);

//   useEffect(() => {
//     getAppTheme();
//   }, [getAppTheme]);

//   const styles = styling(theme);
//   const gradientColors =
//     theme === "dark"
//       ? ["#1e1e1e", "#3c3c3c"]
//       : theme === "light"
//       ? ["#ffffff", "#ff0000"]
//       : ["#87ceeb", "#1e90ff"];

//   return (
//     <LinearGradient
//       colors={Colors[theme]?.themeColor || gradientColors}
//       style={styles.container}
//     >
//       <Text style={styles.textStyle}>
//         This is a demo of default dark/light theme with switch/Buttons using
//         async storage.
//       </Text>
//       <TextInput
//         style={styles.textInputStyle}
//         placeholder="Type here"
//         placeholderTextColor={Colors[theme]?.gray || "#888"}
//       />
//       <TouchableOpacity style={styles.touchableStyle}>
//         <Text style={styles.buttonTextStyle}>Button</Text>
//       </TouchableOpacity>
//       <RadioButtonRN
//         data={data}
//         selectedBtn={(e) => themeOperations(e?.value)}
//         initial={initialValue}
//         activeColor={Colors[theme]?.activeColor || "#000"}
//         deactiveColor={Colors[theme]?.deactiveColor || "#ccc"}
//         boxActiveBgColor={Colors[theme]?.boxActiveColor || "#ddd"}
//         textColor={Colors[theme]?.white || "#000"}
//       />
//     </LinearGradient>
//   );
// };

// export default ScheduleSP;
