import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BottomNavigation = ({ navigation }) => {
  const menuItems = [
    { title: 'Dashboard', route: 'Admin' },
    { title: 'Services', route: 'Services' },
    { title: 'Users', route: 'User' },
    { title: 'Payments', route: 'PaymentList' },
    { title: 'Inventory', route: 'Inventory' },
  ];

  return (
    <View style={styles.container} collapsable={false}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(item.route)}
          activeOpacity={0.7} // Ensures smooth button press effect
        >
          <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BottomNavigation;
