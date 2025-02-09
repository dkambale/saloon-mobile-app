import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "react-native-multiple-select";
import { TextInput as PaperInput, IconButton, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";

const AddPayment = ({ navigation, route }) => {
  const { userDetails } = useContext(AuthContext);
  const payment = route?.params?.item;

  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState(payment ? String(payment.amount) : "");
  const [paymentDate, setPaymentDate] = useState(payment ? new Date(payment.paymentDate) : new Date());
  const [paymentMethod, setPaymentMethod] = useState(payment ? payment.paymentMethod : "Cash");
  const [serviceList, setServiceList] = useState([]);
  const [selectedServices, setSelectedServices] = useState(payment ? payment.serviceList.map(service => service.id) : []);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (userDetails?.accountId) {
      setAccountId(userDetails.accountId);
    }
  }, [userDetails?.accountId]);

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
    if (selectedDate) {
      setPaymentDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const savePayment = async () => {
    if (!amount || selectedServices.length === 0) return;

    const paymentData = {
      amount: parseFloat(amount),
      paymentDate: paymentDate.toISOString(),
      paymentMethod,
      serviceList: serviceList.filter(service => selectedServices.includes(service.id)),
      accountId,
    };

    if (payment) {
      paymentData.id = payment.id;
      paymentData.createdBy = payment.createdBy;
      paymentData.createdDate = payment.createdDate;
      paymentData.updatedBy = userDetails?.username || 'Admin';
      paymentData.updatedDate = new Date().toISOString();
    }

    try {
      const response = await fetch(`http://10.0.2.2:8080/api/payments`, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert(`Payment ${payment ? 'updated' : 'added'} successfully`);
        navigation.navigate("PaymentList");
      } else {
        console.error(`Error ${payment ? 'updating' : 'adding'} payment:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error ${payment ? 'updating' : 'adding'} payment:`, error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Text style={styles.title}>{payment ? 'Edit Payment' : 'Add Payment'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

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

        <Button title={payment ? "Update Payment" : "Add Payment"} onPress={savePayment} />
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    marginBottom: 10,
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
