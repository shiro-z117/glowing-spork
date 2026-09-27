import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { fetchAllEmployees } from "../data/apiData";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchAllEmployees().then(setEmployees);
  }, []);

  return (
    <View>
      <Text>Employee List</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.firstName}
            {item.lastName}
          </Text>
        )}
      />
    </View>
  );
}
