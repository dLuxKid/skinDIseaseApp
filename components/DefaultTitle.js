import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../colors/colors";


const DefaultTitle = ({ children, style }) => {
  return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    alignSelf: "center",
    fontFamily:'bold',
    color:colors.secondary
  },
});

export default DefaultTitle;
