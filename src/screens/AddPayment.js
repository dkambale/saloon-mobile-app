import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "react-native-multiple-select";
import { TextInput as PaperInput, IconButton, Menu } from "react-native-paper";

const AddPayment = ({navigation}) => {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [serviceList, setServiceList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/services");
      const data = await response.json();
      setServiceList(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    console.log(selectedDate);
    console.log(event);
    if (selectedDate) {
      setPaymentDate(selectedDate);
    }
    setShowDatePicker(false); // Hide picker after selection
  };

  const addPayment = async () => {
    if (!amount || selectedServices.length === 0) return;
    const paymentData = {
      amount: parseFloat(amount),
      paymentDate :paymentDate.toISOString(),
      paymentMethod,
      serviceList: serviceList.filter(ser => selectedServices.includes(ser.id)).map(ser => ser)
    };

    console.log(paymentData);
    try {
      const response = await fetch("http://10.0.2.2:8080/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert("Payment added successfully");
        navigation.navigate("PaymentList");
      } else {
        console.error("Error adding payment:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Payment</Text>

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputContainer}>
        <PaperInput label="Select Payment Date" value={paymentDate.toDateString()} editable={false} style={styles.input} />
        <IconButton icon="calendar" size={24} onPress={() => setShowDatePicker(true)} />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={paymentDate}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "calendar"}
          onChange={handleDateChange}
        />
      )}

      {/* Payment Method Select */}
      <View style={styles.dropdownContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity style={styles.dropdown} onPress={() => setMenuVisible(true)}>
              <Text>{paymentMethod}</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => setPaymentMethod("Cash")} title="Cash" />
          <Menu.Item onPress={() => setPaymentMethod("Card")} title="Card" />
          <Menu.Item onPress={() => setPaymentMethod("UPI")} title="UPI" />
        </Menu>
      </View>

      {/* MultiSelect Services */}
      <MultiSelect
        items={serviceList}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedServices}
        selectedItems={selectedServices}
        selectText="Select Services"
        searchInputPlaceholderText="Search Services..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#000"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#48d22b"
        submitButtonText="Confirm"
      />

      {/* Submit Button */}
      <Button title="Add Payment" onPress={addPayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default AddPayment;
