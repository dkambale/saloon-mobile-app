import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const AddServices = ({ navigation, route }) => {
    const { userDetails } = useContext(AuthContext);
    const service = route?.params?.service;
    
    const [accountId, setAccountId] = useState('');
    const [formData, setFormData] = useState({
      name: service ? service.name : '',
      price: service ? String(service.price) : '',
      duration: service ? service.duration : '',
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
      const serviceData = { ...formData, accountId };

      if (service) {
        serviceData.id = service.id;
        serviceData.createdBy = service.createdBy;
        serviceData.createdDate = service.createdDate;
        serviceData.updatedBy = userDetails?.username || 'Admin';
        serviceData.updatedDate = new Date().toISOString();
      }

      try {
        const response = await fetch(`http://10.0.2.2:8080/api/services`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceData),
        });

        if (response.ok) {
          Alert.alert('Success', `Service ${service ? 'updated' : 'added'} successfully!`);
          navigation.navigate('ServicesList');
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || `Failed to ${service ? 'update' : 'add'} service.`);
        }
      } catch (error) {
        console.error(`Error ${service ? 'updating' : 'adding'} service:`, error);
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
          <Text style={styles.header}>{service ? 'Edit Service' : 'Add Service'}</Text>

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
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{service ? 'Update' : 'Submit'}</Text>
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

export default AddServices;
