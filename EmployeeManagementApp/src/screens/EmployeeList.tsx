import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { fetchAllEmployees } from "../data/apiData";
import EmployeeCard from "../components/EmployeeCard";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchAllEmployees().then(setEmployees);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/*TODO: make this sortable by firstname, lastname, and filter by department*/}
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EmployeeCard employee={item} />}
      />
    </View>
  );
}
