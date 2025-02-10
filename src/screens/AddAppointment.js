import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Menu, IconButton } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const AddAppointment = () => {
  const { userDetails } = useContext(AuthContext);
  const navigation = useNavigation();

  const [customerName, setCustomerName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [branch, setBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/api/branches');
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useState(() => {
    fetchBranches();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setAppointmentDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const bookAppointment = async () => {
    if (!customerName || !hour || !minute ) return;

    const appointmentData = {
      customerName,
      appointmentDate: appointmentDate.toISOString().split('T')[0],
      time: `${hour}:${minute}`,
      hour: hour,
      minute: minute,
      branch,
    };

    try {
      const response = await axios.post('http://10.0.2.2:8080/api/appointments', appointmentData);
      if (response.status === 200 || response.status === 201) {
        alert('Appointment booked successfully!');
        navigation.navigate('Home');
      } else {
        alert('Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Book Appointment</Text>

      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputContainer}>
        <Text>{appointmentDate.toDateString()}</Text>
        <IconButton icon="calendar" size={24} onPress={() => setShowDatePicker(true)} />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={appointmentDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
          onChange={handleDateChange}
        />
      )}

      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          placeholder="Hour"
          keyboardType="numeric"
          value={hour}
          onChangeText={setHour}
        />
        <TextInput
          style={styles.timeInput}
          placeholder="Minute"
          keyboardType="numeric"
          value={minute}
          onChangeText={setMinute}
        />
      </View>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity style={styles.inputContainer} onPress={() => setMenuVisible(true)}>
            <Text>{branch || 'Select Branch'}</Text>
            <IconButton icon="menu-down" size={24} onPress={() => setMenuVisible(true)} />
          </TouchableOpacity>
        }
      >
        {branches.map((branchOption) => (
          <Menu.Item key={branchOption.id} onPress={() => setBranch(branchOption.name)} title={branchOption.name} />
        ))}
      </Menu>

      <Button title="Book Appointment" onPress={bookAppointment} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '48%',
  },
});

export default AddAppointment;
