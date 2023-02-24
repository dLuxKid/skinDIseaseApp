import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import DefaultText from "../components/DefaultText";
import colors from "../colors/colors";

const ResultsScreen = ({ navigation, route }) => {
  const { imageUri } = route.params;

  return (
    <View>
      <View style={styles.header}>
        <DefaultText style={styles.headerText}>DIAGNOSIS</DefaultText>
      </View>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{ uri: imageUri }}
          resizeMode="contain"
        />
      </View>
      <ScrollView style={styles.aboutDisease}>
        <View style={{ marginBottom: 10 }}>
          <DefaultText style={styles.headerText}>
            Psoriasis Vulgaris
          </DefaultText>
        </View>
        <View>
          <DefaultText style={styles.bodyText}>
            Psoriasis vulgaris is a chronic autoimmune condition that affects
            the skin. It is characterized by red, scaly, and often itchy patches
            that typically appear on the scalp, elbows, knees, and lower back.
          </DefaultText>
        </View>
        <View>
          <DefaultText style={styles.bodyText}>
            Psoriasis vulgaris is not contagious and not life-threathening
          </DefaultText>
        </View>
        <View>
          <DefaultText style={styles.bodyText}>
            Apply topical creams and ointments, and seek medical attention
          </DefaultText>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  header: {
    marginVertical: Dimensions.get("window").height * 0.05,
  },
  headerText: {
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imgContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: colors.secondary,
    justifyContent: "center",
  },
  img: {
    height: "80%",
    width: "100%",
  },
  aboutDisease: {
    marginVertical: Dimensions.get("window").height * 0.025,
    flexDirection: "column",
  },
  bodyText: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
    fontSize: 14,
    fontFamily: "medium",
  },
});
