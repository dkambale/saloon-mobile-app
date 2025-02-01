import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Button } from "react-native";
import BottomNavigation from "./BottomNavigation";

const PaymentList = ({ navigation }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/payments"); // Update with your backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }
      const data = await response.json();
      setPayments(data);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", "Could not fetch payments. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit Payment ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://http://10.0.2.2/api/payments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete payment");
      }

      setPayments(payments.filter((payment) => payment.id !== id));
    } catch (error) {
      Alert.alert("Error", "Could not delete payment. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Payment Button */}

      <Button
        title="Add Service"
        onPress={() => navigation.navigate('AddPayment')}
        color="#007BFF"
      />

      <Text style={styles.header}>payment List</Text>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={payments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.amount}</Text>
              <Text style={styles.cell}>{item.date}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  paymentButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  paymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  editButton: {
    backgroundColor: "#FFC107",
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PaymentList;
