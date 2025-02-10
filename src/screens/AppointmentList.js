import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const AppointmentComponent = () => {
  const { userDetails } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const updateAppointmentStatus = async (id, status, reason = '') => {
    try {
      const url = `http://10.0.2.2:8080/api/appointments/${id}/status?status=${status}&reason=${encodeURIComponent(reason)}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Alert.alert('Success', `Appointment ${status.toLowerCase()} successfully!`);
        fetchAppointments(); // Refresh the appointment list
      } else {
        const errorText = await response.text();
        Alert.alert('Error', errorText);
      }
    } catch (error) {
      console.error(`Error updating appointment status:`, error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleAccept = (id) => {
    updateAppointmentStatus(id, 'Completed');
  };

  const handleReject = (id, reason) => {
    updateAppointmentStatus(id, 'Cancelled', reason);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button 
        title="Add Appointment" 
        onPress={() => navigation.navigate('AddAppointment')} 
        color="#6200EE" 
      />

      <View style={styles.headerRow}>
        <Text style={styles.header}>Customer</Text>
        <Text style={styles.header}>Date</Text>
        <Text style={styles.header}>Hour</Text>
        <Text style={styles.header}>Minute</Text>
        <Text style={styles.header}>Branch</Text>
        {userDetails.role === 'Admin' && <Text style={styles.header}>Actions</Text>}
      </View>

      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentRow}>
            <Text style={styles.cell}>{appointment.customerName}</Text>
            <Text style={styles.cell}>{appointment.appointmentDate}</Text>
            <Text style={styles.cell}>{appointment.hour}</Text>
            <Text style={styles.cell}>{appointment.minute}</Text>
            <Text style={styles.cell}>{appointment.branch}</Text>
            {userDetails.role === 'Admin' && (
              <View style={styles.buttonContainer}>
                <Button title="Accept" onPress={() => handleAccept(appointment.id)} color="#4CAF50" />
                <Button title="Reject" onPress={() => handleReject(appointment.id, 'No available slots')} color="#F44336" />
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No appointments available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#e0e0e0',
    marginTop: 20,
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appointmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  noDataText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
  },
});

export default AppointmentComponent;
