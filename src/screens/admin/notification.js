import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import pro_pic from './assets/pro_pic.png';

const Notification = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('All');

  const notificationsData = {
    'This Week': [
      {
        id: '1',
        title: 'Jane Wedding',
        joined: 'Diwata Pares, Heart Catering, and 35 others',
        daysAgo: '1d Ago',
        rightImage: pro_pic,
      },
      {
        id: '2',
        title: 'John Birthday',
        joined: 'Happy Cakes, DJ Mix, and 20 others',
        daysAgo: '3d Ago',
        rightImage: pro_pic,
      },
    ],
    'Booking Request': [
      {
        id: '1',
        name: 'Jane Doe',
        title: 'Wedding',
        daysAgo: '2d Ago',
      },
      {
        id: '2',
        name: 'John Smith',
        title: 'Birthday',
        daysAgo: '4d Ago',
      },
    ],
    'Service Provider Request': [
      {
        id: '1',
        name: 'Emily Johnson',
        service: 'Photographer',
        daysAgo: '5d Ago',
      },
      {
        id: '2',
        name: 'Michael Brown',
        service: 'Food Catering',
        daysAgo: '6d Ago',
      },
    ],
    'All': [
      {
        id: '1',
        title: 'Jane Wedding',
        joined: 'Diwata Pares, Heart Catering, and 35 others',
        daysAgo: '1d Ago',
        rightImage: pro_pic,
      },
      {
        id: '2',
        name: 'Jane Doe',
        title: 'Wedding',
        daysAgo: '2d Ago',
      },
      {
        id: '3',
        name: 'Emily Johnson',
        service: 'Photographer',
        daysAgo: '5d Ago',
      },
    ],
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'This Week':
        return notificationsData['This Week'].map(notification => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              <Image source={pro_pic} style={styles.profilePicture} />
              <View style={styles.notificationDetails}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationJoined}>{notification.joined}</Text>
              </View>
            </View>
            {notification.rightImage && (
              <View style={styles.rightContainer}>
                <Image source={notification.rightImage} style={styles.rightImage} />
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            )}
          </View>
        ));
      case 'Booking Request':
        return notificationsData['Booking Request'].map(notification => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              <Image source={pro_pic} style={styles.profilePicture} />
              <View style={styles.notificationDetails}>
                <Text style={styles.notificationName}>{notification.name}</Text>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ));
      case 'Service Provider Request':
        return notificationsData['Service Provider Request'].map(notification => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              <Image source={pro_pic} style={styles.profilePicture} />
              <View style={styles.notificationDetails}>
                <Text style={styles.notificationName}>{notification.name}</Text>
                <Text style={styles.notificationService}>{notification.service}</Text>
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ));
      case 'All':
        return notificationsData['All'].map(notification => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              {notification.profilePicture ? (
                <Image source={notification.profilePicture} style={styles.profilePicture} />
              ) : (
                <Image source={pro_pic} style={styles.profilePicture} />
              )}
              <View style={styles.notificationDetails}>
                {notification.title && <Text style={styles.notificationTitle}>{notification.title}</Text>}
                {notification.name && <Text style={styles.notificationName}>{notification.name}</Text>}
                {notification.service && <Text style={styles.notificationService}>{notification.service}</Text>}
                {notification.joined && <Text style={styles.notificationJoined}>{notification.joined}</Text>}
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            </View>
            {notification.rightImage && (
              <View style={styles.rightContainer}>
                <Image source={notification.rightImage} style={styles.rightImage} />
              </View>
            )}
          </View>
        ));
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#0D0D0D', '#1A1A1A']} // Gradient colors
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification</Text>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.tabsContentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {['All', 'This Week', 'Booking Request', 'Service Provider Request'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                {
                  backgroundColor: selectedTab === tab ? '#FFC42B' : '#1A1A1A', // Updated background color
                  borderColor: selectedTab === tab ? '#FFC42B' : '#FFFFFF',
                }
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? '#000000' : '#FFFFFF',
                }
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2A2A2A',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC42B',
  },
  tabsContainer: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  tabsContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  notificationBox: {
    backgroundColor: '#F0F0F0', // Whitish-gray background
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // Black text
  },
  notificationName: {
    fontSize: 16,
    color: '#000000', // Black text
  },
  notificationService: {
    fontSize: 14,
    color: '#000000', // Black text
  },
  notificationJoined: {
    fontSize: 14,
    color: '#6F6F6F', // Gray text
  },
  rightImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  daysAgo: {
    fontSize: 12,
    color: '#6F6F6F', // Gray text
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  declineButton: {
    backgroundColor: '#F44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default Notification;
