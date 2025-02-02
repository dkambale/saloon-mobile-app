import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import PaymentList from './PaymentList';
import InventoryList from './InventoryList';
import AddInventory from './AddInventory';
import AddUser from './AddUser';
import ServicesList from './ServicesList';
import AddServices from './AddServices';
import StaffComponent from './StaffComponent';
import AddPaymentProvider from './AddPayment';
import LogoutScreen from './LogoutScreen';

// Create stack navigator for middle content
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="PaymentList" component={PaymentList} />
    <Stack.Screen name="Inventory" component={InventoryList} />
    <Stack.Screen name="AddInventory" component={AddInventory} />
    <Stack.Screen name="AddUser" component={AddUser} />
    <Stack.Screen name="Services" component={ServicesList} />
    <Stack.Screen name="AddServices" component={AddServices} />
    <Stack.Screen name="StaffComponent" component={StaffComponent} />
    <Stack.Screen name="AddPayment" component={AddPaymentProvider} />
  </Stack.Navigator>
);

// Create Bottom Tabs
const Tab = createBottomTabNavigator();

const AdminScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={MainStack} options={{ headerShown: false }} />
      <Tab.Screen name="Inventory" component={InventoryList} />
      <Tab.Screen name="Users" component={AddUser} />
      <Tab.Screen name="Services" component={ServicesList} />
      <Tab.Screen name="Logout" component={LogoutScreen} /> 
    </Tab.Navigator>
  );
};

export default AdminScreen;
