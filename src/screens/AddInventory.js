import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import BottomNavigation from './BottomNavigation';

const AddInventory = ({ navigation }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState([]);

  const addInventory = async () => {
    if (!name || !quantity || !price) return;
    const newItem = { name, quantity: parseInt(quantity), price: parseFloat(price) };
    
    try {
      const response = await axios.post('http://10.0.2.2:8080/api/inventory', newItem);
      if (response.status === 200 || response.status === 201) {
        alert("Inventory added successfully");
        navigation.navigate('Inventory');
      } else {
        console.error("Error adding inventory:", response.statusText);
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Button title="Add Inventory" onPress={addInventory} />
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.quantity} pcs - ₹{item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <BottomNavigation navigation={navigation} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AddInventory;
