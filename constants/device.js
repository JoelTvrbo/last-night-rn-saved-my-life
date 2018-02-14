import { Dimensions, Platform, StyleSheet } from "react-native";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const hf = w / 2;
const t = h / 25;
const ww = w / 25;
const X_WIDTH = 375;
const X_HEIGHT = 812;

const isIPhoneX = () => {
  const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
  );
};

export const WIDTH = w;
export const HEIGHT = h;
export const HALF = hf;
export const STATUSBAR = Platform.OS === "ios" ? 20 : 0;
export const TALL = t;
export const WIDE = ww;
export const isX = isIPhoneX();
export const isShortDevice = HEIGHT < 600;
export const isThinDevice = WIDTH < 375;
