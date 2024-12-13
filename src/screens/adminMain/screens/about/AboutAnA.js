import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";

const AboutAnA = () => {
  const [active, setActive] = useState(0);

  const handleAnAPress = () => {
    setActive(0);
  };

  const handleEventWisePress = () => {
    setActive(1);
  };

  return (
    <View
      style={[
        styles.container,
        {
          display: "flex",
          flexDirection: "column",
          gap: 20,
          flex: 1,
          paddingBottom: 50,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              fontSize: 22,
            },
          ]}
        >
          About
        </Text>
      </View>
      <View>
        <View style={[styles.header, { justifyContent: "center", gap: 40 }]}>
          <Pressable onPress={handleAnAPress}>
            <Text
              style={[
                styles.title,
                {
                  color: active === 0 ? "#EFBF04" : "black",
                  textDecorationLine: active === 1 ? "none" : "underline",
                },
              ]}
            >
              A&A Events
            </Text>
          </Pressable>
          <Pressable onPress={handleEventWisePress}>
            <Text
              style={[
                styles.title,
                {
                  color: active === 1 ? "#EFBF04" : "black",
                  textDecorationLine: active === 0 ? "none" : "underline",
                },
              ]}
            >
              EventWise
            </Text>
          </Pressable>
        </View>
        <View style={[{ position: "relative" }]}>
          {active === 0 ? (
            <View style={styles.active}>
              <Text
                style={[
                  styles.subtitle,
                  styles.text,
                  { textAlign: "center", marginBottom: 20 },
                ]}
              >
                A&A Creations is a DTI and BIR registered event organizing team from Cagayan de Oro City. Founded by a married couple, Mr. Arvil and Ms. Alysa, thus the name A&A, of the year 2018.

                {"\n\n"}

                A&A Creations is now a growing team offering event needs and services. Nevertheless, its team is composed of equipped individuals ready to cater to its clients' needs. Even before the team was created, Mr. Arvil and most of his company partners were involved in event planning and coordination.

                {"\n\n"}

                A&A Creations aims to make the clients' plans into reality. The company also believes that a tight budget is not a hindrance to making memories to treasure, with the ones close to our hearts.
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.subtitle,
                styles.text,
                { textAlign: "center", marginBottom: 20 },
              ]}
            >
              EventWise is a premier service provider specializing in equipment and logistics for large-scale events. 

Our solutions ensure seamless execution and support, making EMS the preferred choice for organizations looking for reliable event services.
            </Text>
          )}
        </View>
      </View>
      {/* footer */}
      <View
        style={[
          styles.footer,
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgb(245,245,245)",
            paddingVertical: 10,
            borderTopWidth: 0.2,
            borderBlockColor: "gray",
          },
        ]}
      >
        <View style={{ borderBottomWidth: 1, borderBottomColor: "black" }} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "black",
            marginTop: 5,
          }}
        >
          EventWise &copy; 2024
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "black",
            marginBottom: 5,
            height: 50,
          }}
        >
          Powered by EventTech
        </Text>
      </View>
    </View>
  );
};

export default AboutAnA;
