import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { isValidElement, useReducer } from "react";
import ErrorMsg from "./ErrorMsg";
import colors from "../colors/colors";


const inputReducer = (state, action) => {}

const Input = (props) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: value ? value :'',
    isValid: validator
  })

  const {
    label,
    value,
    placeholder,
    validator,
    onChangeHandler,
    errorText,
    errorValidator,
  } = props;

  

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        defaultValue={value}
        onChangeText={onChangeHandler}
        placeholderTextColor={colors.cta}
        onEndEditing={validator}
        placeholder={placeholder}
        autoCorrect="none"
        autoCapitalize="none"
      />
      {!{ errorValidator } && <ErrorMsg>{errorText}</ErrorMsg>}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
export default Input;
