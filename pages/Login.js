// REACT AND REACT NATIVE
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Text,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
// COLORS
import colors from "../colors/colors";
// COMPONENTS
import DefaultBtn from "../components/DefaultBtn";
import DefaultTitle from "../components/DefaultTitle";
import ErrorMsg from "../components/ErrorMsg";
import Input from "../components/Input";
// FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
// REDUX
import { useDispatch } from "react-redux";
import { loggedInStatus, updateUserDetails } from "../store/reducer/userSlice";

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const dispatch = useDispatch();

  const handleLogin = () => {
    setIsLoading(true);
    emailValidator();
    passwordValidator();
    if (emailIsValid && passwordIsValid) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
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
        })
        .catch((error) => {
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
          setIsLoading(false);
        });
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
    if (requiredPassword < 0 && password.length < 8) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
        <ScrollView>
          <View style={styles.welcomeText}>
            <DefaultTitle style={styles.title}>Welcome back</DefaultTitle>
          </View>

          <View style={styles.form}>
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
              <Text style={styles.label}>Enter your password</Text>
              <TextInput
                style={styles.input}
                defaultValue={password}
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
                placeholder="ABC123abc"
                placeholderTextColor={colors.cta}
                returnKeyType="go"
                onEndEditing={passwordValidator}
                autoCorrect="none"
                autoCapitalize="none"
                secureTextEntry
              />
              {!passwordIsValid && (
                <ErrorMsg>
                  your password has to be a combination of letters and numbers
                </ErrorMsg>
              )}
            </View>

            <DefaultBtn style={styles.btn} onPress={handleLogin}>
              {isLoading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                "Log in"
              )}
            </DefaultBtn>
            <Text style={styles.label}>
              Don't have an account?{" "}
              <Text
                style={{ fontFamily: "medium", color: colors.cta }}
                onPress={() => navigation.navigate("Signup")}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    jutisfyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    flex: 1,
    flexDirection: "column",
    marginTop: Dimensions.get("window").height * 0.1,
  },
  title: {
    fontSize: 36,
  },
  form: {
    marginTop: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width * 1,
    maxWidth: 400,
    paddingHorizontal: "10%",
  },
  formControl: {
    alignSelf: "stretch",
    marginVertical: 2.5,
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
    marginTop: 50,
  },
});

export default Login;
