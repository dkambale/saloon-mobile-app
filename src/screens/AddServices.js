import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const AddServices = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://your-api-url.com/addService', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Service added successfully!');
        navigation.navigate('ServicesList'); // Redirect to ServicesList
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to add service.');
      }
    } catch (error) {
      console.error('Error adding service:', error);
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
        <Text style={styles.header}>Add Service</Text>

        <TextInput
          style={styles.input}
          placeholder="Service Name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={formData.price}
          onChangeText={(value) => handleInputChange('price', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration (e.g., 30 mins)"
          value={formData.duration}
          onChangeText={(value) => handleInputChange('duration', value)}
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#007BFF" />
          <Button title="Cancel" onPress={handleCancel} color="#FF3D00" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
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

export default AddServices;
