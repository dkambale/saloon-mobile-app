import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import AdminScreen from '../screens/AdminScreen';
import UserScreen from '../screens/UserScreen';
import HomeScreen from '../screens/HomeScreen';
import InventoryScreen from '../screens/AddInventory';
import AddUser from '../screens/AddUser';
import ServicesList from '../screens/ServicesList';
import AddServices from '../screens/AddServices';
import StaffComponent from '../screens/StaffComponent';
import PaymentList from '../screens/PaymentList';
import AddPayment from '../screens/AddPayment';
import AddPaymentProvider from '../screens/AddPayementProvider';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PaymentList" component={PaymentList} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="Services" component={ServicesList} />
        <Stack.Screen name="AddServices" component={AddServices} />
        <Stack.Screen name="StaffComponent" component={StaffComponent} />
        <Stack.Screen name="AddPayment"  component={AddPaymentProvider} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
