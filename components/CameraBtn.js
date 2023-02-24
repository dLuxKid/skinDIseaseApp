import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors/colors";

const CameraBtn = (props) => {
  const { color, title, onPress, icon, } = props;
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "andriod" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.button}
      >
        <Ionicons
          name={icon}
          size={28}
          color={color ? color : colors.primary}
        />
        <Text style={styles.title}>{title}</Text>
      </ButtonComponent>
    </View>
  );
};

export default CameraBtn;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: "50%",
    height: 40,
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.primary,
    fontFamily: "semiBold",
    fontSize: 14,
    marginHorizontal: 10,
  },
});
