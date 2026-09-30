import { View, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Employee } from "../types/Employee";
import {
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/apiData";
import EmployeeForm, { EmployeeFormValues } from "../components/EmployeeForm";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";

type EditEmployeeRouteProp = RouteProp<RootStackParamList, "EditEmployee">;
type EditEmployeeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EditEmployee() {
  const route = useRoute<EditEmployeeRouteProp>();
  const navigation = useNavigation<EditEmployeeNavigationProp>();
  const { id } = route.params;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    fetchEmployeeById(id)
      .then(setEmployee)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values: EmployeeFormValues) {
    try {
      if (id && employee) {
        await updateEmployee(id, { ...values, joinDate: employee.joinDate });
      } else {
        await createEmployee({ ...values, joinDate: new Date().toISOString() });
      }
      navigation.goBack();
    } catch {
      Alert.alert(
        "Something went wrong",
        "Failed to save employee. Please try again.",
      );
    }
  }

  async function handleDelete() {
    if (!id) return;
    try {
      await deleteEmployee(id);
      navigation.popToTop();
    } catch {
      Alert.alert(
        "Something went wrong",
        "Failed to delete employee. Please try again.",
      );
    }
  }

  if (loading) {
    return <LoadingView />;
  }

  if (error || (id && !employee)) {
    return <ErrorView message="Something went wrong loading this employee." />;
  }

  const initialValues: EmployeeFormValues | undefined = employee
    ? {
        avatar: employee.avatar,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        jobTitle: employee.jobTitle,
        isActive: employee.isActive,
      }
    : undefined;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <EmployeeForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onDelete={id ? handleDelete : undefined}
        />
      </ScrollView>
    </View>
  );
}
