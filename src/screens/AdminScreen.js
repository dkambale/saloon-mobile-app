import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PaymentList from './PaymentList';
import LogoutScreen from './LogoutScreen';
import AddInventory from './AddInventory';
import AddUser from './AddUser';
import AddServices from './AddServices';
import AddPaymentProvider from './AddPayment';
import UserScreen from './UserList';
import InventoryList from './InventoryList';
import ServicesList from './ServicesList';

// Create Stack Navigator for Home actions
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="AddUser" component={AddUser} />
    <Stack.Screen name="AddInventory" component={AddInventory} />
    <Stack.Screen name="AddServices" component={AddServices} />
    <Stack.Screen name="AddPayment" component={AddPaymentProvider} />

    <Stack.Screen name="UserList" component={UserScreen} />
    <Stack.Screen name="InventoryList" component={InventoryList} />
    <Stack.Screen name="ServicesList" component={ServicesList} />
    <Stack.Screen name="PaymentList" component={PaymentList} />
  </Stack.Navigator>
);

const PaymentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PaymentList" component={PaymentList} />
    <Stack.Screen name="AddPayment" component={AddPaymentProvider} />
  </Stack.Navigator>
)
// Create Bottom Tabs
const Tab = createBottomTabNavigator();

const AdminTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Payments" component={PaymentStack} />
    <Tab.Screen name="Logout" component={LogoutScreen} />
  </Tab.Navigator>
);

export default AdminTabs;
