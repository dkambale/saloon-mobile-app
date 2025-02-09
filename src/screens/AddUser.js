import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const AddUser = ({ navigation, route }) => {
  const { userDetails } = useContext(AuthContext);
  const user = route?.params?.user;

  const [accountId, setAccountId] = useState('');
  const [formData, setFormData] = useState({
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    userName: user ? user.userName : '',
    password: user ? user.password : '',
    role: user ? user.role : '',
    mobileNumber: user ? user.mobileNumber : '',
    address: user ? user.address : '',
  });

  useEffect(() => {
    if (userDetails?.accountId) {
      setAccountId(userDetails.accountId);
    }
  }, [userDetails?.accountId]);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    const userData = { ...formData, accountId };

    if (user) {
      userData.id = user.id;
      userData.createdBy = user.createdBy;
      userData.createdDate = user.createdDate;
      userData.updatedBy = userDetails?.username || 'Admin';
      userData.updatedDate = new Date().toISOString();
    }

    try {
      const response = await fetch(`http://10.0.2.2:8080/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Alert.alert('Success', `User ${user ? 'updated' : 'added'} successfully!`);
        navigation.navigate('UserList');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || `Failed to ${user ? 'update' : 'add'} user.`);
      }
    } catch (error) {
      console.error(`Error ${user ? 'updating' : 'adding'} user:`, error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>{user ? 'Edit User' : 'Add User'}</Text>

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
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{user ? 'Update' : 'Submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
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
  submitButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FF3D00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddUser;
