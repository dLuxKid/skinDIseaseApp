// REACT NATIVE
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

// COMPONENT
import DefaultTitle from "../components/DefaultTitle";
import DefaultText from "../components/DefaultText";
import DefaultBtn from "../components/DefaultBtn";
import PrimaryBtn from "../components/PrimaryBtn";
import CameraBtn from "../components/CameraBtn";
// REDUX
import { useSelector } from "react-redux";
// STYLE
import colors from "../colors/colors";

const HomePage = ({ navigation }) => {
  const username = useSelector((state) => state.user.user.username);

  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.granted);
      console.log(permission, cameraStatus);
    })();
  }, [permission]);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlash = () => {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        setImage(data.uri);
        setOpenCamera(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
        {openCamera ? (
          <Camera
            style={styles.img}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          >
            <View style={styles.cameraButtonContainer}>
              <View style={styles.topButtonContainer}>
                <CameraBtn icon="flash" title="Flash" onPress={toggleFlash} />
                <CameraBtn
                  icon="camera-reverse-outline"
                  title="Flip camera"
                  onPress={toggleCameraType}
                />
              </View>
              <View>
                <CameraBtn icon="camera" color="red" onPress={takePicture} />
              </View>
            </View>
          </Camera>
        ) : (
          <Image
            source={
              image ? { uri: image } : require("../assets/Image/lady.jpg")
            }
            resizeMode="stretch"
            style={styles.img}
          />
        )}
      </View>
      <View style={styles.btnContainer}>
        <PrimaryBtn onPress={pickImage}>OPEN GALLERY</PrimaryBtn>
        {image ? (
          <PrimaryBtn
            onPress={() => {
              setImage(null);
              setOpenCamera(!openCamera);
            }}
          >
            RETAKE
          </PrimaryBtn>
        ) : (
          <PrimaryBtn onPress={() => setOpenCamera(!openCamera)}>
            OPEN CAMERA
          </PrimaryBtn>
        )}
      </View>

      {image ? (
        <DefaultBtn
          style={styles.btn}
          onPress={() => navigation.navigate("Results", { imageUri: image })}
        >
          Begin Diagnosis
        </DefaultBtn>
      ) : null}
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
  textContainer: {
    marginBottom: Dimensions.get("window").height * 0.025,
    alignItems: "center",
  },
  bodyText: {
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: "10%",
    lineHeight: 30,
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
    borderRadius: 20,
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    marginTop: Dimensions.get("window").height * 0.03,
    width: "80%",
  },
  cameraButtonContainer: {
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    height: Dimensions.get("window").height * 0.45,
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
