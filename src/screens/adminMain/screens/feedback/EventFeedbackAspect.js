import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import LongPressComponent from "./LongPressComponent";

const EventFeedbackAspect = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>EventFeedbackAspect</Text>
      </View>
      <ScrollView>
        <LongPressComponent
          aspect="Photography"
          info="Feedbacks:"
          positive={323}
          negative={13}
          neutral={33}
        />
        <LongPressComponent
          aspect="Catering"
          info="Food services provided at the event."
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventFeedbackAspect;
