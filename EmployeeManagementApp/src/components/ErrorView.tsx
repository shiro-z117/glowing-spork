import { Text, View, StyleSheet } from "react-native";

interface ErrorViewProps {
  message?: string;
}

export default function ErrorView({
  message = "Something went wrong",
}: ErrorViewProps) {
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
    color: "#cc0000",
  },
});
