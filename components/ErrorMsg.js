import { Text } from "react-native";
import React from "react";

const ErrorMsg = ({ children }) => {
  return (
    <Text
      style={{
        color: "red",
        opacity: 0.8,
        fontFamily: "light",
        paddingLeft: 5,
      }}
    >
      {children}
    </Text>
  );
};

export default ErrorMsg;
