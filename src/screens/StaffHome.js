import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dashboard from './Dashboard';

const StaffHome = ({ navigation }) => {

  return (
    <View style={styles.container}>
      {/* Dashboard Component with minimal top padding */}
      <View >
        <Dashboard />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {/* Payment Buttons */}
        <ActionButton 
          title="Add Payment" 
          icon="credit-card" 
          onPress={() => navigation.navigate('AddPayment')} 
        />
        <ActionButton 
          title="List Payments" 
          icon="money" 
          onPress={() => navigation.navigate('PaymentList')} 
          
        />
      </View>
    </View>
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

export default StaffHome;
