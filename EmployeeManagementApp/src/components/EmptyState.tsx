import { Text, View, StyleSheet } from "react-native";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No results found",
}: EmptyStateProps) {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#888",
  },
});
