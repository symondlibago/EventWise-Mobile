const commonColor = {
  commonWhite: "#FFFFFF",
  commonBlack: "#000000",
  activeColor: "#fcd436",
  deactiveColor: "#fcd43650",
  boxActiveColor: "#fcd43640",
};

const light = {
  themeColor: ["#FFFFFF", "#F5F5F5"], // Light mode gradient
  white: "#000000",
  sky: "#DE5E69",
  gray: "gray",
  ...commonColor,
};

const dark = {
  themeColor: ["#1e1e1e", "#3c3c3c"], // Dark mode gradient
  white: "#FFFFFF",
  sky: "#831a23",
  gray: "white",
  ...commonColor,
};

// const gradientColors =
//   themeValue === "dark"
//     ? ["#1e1e1e", "#3c3c3c"]
//     : themeValue === "light"
//     ? ["#FFFFFF", "#F5F5F5"]
//     : ["#87ceeb", "#1e90ff"]; // Default gradient
export default { light, dark };
