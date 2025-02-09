import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AddInventory = ({ navigation, route }) => {
  const { userDetails } = useContext(AuthContext);
  const [accountId, setAccountId] = useState('');
  const inventory = route?.params?.item;

  const [name, setName] = useState(inventory ? inventory.name : '');
  const [quantity, setQuantity] = useState(inventory ? String(inventory.quantity) : '');
  const [price, setPrice] = useState(inventory ? String(inventory.price) : '');

  useEffect(() => {
    if (userDetails?.accountId) {
      setAccountId(userDetails.accountId);
    }
  }, [userDetails?.accountId]);

  const saveInventory = async () => {
    if (!name || !quantity || !price) return;
    const inventoryData = {
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      accountId,
    };

    if (inventory) {
      // Edit inventory
      inventoryData.id = inventory.id;
      inventoryData.createdBy = inventory.createdBy;
      inventoryData.createdDate = inventory.createdDate;
      inventoryData.updatedBy = userDetails?.username || 'Admin';
      inventoryData.updatedDate = new Date().toISOString();
    }

    try {
      const response = await axios['post'](
        `http://10.0.2.2:8080/api/inventory`,
        inventoryData
      );
      if (response.status === 200 || response.status === 201) {
        alert(`Inventory ${inventory ? 'updated' : 'added'} successfully`);
        navigation.navigate('InventoryList');
      } else {
        console.error(`Error ${inventory ? 'updating' : 'adding'} inventory:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error ${inventory ? 'updating' : 'adding'} inventory:`, error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{inventory ? 'Edit Inventory' : 'Add Inventory'}</Text>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveInventory}>
          <Text style={styles.buttonText}>{inventory ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddInventory;
