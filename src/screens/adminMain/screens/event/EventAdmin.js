import React, { useState } from "react";
import EventManager from "./EventManager";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { usePackageStore } from "../../../../stateManagement/admin/usePackageStore";
import { useCallback } from "react";
import PackageManager from "../../screens/package/PackageManager";
import {
  fetchPackages,
  deletePackage,
} from "../../../../services/organizer/adminPackageServices";
import PackageCard from "../../screens/package/PackageCard";
import EventCard from "./EventCard";
import { fetchEvents } from "../../../../services/organizer/adminEventServices";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";
import { deleteEvent } from "../../../../services/organizer/adminEventServices";
import { useEffect } from "react";
const EventAdmin = () => {
  const { currentPackages, setCurrentPackages } = usePackageStore();
  const { currentEvents, setCurrentEvents } = useEventStore();
  const [likedPackages, setlikedPackages] = useState({});
  const [likedEvents, setlikedEvents] = useState({});

  useEffect(() => {
    refreshEvents();
    refreshPackages();
  }, []);
  const toggleLike = (currentPackagesId) => {
    setlikedPackages((prevLikedPackages) => {
      const newLikedPackages = { ...prevLikedPackages };
      if (newLikedPackages[currentPackagesId]) {
        delete newLikedPackages[currentPackagesId];
      } else {
        newLikedPackages[currentPackagesId] = true;
      }
      return newLikedPackages;
    });
  };

  const toggleLikeEvent = (currentEventsID) => {
    setlikedEvents((prevLikedPackages) => {
      const newLikedEvents = { ...prevLikedPackages };
      if (newLikedEvents[currentEventsID]) {
        delete newLikedEvents[currentEventsID];
      } else {
        newLikedEvents[currentEventsID] = true;
      }
      return newLikedEvents;
    });
  };

  const handleEditPackage = async (currentPackageId, updatedData) => {
    try {
      await updateService(serviceId, updatedData); // Perform the update action
      refreshServices(); // Refresh the services list
    } catch (error) {
      console.error("Failed to update service", error);
    }
  };

  // Modify the deleteService to call refreshServices after deleting
  const handleDeletePackage = async (events) => {
    try {
      await deletePackage(id); // Assuming deleteService is a valid function
      refreshPackages(); // Refresh the service list after deletion
    } catch (error) {
      console.error("Failed to delete service", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      refreshPackages();
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  const handleEditEvent = async (currentEventId, updateEvent) => {
    try {
      await updateEvent(currentEventId, updateEvent);
      refreshEvents(); // Refresh the events list after editing
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  const [refreshingEvents, setRefreshingEvents] = useState(false);
  const [refreshingPackages, setRefreshingPackages] = useState(false);

  // Update the refreshEvents and refreshPackages functions to handle their own states
  const refreshPackages = useCallback(async () => {
    setRefreshingPackages(true);
    try {
      const updatedPackages = await fetchPackages();
      setCurrentPackages(updatedPackages);
    } catch (error) {
      console.error("Failed to fetch packages", error);
    } finally {
      setRefreshingPackages(false);
    }
  }, [setCurrentPackages]);

  const refreshEvents = useCallback(async () => {
    setRefreshingEvents(true);
    try {
      const updatedEvents = await fetchEvents();
      setCurrentEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setRefreshingEvents(false);
    }
  }, [setCurrentEvents]);
  return (
    <SafeAreaView style={[styles.container, { paddingBottom: 80 }]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshingEvents || refreshingPackages}
            onRefresh={() => {
              refreshEvents();
              refreshPackages();
            }}
            colors={["#ff9900"]}
            tintColor="#ff9900"
          />
        } // Trigger refresh on pull-to-refresh
      >
        <EventManager />
        <View style={[]}>
          <FlatList
            data={currentEvents}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            contentContainerStyle={{ gap: 20 }}
            accessibilityViewIsModal={true}
            accessibilityModalRoot={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <EventCard
                currentEvents={item}
                handleDeleteEvent={handleDeleteEvent}
                likedEvent={likedEvents}
                toggleLike={toggleLikeEvent}
                handleEditEvent={handleEditEvent}
              />
            )}
          />
        </View>
        <PackageManager />
        {/* #TODO organize based on package type.  */}
        <View style={[]}>
          <FlatList
            data={currentPackages}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            contentContainerStyle={{ gap: 20 }}
            accessibilityViewIsModal={true}
            accessibilityModalRoot={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <PackageCard
                currentPackages={item}
                likedPackages={likedPackages}
                toggleLike={toggleLike}
                handleDeletePackage={handleDeletePackage}
                handleEditPackage={handleEditPackage}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventAdmin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    padding: 12,
    borderRadius: 8,
    paddingTop: 10,
    height: "100%",
    width: "100%",
    // backgroundColor: "green",
    // margin: 5,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  brokenBox: {
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "dashed",
    padding: 80,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF5F5",
  },
  brokenBoxText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
});
