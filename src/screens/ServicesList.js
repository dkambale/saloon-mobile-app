import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNavigation from './BottomNavigation';

const ServicesList = ({ navigation }) => {
  const [services, setServices] = useState([]);

  // Fetch services from API
  const fetchServices = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        Alert.alert('Error', 'Failed to fetch services.');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  // Delete a service
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://your-api-url.com/deleteService/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        Alert.alert('Success', 'Service deleted successfully!');
        fetchServices(); // Refresh the list after deletion
      } else {
        Alert.alert('Error', 'Failed to delete service.');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <View style={styles.container}>
      {/* Add Button Positioned Above */}
      <Button
        title="Add Service"
        onPress={() => navigation.navigate('AddServices')}
        color="#007BFF"
      />

      <Text style={styles.header}>Services List</Text>

      <ScrollView >
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Price</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Duration</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Actions</Text>
          </View>

          {/* Table Rows */}
          <ScrollView style={styles.tableBody}>
            {services.map((service) => (
              <View key={service.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{service.name}</Text>
                <Text style={styles.tableCell}>{service.price}</Text>
                <Text style={styles.tableCell}>{service.duration}</Text>
                <View style={styles.actionCell}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditService', { serviceId: service.id })}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(service.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      {/* <BottomNavigation navigation={navigation} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableBody: {
    maxHeight: 400, // Scrollable body
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#fff',
  },
  actionCell: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3D00',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ServicesList;
