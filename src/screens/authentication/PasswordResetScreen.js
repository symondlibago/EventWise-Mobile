import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const PasswordResetScreen = ({ route, navigation }) => {
    const { email, resetCode } = route.params;
  
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
    const handlePasswordReset = async () => {
      if (!password || !passwordConfirmation) {
        Alert.alert('Error', 'Both password fields are required.');
        return;
      }
  
      if (password !== passwordConfirmation) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
  
      try {
        const response = await axios.post(
          'http://192.168.1.219:8000/api/password/reset',
          {
            email,
            code: resetCode,
            password,
            password_confirmation: passwordConfirmation,
          }
        );
        console.log('Password reset response:', response.data); // Log the response
  
        if (response.data.message === 'Password reset successfully') {
          Alert.alert('Success', 'Password has been reset.');
          navigation.navigate('Login'); // Navigate to login after reset
        } else {
          Alert.alert('Error', response.data.message || 'Failed to reset password.');
        }
      } catch (error) {
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Something went wrong. Please try again later.'
        );
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="New Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <Button title="Reset Password" onPress={handlePasswordReset} />
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 16, paddingHorizontal: 8, backgroundColor: '#fff' },
});

export default PasswordResetScreen;
