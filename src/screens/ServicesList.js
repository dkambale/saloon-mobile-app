import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ServicesList = ({ navigation }) => {
  const [services, setServices] = useState([]);

  // Fetch services from API
  const fetchServices = async () => {
    try {
      const response = await fetch('https://your-api-url.com/servicesList');
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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Services List</Text>
        <Button
          title="Add Service"
          onPress={() => navigation.navigate('AddServices')}
          color="#007BFF"
        />
      </View>
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Price</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Duration</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Actions</Text>
          </View>
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
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
