import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Employee } from "../types/Employee";
import StatusBadge from "./StatusBadge";

interface EmployeeCardProps {
  employee: Employee;
  onPress?: () => void;
}

export default function EmployeeCard({ employee, onPress }: EmployeeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: employee.avatar }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.name}>
          {employee.firstName} {employee.lastName}
        </Text>
        <Text style={styles.email}>{employee.email}</Text>
        <Text style={styles.jobTitle}>Title: {employee.jobTitle}</Text>
        <Text style={styles.department}>Department: {employee.department}</Text>
      </View>

      <StatusBadge isActive={employee.isActive} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    color: "#000",
    fontWeight: "800",
    marginTop: 8,
  },
  jobTitle: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginTop: 8,
  },
  department: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: "#777",
    fontWeight: "600",
  },
});
