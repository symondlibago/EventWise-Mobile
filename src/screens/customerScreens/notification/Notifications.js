import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import { formatDistanceToNow } from "date-fns";
import * as Notifications from "expo-notifications"; // Import Expo Notifications
import Header from "../elements/Header";


import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../../services/organizer/adminNotificationServices";
import { RefreshControl } from "react-native";

export default NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [visibleNotifications, setVisibleNotifications] = useState([]);

  const INITIAL_LIMIT = 10;
  const LOAD_MORE_COUNT = 5;
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const notificationsFromServer = await fetchNotifications();
      const formattedNotifications = notificationsFromServer.map((notif) => ({
        ...notif,
        receivedAt: notif.receivedAt ? new Date(notif.receivedAt) : new Date(),
      }));
      setNotifications(formattedNotifications);
      setVisibleNotifications(formattedNotifications.slice(0, INITIAL_LIMIT));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchNotificationsFromServer = async () => {
      try {
        const notificationsFromServer = await fetchNotifications();
        const formattedNotifications = notificationsFromServer.map((notif) => ({
          ...notif,
          receivedAt: notif.receivedAt
            ? new Date(notif.receivedAt)
            : new Date(),
        }));
        setNotifications(formattedNotifications);
        setVisibleNotifications(formattedNotifications.slice(0, INITIAL_LIMIT));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotificationsFromServer();
  }, []);

  // Listener to handle incoming notifications
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body } = notification.request.content;
        const newNotification = {
          id: Date.now(), // Use timestamp as unique ID
          name: title || "Unknown Sender",
          text: body || "No message content",
          image: "https://bootdey.com/img/Content/avatar/avatar6.png", // Default avatar
          attachment: "", // Optional attachment URL
          created_at: new Date(),
          isRead: false, // Set initial state as unread
        };
        setNotifications((prevNotifications) => {
          const updatedNotifications = [newNotification, ...prevNotifications];
          return updatedNotifications.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
        }); // Add new notification to the top
        setVisibleNotifications((prevVisible) =>
          [newNotification, ...prevVisible].slice(0, INITIAL_LIMIT)
        );
      }
    );

    // Cleanup listener
    return () => subscription.remove();
  }, []);

  const markAsRead = async (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );

    // Update the visibleNotifications state
    setVisibleNotifications((prevVisible) =>
      prevVisible.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );

    try {
      await markNotificationAsRead(id); // Persist the read status in backend
    } catch (error) {
      console.error("Error updating read status in backend:", error);
    }
  };

  const loadMoreNotifications = () => {
    const nextVisibleCount = visibleNotifications.length + LOAD_MORE_COUNT;
    setVisibleNotifications(notifications.slice(0, nextVisibleCount));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setVisibleNotifications([]);
  };

  return (
    <>
    <Header />
    <TouchableOpacity style={styles.clearButton} onPress={clearAllNotifications}>
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.root}
        data={visibleNotifications}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const timeAgo = item.created_at
            ? formatDistanceToNow(new Date(item.created_at), {
                addSuffix: true,
              })
            : "Just now";
          return (
            <TouchableOpacity
              style={[
                styles.notificationContainer,
                { backgroundColor: item.read ? "white" : "#F0F8FF" },
              ]}
              onPress={() => markAsRead(item.id)}
            >
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={styles.content}>
                <View style={styles.mainContent}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text>{item.body}</Text>
                  </View>
                  <Text style={styles.timeAgo}>{timeAgo}</Text>
                </View>
                {item.attachment ? (
                  <Image
                    style={styles.attachment}
                    source={{ uri: item.attachment }}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={() =>
          notifications.length > visibleNotifications.length ? (
            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreNotifications}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    marginTop: 40,
    width: "95%",
    margin: 10,
  },
  clearButton: {
    position: "absolute",
    right: 15,
    top: 100,
    zIndex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  clearButtonText: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline", // Add underline
  },
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  notificationContainer: {
    flexDirection: "row",
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  timeAgo: {
    color: "gray",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#e1e1e1",
  },
  attachment: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  loadMoreText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});