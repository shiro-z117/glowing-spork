import { View, StyleSheet } from "react-native";

interface StatusBadgeProps {
  isActive: boolean;
}

export default function StatusBadge({ isActive }: StatusBadgeProps) {
  return (
    <View style={styles.card}>
      <View
        style={[styles.indicator, { backgroundColor: isActive ? "blue" : "red" }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 32,
    height: 32,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
