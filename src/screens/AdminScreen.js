import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Dashboard from './Dashboard';

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      {/* Dashboard at the top */}
      <View style={styles.dashboardContainer}>
        <Dashboard />
      </View>

      {/* Buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <Button
          title="Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
          color="#007BFF"
        />
        <Button
          title="Services"
          onPress={() => navigation.navigate('Services')}
          color="#007BFF"
        />
         <Button
          title="Users"
          onPress={() => navigation.navigate('User')}
          color="#007BFF"
        />
        <Button
          title="Payments"
          onPress={() => navigation.navigate('Payment')}
          color="#007BFF"
        />
        <Button
          title="Inventory"
          onPress={() => navigation.navigate('Inventory')}
          color="#007BFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between', // Ensures the top and bottom content are spaced
  },
  dashboardContainer: {
    flex: 1, // Takes up available vertical space
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-around', // Spread buttons evenly
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default AdminScreen;
