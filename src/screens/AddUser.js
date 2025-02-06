import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BottomNavigation from './BottomNavigation';


const AddUser = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    role: '',
    mobileNumber: '',
    address: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'User added successfully!');
        navigation.navigate('User'); // Redirect to UserScreen
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to add user.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Redirect back to the previous screen
  };

  return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={formData.userName}
            onChangeText={(value) => handleInputChange('userName', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Role"
            value={formData.role}
            onChangeText={(value) => handleInputChange('role', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={formData.mobileNumber}
            onChangeText={(value) => handleInputChange('mobileNumber', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} color="#007BFF" />
            <Button title="Cancel" onPress={handleCancel} color="#FF3D00" />
          </View>
        </ScrollView>
        {/* <BottomNavigation navigation={navigation} /> */}
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default AddUser;
