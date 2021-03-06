
import React from 'react';
import { StyleSheet, Text } from "react-native";
import Theme from "../../constants/theme";

const styles = StyleSheet.create({
  title: {
    fontSize: Theme.type.lg,
    fontFamily: Theme.type.alpha,
    backgroundColor: "transparent"
  },
  titlexl: {
    fontSize: Theme.type.xl,
    fontFamily: Theme.type.alpha,
    backgroundColor: "transparent"
  },
  titlebold: {
    fontSize: Theme.type.lg,
    fontFamily: Theme.type.bold,
    backgroundColor: "transparent"
  },
  body: {
    fontSize: Theme.type.md,
    fontFamily: Theme.type.beta,
    backgroundColor: "transparent"
  }
});

export const TitleAlpha = ({ style, ...props }) => (
  <Text style={[styles.titlexl, style]} {...props} />
);

export const TitleBeta = ({ style, ...props }) => (
  <Text style={[styles.title, style]} {...props} />
);

export const TitleBold = ({ style, ...props }) => (
  <Text style={[styles.titlebold, style]} {...props} />
);

export const Body = ({ style, ...props }) => (
  <Text style={[styles.bodylight, style]} {...props} />
);
