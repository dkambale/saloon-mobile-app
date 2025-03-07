import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dashboard from './Dashboard';
import AdminHome from './AdminHome';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import StaffHome from './StaffHome';


const HomeScreen = ({ navigation }) => {

  const { userDetails } = useContext(AuthContext);
  return (
    userDetails.role === "Admin" 
      ? <AdminHome navigation={navigation} /> 
      : <StaffHome navigation={navigation} />
  );
};

// Reusable Action Button Component
const ActionButton = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <FontAwesome name={icon} size={20} color="#fff" style={styles.icon} />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  dashboardWrapper: {
    paddingTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    padding: 15,
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
