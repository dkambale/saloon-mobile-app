import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const InventoryList = ({ navigation }) => {
  const [inventory, setInventory] = useState([]);

  // Fetch inventory from API
  const fetchInventory = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/inventory"); // Update with your backend URL
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
      } else {
        Alert.alert("Error", "Failed to fetch inventory.");
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  // Delete an inventory item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/inventory/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        Alert.alert('Success', 'Inventory item deleted successfully!');
        fetchInventory(); // Refresh the list after deletion
      } else {
        Alert.alert('Error', 'Failed to delete inventory item.');
      }
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <View style={styles.container}>
      {/* Add Button Positioned Above */}
      <Button
        title="Add Inventory"
        onPress={() => navigation.navigate('AddInventory')}
        color="#007BFF"
      />

      <Text style={styles.header}>Inventory List</Text>

      <ScrollView>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Quantity</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Actions</Text>
          </View>

          {/* Table Rows */}
          <ScrollView style={styles.tableBody}>
            {inventory.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <View style={styles.actionCell}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditInventory', { inventoryId: item.id })}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
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

export default InventoryList;
