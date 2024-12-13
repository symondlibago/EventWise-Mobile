import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
} from "react-native";
import { formatDistanceToNow } from "date-fns";
import * as Notifications from "expo-notifications"; // Import Expo Notifications
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../../../services/organizer/adminNotificationServices";
import { RefreshControl } from "react-native";

export default NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const notificationsFromServer = await fetchNotifications();
      const formattedNotifications = notificationsFromServer.map((notif) => ({
        ...notif,
        receivedAt: notif.receivedAt ? new Date(notif.receivedAt) : new Date(), // Fallback to current date
      }));
      setNotifications(formattedNotifications);
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
            : new Date(), // Fallback to current date
        }));
        setNotifications(formattedNotifications);
        console.log("Fetched notifications:", notificationsFromServer);
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

    try {
      await markNotificationAsRead(id); // Persist the read status in backend
    } catch (error) {
      console.error("Error updating read status in backend:", error);
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]); // Clears all notifications
  };

  return (
    <>
      <Button title="Clear All" onPress={clearAllNotifications} />
      <FlatList
        style={styles.root}
        data={notifications}
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
                styles.container,
                { backgroundColor: item.read ? "red" : "#F0F8FF" },
              ]}
              onPress={() => markAsRead(item.id)}
            >
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={styles.content}>
                <View style={styles.mainContent}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text>{item.body}</Text>
                    {/* <Text>{item.data}</Text> */}
                    <Text> {JSON.stringify(item, null, 2)}</Text>
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
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
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
});
