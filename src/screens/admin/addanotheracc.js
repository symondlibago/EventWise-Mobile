import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const CreateAccount = () => {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState('');

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']} // Gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }}   // Bottom
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Header with back arrow and Create text */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={32} color="#FFC42B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create</Text>
        </View>

        {/* Big Rectangle with Another Account Text */}
        <View style={styles.bigRectangle}>
          <Text style={styles.anotherAccountText}>Another Account</Text>

          {/* Service Provider Section */}
          <Text style={styles.registerText}>Service Provider</Text>

          <TouchableOpacity
            style={[styles.roleContainer, selectedRole === 'Service Provider' && styles.selectedRole]}
            onPress={() => handleSelectRole('Service Provider')}
          >
            <Text style={styles.roleText}>Register for Service Provider</Text>
            <View style={[styles.radioButton, selectedRole === 'Service Provider' && styles.radioButtonSelected]}>
              {selectedRole === 'Service Provider' && <View style={styles.innerCircle} />}
            </View>
          </TouchableOpacity>

          {/* Register for Service Provider */}

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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
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
    color: '#FFC42B',
    flex: 1,
    textAlign: 'center',
  },
  bigRectangle: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 20,
  },
  anotherAccountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2600',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
  roleText: {
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#B0B0B0',
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
    color: '#B0B0B0',
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

export default CreateAccount;
