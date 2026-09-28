import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { fetchAllEmployees, fetchDepartments } from "../data/apiData";
import EmployeeCard from "../components/EmployeeCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown, { SortOption } from "../components/FilterDropdown";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [excludedDepartments, setExcludedDepartments] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "firstName",
    direction: "asc",
  });

  useEffect(() => {
    fetchAllEmployees().then(setEmployees);
    fetchDepartments().then(setDepartments);
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const data1 = await fetchAllEmployees();
      setEmployees(data1);
      const data2 = await fetchDepartments();
      setDepartments(data2);
    } finally {
      setRefreshing(false);
    }
  }

  const filteredEmployees = employees
    .filter((e) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        e.firstName.toLowerCase().includes(query) ||
        e.lastName.toLowerCase().includes(query);
      const matchesDepartment = !excludedDepartments.includes(e.department);
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      const result = a[sortOption.field].localeCompare(b[sortOption.field]);
      return sortOption.direction === "asc" ? result : -result;
    });

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FilterDropdown
        departments={departments}
        excludedDepartments={excludedDepartments}
        onChangeExcluded={setExcludedDepartments}
        sortOption={sortOption}
        onSelectSort={setSortOption}
      />

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
