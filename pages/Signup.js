// REACT NATIVE
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
// COLORS
import colors from "../colors/colors";
// COMPONENT
import DefaultBtn from "../components/DefaultBtn";
import DefaultTitle from "../components/DefaultTitle";
import ErrorMsg from "../components/ErrorMsg";
// FIREBASE
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
// REDUX
import { useDispatch } from "react-redux";
import { loggedInStatus, updateUserDetails } from "../store/reducer/userSlice";

const Signup = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);

  const dispatch = useDispatch();

  const usernameValidator = () => {
    if (username.trim().length < 5) {
      setNameIsValid(false);
    } else {
      setNameIsValid(true);
    }
  };

  const emailValidator = () => {
    const emailRegex = email.search(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (emailRegex >= 0) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const passwordValidator = () => {
    const requiredPassword = password.search(/\w\d/g);
    console.log(requiredPassword);
    if (requiredPassword < 0 && password.length < 8) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  };

  const confirmPasswordValidator = () => {
    if (password === confirmPassword) {
      setConfirmPasswordIsValid(true);
    } else {
      setConfirmPasswordIsValid(false);
    }
  };

  const handleSignup = () => {
    emailValidator();
    passwordValidator();
    setIsLoading(true);
    if (emailIsValid && passwordIsValid) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          updateProfile(auth.currentUser, { displayName: username }).then(
            () => {
              dispatch(loggedInStatus(user.getIdToken));
              dispatch(
                updateUserDetails({
                  userID: user.uid,
                  username: user.displayName,
                  email: user.email,
                  password: password,
                })
              );
              setIsLoading(false);
            }
          );
        })
        .catch((error) => {
          setIsLoading(false);
          const errorCode = error.code;
          if (errorCode === "auth/invalid-email") {
            Alert.alert(`Invalid email`, `Check your email input`, [
              { text: "Okay" },
            ]);
          } else if (errorCode === "auth/wrong-password") {
            Alert.alert(`Invalid password`, `Password is incorrect`, [
              { text: "Okay" },
            ]);
          } else {
            Alert.alert("User not found", "Email does not exist", [
              { text: "Okay" },
            ]);
          }
        });
    }
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
        <ScrollView>
          <View style={styles.welcomeText}>
            <DefaultTitle>Hey, Glad you could</DefaultTitle>
            <DefaultTitle style={styles.title}>Join us</DefaultTitle>
          </View>

          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Enter your username</Text>
              <TextInput
                style={styles.input}
                defaultValue={username}
                onChangeText={(text) => setUsername(text)}
                keyboardType="default"
                placeholder="name"
                placeholderTextColor={colors.cta}
                returnKeyType="next"
                onEndEditing={usernameValidator}
                autoCorrect="none"
                autoCapitalize="none"
              />
              {!nameIsValid && <ErrorMsg>username is too short</ErrorMsg>}
            </View>

            <View style={styles.formControl}>
              <Text style={styles.label}>Enter your email</Text>
              <TextInput
                style={styles.input}
                defaultValue={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                placeholder="name@example.com"
                placeholderTextColor={colors.cta}
                returnKeyType="next"
                onEndEditing={emailValidator}
                autoCorrect="none"
                autoCapitalize="none"
              />
              {!emailIsValid && <ErrorMsg>input a valid email</ErrorMsg>}
            </View>

            <View style={styles.formControl}>
              <Text style={styles.label}>Enter a password</Text>
              <TextInput
                style={styles.input}
                defaultValue={password}
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
                placeholder="********"
                placeholderTextColor={colors.cta}
                returnKeyType="next"
                onEndEditing={passwordValidator}
                autoCorrect="none"
                autoCapitalize="none"
                secureTextEntry
              />
              {!passwordIsValid && (
                <ErrorMsg>
                  your password be a combination of letters and numbers
                </ErrorMsg>
              )}
            </View>

            <View style={styles.formControl}>
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                style={styles.input}
                defaultValue={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                keyboardType="default"
                placeholder="********"
                placeholderTextColor={colors.cta}
                returnKeyType="done"
                onEndEditing={confirmPasswordValidator}
                autoCorrect="none"
                autoCapitalize="none"
                secureTextEntry
              />
              {!confirmPasswordIsValid && (
                <ErrorMsg>The passwords are not equal</ErrorMsg>
              )}
            </View>

            <DefaultBtn style={styles.btn} onPress={handleSignup}>
              {isLoading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                "Sign up"
              )}
            </DefaultBtn>

            <Text style={styles.label}>
              Already have an account?{" "}
              <Text
                style={{ fontFamily: "medium", color: colors.cta }}
                onPress={() => navigation.navigate("Login")}
              >
                Log in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    jutisfyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    flex: 1,
    flexDirection: "column",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  title: {
    color: colors.cta,
    fontSize: 30,
  },
  form: {
    marginTop: Dimensions.get("window").height * 0.025,
    width: Dimensions.get("window").width * 1,
    maxWidth: 400,
    paddingHorizontal: "10%",
  },
  formControl: {
    alignSelf: "stretch",
    marginVertical: 5,
  },
  label: {
    color: colors.secondary,
    opacity: 0.8,
    fontFamily: "light",
    paddingLeft: 5,
  },
  input: {
    borderColor: colors.cta,
    borderWidth: 1,
    height: 60,
    borderRadius: 15,
    backgroundColor: "rgba(153,153,153,0.4)",
    color: colors.cta,
    paddingHorizontal: 15,
    fontFamily: "regular",
  },
  btn: {
    marginTop: 30,
  },
});
