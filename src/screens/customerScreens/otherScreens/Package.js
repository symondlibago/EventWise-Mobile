import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../elements/SearchBAr';
import Svg, { LinearGradient, Stop, Rect, Defs } from 'react-native-svg';

const Package = () => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleChoosePress = (image) => {
    setSelectedPackage(image);
    setDetailVisible(true);
  };

  const handleConfirmPress = () => {
    navigation.navigate('BookingContinuation2', { selectedPackage: selectedPackage });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}> 
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.head}>
              <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Image
                source={require("../../../../assets/logoWhite.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Image
              source={require("../pictures/line.png")}
              style={styles.line}
              resizeMode="contain"
            />
          </SafeAreaView>
          {/* <View style={styles.header}>
            <Text style={styles.headText}>Package</Text>
            <TouchableOpacity
              onPress={() => setShowSearch(true)}
              style={styles.iconButton}
            >
              <Icon name="search" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {showSearch && (
            <SearchBar
              onClose={() => setShowSearch(false)}
              onSearch={handleSearch}
            />
          )} */}
          <ScrollView>
            {/* <Image source={require('../pictures/ellipse.png')} style={styles.bannerImage} />
            <Text style={styles.headerText}>Check Out Top Event Services</Text> */}
            <Text style={styles.debutText}>Choose Package</Text>
           
            <TouchableOpacity style={styles.customizeButton} onPress={() => navigation.navigate('CustomizePackage')}>
              <Text style={styles.customizeButtonText}>CLICK HERE IF YOU WANT TO CUSTOMIZE</Text>
              <Icon name="arrow-right" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.shText}>Packages</Text>
            <View style={styles.pack}>
              {packageData.map((pkg, index) => (
                <View key={index} style={styles.packageButton}>
                  <TouchableOpacity onPress={() => handleImagePress(pkg.image)}>
                    <Image source={pkg.image} style={styles.packageImage} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chooseButton} onPress={() => handleChoosePress(pkg.image)}>
                    <Text style={styles.chooseText}>CHOOSE</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <ImageBackground
                source={require('../pictures/Popup1.png')}
                style={styles.modalBackground}
              >
                <View style={styles.modalContent}>
                  <TouchableOpacity style={styles.closeImage} onPress={() => setModalVisible(false)}>
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                  <Image source={selectedImage} style={styles.fullImage} />
                </View>
              </ImageBackground>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={detailVisible}
            onRequestClose={() => {
              setDetailVisible(!detailVisible);
            }}
          >
            <View style={styles.modalOverlay}>
            <View style={styles.popupContainer}>
              <Svg height="100%" width="100%" style={styles.svgBackground}>
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor="#EFBF04" />
                    <Stop offset="100%" stopColor="#fff" />
                  </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
              </Svg>
                <TouchableOpacity style={styles.closeDetails} onPress={() => setDetailVisible(false)}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              <View style={styles.popupContent}>
              <View style={styles.infoContainer}>
                <Text style={styles.packageHead}>PACKAGE</Text>
                <Image source={selectedPackage} style={styles.popupImage} />
                <View style={styles.contentVA}>
                </View>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleConfirmPress}>
                  <Text style={styles.submitButtonText}>CONFIRM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </Modal>
        </View>
    </View>
  );
};

const packageData = [
  { image: require('../pictures/p.png') },
  { image: require('../pictures/p1.png') },
  { image: require('../pictures/p2.png') },
  { image: require('../pictures/p3.png') },
  { image: require('../pictures/p.png') },
  { image: require('../pictures/p1.png') },
  { image: require('../pictures/p2.png') },
  { image: require('../pictures/p3.png') },
  { image: require('../pictures/p.png') },
  { image: require('../pictures/p1.png') },
  { image: require('../pictures/p2.png') },
  { image: require('../pictures/p3.png') },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    padding: 10,
    marginTop: 5,
    marginLeft: 8
  },
  closeImage: {
    padding: 15,
    marginTop: -70,
    marginBottom: -20,
    alignSelf: "flex-end"
  },
  closeDetails: {
    padding: 15,
    marginTop: -50,
    marginBottom: -20,
    alignSelf: "flex-end",
    marginRight: -20
  },
  logo: {
    flex: 1,
    height: "100%",
    marginEnd: 50,
  },
  iconButton: {
    marginLeft: -20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 5
  },
  line2: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headText: {
    color: '#e6b800',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
  headerText: {
    color: '#e6b800',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Poppins",
  },
  shText: {
    color: '#000',
    fontSize: 16,
    textAlign: "left",
    marginStart: 20,
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  searchButton: {
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 5,
  },
  searchButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: "Poppins",
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
  },
  debutText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: "Poppins",
  },
  customizeButton: {
    backgroundColor: '#e6b800',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "70%",
    alignSelf: "center",
  },
  customizeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
  pack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  packageButton: {
    width: '45%',
    marginBottom: 15,
    marginHorizontal: '2.5%',
  },
  packageImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  chooseButton: {
    backgroundColor: '#FFC42B',
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: -20,
    margin: 30,
  },
  chooseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: "Poppins",
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    borderRadius: 25,
  },
  modalContent: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'transparent',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  popupContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, 
    padding: 50,
    marginLeft: -40,
    marginRight: -40,
  },
  popupImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeDetails: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  packageHead: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -10,
    fontFamily: "Poppins",
  },
  infoContainer: {
    backgroundColor: 'rgba(80, 79, 79, 0.3)',
    borderRadius: 50,
    padding: 20,
    width: '100%',
    height: "100%",
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#61481C',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: -25,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 'bold',
  },
});

export default Package;