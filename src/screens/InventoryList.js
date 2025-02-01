import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const deleteInventory = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      setInventory(inventory.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const editInventory = (id) => {
    console.log('Edit inventory item with ID:', id);
    // Implement edit functionality (e.g., navigate to edit screen)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory List</Text>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}>₹{item.price.toFixed(2)}</Text>
            <Button title="Edit" onPress={() => editInventory(item.id)} />
            <Button title="Delete" onPress={() => deleteInventory(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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

export default InventoryList;