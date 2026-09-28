import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { fetchAllEmployees } from "../data/apiData";
import EmployeeCard from "../components/EmployeeCard";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllEmployees().then(setEmployees);
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const data = await fetchAllEmployees();
      setEmployees(data);
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/*TODO: make this sortable by firstname, lastname, and filter by department*/}
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EmployeeCard employee={item} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
