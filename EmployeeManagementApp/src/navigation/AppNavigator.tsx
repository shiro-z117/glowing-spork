import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import EmployeeList from "../screens/EmployeeList";
import EmployeeDetails from "../screens/EmployeeDetails";
import EditEmployees from "../screens/EditEmployees";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EmployeeList"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
        <Stack.Screen name="EditEmployees" component={EditEmployees} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
