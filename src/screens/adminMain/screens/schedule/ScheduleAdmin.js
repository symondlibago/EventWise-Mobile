import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import ScheduleScreen from "./CalendarAdmin";

const ScheduleAdmin = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // You can add other actions here, such as logging refresh events
    setTimeout(() => setRefreshing(false), 1000); // Simulate a refresh delay
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ff9900"]}
          tintColor="#ff9900"
        />
      }
    >
      <ScheduleScreen refreshing={refreshing} onRefresh={onRefresh} />
    </ScrollView>
  );
};

export default ScheduleAdmin;
