// Formik x React Native example
import React from "react";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";

export const MyReactNativeForm = (props) => (
  <Formik
    initialValues={{ email: "" }}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <SafeAreaView>
        <View>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      </SafeAreaView>
    )}
  </Formik>
);
