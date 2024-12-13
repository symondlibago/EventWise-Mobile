import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import "react-native-get-random-values"; // Ensure this is imported as well

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! How are you?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <SafeAreaView style={styles.containers}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    bottom: 400,
  },
});

export default MessagesAdmin;
