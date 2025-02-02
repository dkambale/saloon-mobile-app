import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axiosInstance from '../../utils/axiosInstance';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    // Dummy authentication logic
    axiosInstance.post('/api/users/login', { username, password }).then((response) => { 
      console.log('Login response:', response);
      if(response.data.user.role === 'Admin') {
        navigation.replace('Admin');
      } else {
        navigation.replace('StaffComponent');
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
});

export default LoginScreen;
