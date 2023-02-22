import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import colors from "../colors/colors";

const DefaultBtn = (props) => {
  const { children, onPress, style } = props;
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "andriod" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={{ ...styles.buttonContainer, ...style }}>
      <ButtonComponent activeOpacity={0.7} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: colors.cta,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "semiBold",
    fontSize: 18,
  },
});

export default DefaultBtn;
