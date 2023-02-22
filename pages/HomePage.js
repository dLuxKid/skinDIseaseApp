import { StyleSheet, Dimensions, View, Text } from "react-native";
import React from "react";
import DefaultTitle from "../components/DefaultTitle";
import { useSelector } from "react-redux";
import colors from "../colors/colors";

const HomePage = ({ navigation }) => {
  const username = useSelector((state) => state.user.user.username);

  return (
    <View style={styles.screen}>
      <View>
        <DefaultTitle style={styles.headerText}>Hey, {username}</DefaultTitle>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    jutisfyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: colors.primary,
    marginTop: Dimensions.get("window").height * 0.05,
    fontSize: 24,
  },
});
