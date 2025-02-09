import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axiosInstance from '../../utils/axiosInstance';

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/users/${id}`);
      if (response.status === 200) {
        Alert.alert('Success', 'User deleted successfully!');
        fetchUsers(); // Refresh the list after deletion
      } else {
        Alert.alert('Error', 'Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Add Button Positioned Above */}
      <Button
        title="Add User"
        onPress={() => navigation.navigate('AddUser')}
        color="#007BFF"
      />

      <Text style={styles.header}>Users List</Text>

      <ScrollView>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Role</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Actions</Text>
          </View>

          {/* Table Rows */}
          <ScrollView style={styles.tableBody}>
            {users.map((user) => (
              <View key={user.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{user.userName}</Text>
                <Text style={styles.tableCell}>{user.role}</Text>
                <View style={styles.actionCell}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('AddUser', { user })}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(user.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableBody: {
    maxHeight: 400, // Scrollable body
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#fff',
  },
  actionCell: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3D00',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserList;
