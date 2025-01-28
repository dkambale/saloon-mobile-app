import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";

const Dashboard = () => (
    <View style={styles.dashboardContainer}>
      {/* Cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Balance</Text>
        <Text style={styles.cardValue}>₹50,000</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Total Orders</Text>
        <Text style={styles.cardValue}>150</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Total Earnings</Text>
        <Text style={styles.cardValue}>₹25,000</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    scene: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dashboardContainer: {
      flex: 1,
      padding: 20,
    },
    card: {
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 12,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#555',
    },
    cardValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 10,
    },
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    menuButton: {
      flex: 1,
      backgroundColor: '#6200ee',
      padding: 15,
      borderRadius: 12,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    menuText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default Dashboard;