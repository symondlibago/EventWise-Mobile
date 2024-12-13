import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AddAnotherAccSP = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigation = useNavigation();

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  return (
    <View style={styles.container}>
      {/* Header with back arrow and Create text */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={32} color="#FFC42B" />
        </TouchableOpacity>
      </View>

      {/* Big Rectangle with Another Account Text */}
      <View style={styles.bigRectangle}>
        <Text style={styles.anotherAccountText}>Another Account</Text>

        {/* Service Provider Section */}
        {/* ... */}

        {/* Customer Section */}
        <Text style={styles.registerText}>Customer</Text>

        <TouchableOpacity
          style={[styles.roleContainer, selectedRole === 'Customer' && styles.selectedRole]}
          onPress={() => handleSelectRole('Customer')}
        >
          <Text style={styles.roleText}>Register for Customer</Text>
          <View style={[styles.radioButton, selectedRole === 'Customer' && styles.radioButtonSelected]}>
            {selectedRole === 'Customer' && <View style={styles.innerCircle} />}
          </View>
        </TouchableOpacity>

        {/* Register for Customer */}
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => Alert.alert('Selected Role', `You selected: ${selectedRole}`)}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF', // White background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Black text
    flex: 1,
    textAlign: 'center',
  },
  bigRectangle: {
    backgroundColor: '#F9EDC6',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 10, // Shadow radius
    elevation: 5, // Android shadow elevation
  },
  anotherAccountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000', // Black text
    marginBottom: 20,
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C2B067',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
  roleText: {
    fontSize: 18,
    color: '#FFFFFF', // White text
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FFC42B',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFC42B',
  },
  selectedRole: {
    backgroundColor: '#1A1A1A',
    borderColor: '#FFC42B',
  },
  registerText: {
    fontSize: 14,
    color: '#000000', // Black text
    marginBottom: 20,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#FFC42B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAnotherAccSP;
