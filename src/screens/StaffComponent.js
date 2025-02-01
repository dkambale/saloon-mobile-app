import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const StaffComponent = () => {
  const [balance, setBalance] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const balanceResponse = await axios.get('/api/staff/balance');
      setBalance(balanceResponse.data.balance);
      
      const entriesResponse = await axios.get('/api/staff/entries/today');
      setTotalEntries(entriesResponse.data.total);
      
      const allEntriesResponse = await axios.get('/api/staff/entries');
      setEntries(allEntriesResponse.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const addEntry = async () => {
    console.log('Navigate to Add Entry screen');
    // Implement navigation to add entry screen
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Staff Details</Text>
      <Text style={styles.info}>Current Balance: ₹{balance.toFixed(2)}</Text>
      <Text style={styles.info}>Today's Total Entries: {totalEntries}</Text>
      <Button title="Add Entry" onPress={addEntry} />
      <Text style={styles.subtitle}>All Entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.amount}</Text>
            <Text style={styles.cell}>{item.description}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default StaffComponent;