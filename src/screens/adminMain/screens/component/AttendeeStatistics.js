import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import PieChart from "react-native-pie-chart";
import styles from "../../styles/styles";
import { Modal } from "react-native";
import { useState } from "react";
import useStore from "../../../../stateManagement/useStore";
const AttendeeStatistics = () => {
  const widthAndHeight = 160;
  //   get the series and sliceColor and modal visible from the store
  const {
    modalVisiblePresent,
    modalVisibleAbsent,
    modalVisibleLate,
    series,
    attendeeSliceColor,
    setmodalVisiblePresent,
    setmodalVisibleAbsent,
    setmodalVisibleLate,
  } = useStore();
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.title}>Feedback Sentiment Analysis</Text>
        <TouchableOpacity></TouchableOpacity>
      </View> */}
      <View style={styles.feedbackMainContainer}>
        <View style={styles.sentimentBlock}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={attendeeSliceColor}
            coverRadius={0.6}
          />
        </View>
        <View
          style={{
            ...styles.sentimentBlock,
          }}
        >
          <View
            style={[
              styles.sentimentList,
              { marginBottom: 15, flexDirection: "column" },
            ]}
          >
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Total attendees:
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {/* {series.reduce((a, b) => a + b)} */}
            </Text>
          </View>
          {/* Pressable modal for number of feedbacks */}
          <View>
            <View style={styles.sentimentList}>
              <Pressable
                onPress={() => setmodalVisiblePresent(true)}
                style={styles.sentimentList}
              >
                <PieChart
                  widthAndHeight={32}
                  series={[100]}
                  sliceColor={["rgba(9,226,0,1)"]}
                />
                <Text>Present</Text>
              </Pressable>

              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisiblePresent}
                onRequestClose={() => setmodalVisiblePresent(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Number of present: {series[1]}
                    </Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setmodalVisiblePresent(false)}
                    >
                      <Text style={styles.textStyle}>OK</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>

            {/*
             */}

            <View style={styles.sentimentList}>
              <Pressable
                onPress={() => setmodalVisibleAbsent(true)}
                style={styles.sentimentList}
              >
                <PieChart
                  widthAndHeight={32}
                  series={[100]}
                  sliceColor={["#ff3c00"]}
                />
                <Text>Absent </Text>
              </Pressable>

              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleAbsent}
                onRequestClose={() => setmodalVisibleAbsent(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Number of Absent: {series[0]}
                    </Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setmodalVisibleAbsent(false)}
                    >
                      <Text style={styles.textStyle}>OK</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>

            {/*
             */}

            <View style={styles.sentimentList}>
              <Pressable
                onPress={() => setmodalVisibleLate(true)}
                style={styles.sentimentList}
              >
                <PieChart
                  widthAndHeight={32}
                  series={[100]}
                  sliceColor={["#fbd203"]}
                />
                <Text>Late</Text>
              </Pressable>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleLate}
                onRequestClose={() => setmodalVisibleLate(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Number of Late: {series[2]}
                    </Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setmodalVisibleLate(false)}
                    >
                      <Text style={styles.textStyle}>OK</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AttendeeStatistics;
