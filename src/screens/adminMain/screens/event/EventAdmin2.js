  import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import EventPackages from "../component/EventPackages";
import { ScrollView } from "react-native-gesture-handler";
import EventsMain from "../component/EventsMain";

import { useState } from "react";

const EventAdmin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
        <ScrollView>
          <EventsMain />
        </ScrollView>
        <ScrollView>
          <EventPackages />
        </ScrollView>
        <View style={{ height: 300 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventAdmin;
