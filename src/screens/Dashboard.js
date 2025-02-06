import { StyleSheet, Text, View, ScrollView } from "react-native";

const Dashboard = () => (
  <View style={styles.dashboardContainer}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
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
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 10,  // Adds spacing between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 200,  // Fixed width for consistent card sizes
    alignItems: 'center',  // Center content inside cards
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',  // Center align text
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'center',  // Center align value
  },
});

export default Dashboard;
