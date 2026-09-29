import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Employee } from "../types/Employee";
import { fetchEmployeeById } from "../data/apiData";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";

type EmployeeDetailsRouteProp = RouteProp<
  RootStackParamList,
  "EmployeeDetails"
>;

export default function EmployeeDetails() {
  const route = useRoute<EmployeeDetailsRouteProp>();
  const { id } = route.params;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchEmployeeById(id)
      .then((data) => setEmployee(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.centered}>
          <LoadingView />
        </View>
      )}

      {!loading && (error || !employee) && (
        <View style={styles.centered}>
          <ErrorView message="Something went wrong with loading this employee's information." />
        </View>
      )}

      {!loading && employee && (
        <View style={styles.content}>
          <Image source={{ uri: employee.avatar }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>
                {employee.firstName} {employee.lastName}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}> {employee.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Job Title:</Text>
              <Text style={styles.value}> {employee.jobTitle}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.value}> {employee.department}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}> {employee.phone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Join Date:</Text>
              <Text style={styles.value}>
                {new Date(employee.joinDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>
                {employee.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  infoContainer: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  label: {
    fontWeight: "600",
  },
  value: {
    textAlign: "right",
  },
  avatar: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
});
