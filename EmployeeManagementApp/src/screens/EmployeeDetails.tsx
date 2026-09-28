import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Employee } from "../types/Employee";
import { fetchEmployeeById } from "../data/apiData";

type EmployeeDetailsRouteProp = RouteProp<
  RootStackParamList,
  "EmployeeDetails"
>;

export default function EmployeeDetails() {
  const route = useRoute<EmployeeDetailsRouteProp>();

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const { id } = route.params;
    fetchEmployeeById(id).then(setEmployee);
  }, [route.params]);

  return (
    <View>
      <Text>Employee Details</Text>
      {employee && (
        <View>
          <Text>Name: {employee.firstName} {employee.lastName}</Text>
          <Text>Email: {employee.email}</Text>
          <Text>Job Title: {employee.jobTitle}</Text>
          <Text>Department: {employee.department}</Text>
          <Text>Email: {employee.email}</Text>
          <Text>Phone: {employee.phone}</Text>
          <Text>Join Date: {employee.joinDate}</Text>
          <Text>Status: {employee.isActive ? "Active" : "Inactive"}</Text>
        </View>
      )}
    </View>
  );
}
