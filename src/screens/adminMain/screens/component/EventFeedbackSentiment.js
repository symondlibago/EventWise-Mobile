import React, { useState } from "react";
import { View, Text, SafeAreaView, Pressable, Modal } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import styles from "../../styles/styles"; // Ensure path is correct
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PieChart from "react-native-pie-chart";
const EventFeedbackSentiment = ({
  eventId,
  title,
  eventName,
  feedbackData,
  sliceColor,
}) => {
  const navigation = useNavigation();
  const [clickedIndex, setClickedIndex] = useState(null);
  const handleGoToButtonPress = () => {
    navigation.push("FeedbackEventDetails", { eventId });
  };

  const [modalVisiblePositive, setModalVisiblePositive] = useState(false);
  const [modalVisibleNegative, setModalVisibleNegative] = useState(false);
  const [modalVisibleNeutral, setModalVisibleNeutral] = useState(false);
  // Extract positive, negative, and neutral counts from feedbackData
  const classifiedFeedbackData = {
    positive: feedbackData.filter(
      (feedback) => feedback.sentiment === "positive"
    ),
    negative: feedbackData.filter(
      (feedback) => feedback.sentiment === "negative"
    ),
    neutral: feedbackData.filter(
      (feedback) => feedback.sentiment === "neutral"
    ),
  };
  const positiveCount = classifiedFeedbackData.positive.length;
  const negativeCount = classifiedFeedbackData.negative.length;
  const neutralCount = classifiedFeedbackData.neutral.length;
  const totalFeedbackCount =
    classifiedFeedbackData.positive.length +
    classifiedFeedbackData.negative.length +
    classifiedFeedbackData.neutral.length;

  const data = [
    {
      x: "Positive",
      y: (classifiedFeedbackData.positive.length / totalFeedbackCount) * 100,
      color: "rgba(9,226,0,1)",
      blurColor: "rgba(9,226,0,0.5)",
    },
    {
      x: "Negative",
      y: (classifiedFeedbackData.negative.length / totalFeedbackCount) * 100,
      color: "#ff3c00",
      blurColor: "rgba(255,60,0,0.5)",
    },
    {
      x: "Neutral",
      y: (classifiedFeedbackData.neutral.length / totalFeedbackCount) * 100,
      color: "#fbd203",
      blurColor: "rgba(251,210,3,0.5)",
    },
  ];

  const handleClick = (index) => {
    setClickedIndex(clickedIndex === index ? null : index);
  };

  return (
    <SafeAreaView>
      <View style={[styles.feedbackMainContainer]}>
        <View
          style={[
            styles.header,
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              padding: 10,
              paddingHorizontal: 40,
            },
          ]}
        >
          <Text
            style={[
              {
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginBottom: -5,
              },
            ]}
            lineBreakMode="tail"
            numberOfLines={1}
          >
            {eventName} Total Feedback
          </Text>
          <TouchableOpacity onPress={handleGoToButtonPress}>
            <Text style={styles.subtitle}>go to</Text>
            <AntDesign name="swapright" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.feedbackSubContainer}>
          <View style={styles.sentimentBlock}>
            <VictoryPie
              height={260}
              labelPosition={"centroid"}
              labelRadius={43}
              data={data}
              labels={
                ({ datum }) =>
                  datum.y === data[clickedIndex]?.y
                    ? `${Math.round(datum.y)}%` // Show percentage on click
                    : datum.x // Show label name
              }
              padAngle={2.4}
              innerRadius={1}
              style={{
                data: {
                  fill: ({ index }) =>
                    index === clickedIndex
                      ? data[index].blurColor // Blurred color on click
                      : data[index].color, // Original color
                },
                labels: { fill: "black", fontSize: 14 },
              }}
              colorScale={data.map((item) => item.color)}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: (event, props) => {
                      handleClick(props.index); // Handle click on pie slice
                    },
                  },
                },
              ]}
              labelComponent={
                <VictoryLabel textAnchor="middle" style={{ fill: "black" }} />
              } // Customize label appearance
            />
          </View>
          <View style={styles.sentimentBlock}>
            <View style={[styles.sentimentList, { marginBottom: 15 }]}>
              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                Total feedbacks:
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {/* {series.reduce((a, b) => a + b, 0)}
                 */}
                {/* {feedbackData.length} */}
                {totalFeedbackCount}
              </Text>
            </View>
            <View>
              <View style={styles.sentimentList}>
                <Pressable
                  onPress={() => setModalVisiblePositive(true)}
                  style={styles.sentimentList}
                >
                  <PieChart
                    widthAndHeight={32}
                    series={[100]}
                    sliceColor={["rgba(9,226,0,1)"]}
                  />
                  <Text>Positive</Text>
                </Pressable>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisiblePositive}
                  onRequestClose={() => setModalVisiblePositive(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Number of Positive feedbacks: {positiveCount}
                      </Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisiblePositive(false)}
                      >
                        <Text style={styles.textStyle}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.sentimentList}>
                <Pressable
                  onPress={() => setModalVisibleNegative(true)}
                  style={styles.sentimentList}
                >
                  <PieChart
                    widthAndHeight={32}
                    series={[100]}
                    sliceColor={["#ff3c00"]}
                  />
                  <Text>Negative</Text>
                </Pressable>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisibleNegative}
                  onRequestClose={() => setModalVisibleNegative(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Number of Negative feedbacks: {negativeCount}
                      </Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisibleNegative(false)}
                      >
                        <Text style={styles.textStyle}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.sentimentList}>
                <Pressable
                  onPress={() => setModalVisibleNeutral(true)}
                  style={styles.sentimentList}
                >
                  <PieChart
                    widthAndHeight={32}
                    series={[100]}
                    sliceColor={["#fbd203"]}
                  />
                  <Text>Neutral</Text>
                </Pressable>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisibleNeutral}
                  onRequestClose={() => setModalVisibleNeutral(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Number of Neutral feedbacks: {neutralCount}
                      </Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisibleNeutral(false)}
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
      </View>
    </SafeAreaView>
  );
};

export default EventFeedbackSentiment;
