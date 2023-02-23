// REACT NATIVE
import { StyleSheet, Dimensions, View, Image } from "react-native";
import React from "react";
// COMPONENT
import DefaultTitle from "../components/DefaultTitle";
import DefaultText from "../components/DefaultText";
import DefaultBtn from "../components/DefaultBtn";
import PrimaryBtn from '../components/PrimaryBtn'
// REDUX
import { useSelector } from "react-redux";
// STYLE
import colors from "../colors/colors";

const HomePage = ({ navigation }) => {
  const username = useSelector((state) => state.user.user.username);

  return (
    <View style={styles.screen}>
      <View>
        <DefaultTitle style={styles.headerText}>Hey, {username}</DefaultTitle>
      </View>
      <View style={styles.textContainer}>
        <DefaultText style={styles.bodyText}>Know what is your</DefaultText>
        <DefaultText style={styles.bodyText}>skin condition</DefaultText>
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/Image/lady.jpg")}
          resizeMode="stretch"
          style={styles.img}
        />
      </View>
      <View style={styles.btnContainer}>
        <PrimaryBtn>OPEN GALLERY</PrimaryBtn>
        <PrimaryBtn>START CAMERA</PrimaryBtn>
      </View>
      <View style={styles.btn}>
      <DefaultBtn>Begin Diagnosis</DefaultBtn>
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
    color: colors.cta,
    marginVertical: Dimensions.get("window").height * 0.05,
    fontSize: 24,
  },
  textContainer:{
    marginBottom: Dimensions.get("window").height * 0.025,
    alignItems:"center"
  },
  bodyText: {
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: '10%',
    lineHeight:30
  },
  imgContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.45,
    marginBottom: Dimensions.get("window").height * 0.03,
    alignItems: "center",
  },
  img: {
    width: "80%",
    height: "100%",
    borderRadius: Dimensions.get("window").height * 0.03,
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn :{
    marginTop:Dimensions.get("window").height * 0.03,
    width:'80%'
  }
});
