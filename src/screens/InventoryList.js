import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button } from "react-native";
import BottomNavigation from "./BottomNavigation";

const InventoryList = ({ navigation }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/inventory"); // Update with your backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      const data = await response.json();
      setInventory(data);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", "Could not fetch inventory. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerCell}>ID</Text>
      <Text style={styles.headerCell}>Name</Text>
      <Text style={styles.headerCell}>Quantity</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Add Inventory Button */}
      <Button
        title="Add Inventory"
        onPress={() => navigation.navigate('AddInventory')}
        color="#007BFF"
      />

      <Text style={styles.header}>Inventory List</Text>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={inventory}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 100 }} // Add padding to avoid overlap with BottomNavigation
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.id}</Text>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
            </View>
          )}
        />
      )}

      <BottomNavigation navigation={navigation} style={styles.bottomNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default InventoryList;