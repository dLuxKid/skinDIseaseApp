import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../colors/colors";


const DefaultText = ({ children, style }) => {
  return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    alignSelf: "center",
    fontFamily:'medium',
    color:colors.secondary
  },
});

export default DefaultText;
