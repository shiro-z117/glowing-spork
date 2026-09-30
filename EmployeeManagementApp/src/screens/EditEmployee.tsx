import { View, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import EmployeeForm, { EmployeeFormValues } from "../components/EmployeeForm";

type EditEmployeeRouteProp = RouteProp<RootStackParamList, "EditEmployee">;

export default function EditEmployee() {
  const route = useRoute<EditEmployeeRouteProp>();
  const { id } = route.params;

  function handleSubmit(values: EmployeeFormValues) {
    console.log(id ? "Editing employee:" : "Adding employee:", values);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <EmployeeForm onSubmit={handleSubmit} />
      </ScrollView>
    </View>
  );
}
