import { Text, View } from "react-native"
import AppNavigator from "./src/navigator/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";

const App = () => {

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}

export default App;