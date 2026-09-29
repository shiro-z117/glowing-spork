import { Text, ActivityIndicator, View, StyleSheet } from "react-native";

interface LoadingViewProps {
  message?: string;
}

export default function LoadingView({
  message = "Loading...",
}: LoadingViewProps) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#0000ff" />
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
