import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const UserScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  // Fetch users from the API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch users.');
    }
  };

  const handleEdit = (userId) => {
    navigation.navigate('EditUser', { userId }); // Navigate to Edit User screen
  };

  const handleDelete = (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Make delete request to the API
              await fetch(`https://your-api-url.com/deleteUser/${userId}`, { method: 'DELETE' });
              fetchUsers(); // Refresh the user list
            } catch (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', 'Failed to delete user.');
            }
          },
        },
      ]
    );
  };

  const renderUser = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.userName}</Text>
      <Text style={styles.cell}>{item.role}</Text>
      <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.editButton}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Add User Button */}
      <View style={styles.addButtonContainer}>
        <Button
          title="Add User"
          onPress={() => navigation.navigate('AddUser')} // Navigate to Add User screen
          color="#007BFF"
        />
      </View>

      {/* User List Table */}
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Role</Text>
          <Text style={styles.headerCell}>Actions</Text>
        </View>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  addButtonContainer: {
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3D00',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserScreen;
