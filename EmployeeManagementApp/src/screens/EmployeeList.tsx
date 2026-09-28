import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { fetchAllEmployees } from "../data/apiData";
import EmployeeCard from "../components/EmployeeCard";
import SearchBar from "../components/SearchBar";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredEmployees = employees.filter((q) => {
    const matchesSearch =
      q.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {/*TODO: make this sortable by firstname, lastname, and filter by department*/}

      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EmployeeCard employee={item} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
