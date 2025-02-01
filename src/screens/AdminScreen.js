import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dashboard from './Dashboard';
import BottomNavigation from './BottomNavigation';

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.dashboardContainer}>
        <Dashboard />
      </View>

      {/* Ensure BottomNavigation is not inside a conflicting GestureDetector */}
      <View style={styles.navigationContainer}>
        <BottomNavigation navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dashboardContainer: {
    flex: 1,
    padding: 10,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default AdminScreen;
