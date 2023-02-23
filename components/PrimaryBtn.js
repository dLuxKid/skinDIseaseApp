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

const PrimaryBtn = (props) => {
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
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "regular",
    fontSize: 16,
  },
});

export default PrimaryBtn;
