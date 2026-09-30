import { View, Text, TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  error?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
}

export default function InputField({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  error,
  keyboardType = "default",
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        returnKeyType="done"
        autoCapitalize="none"
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#cc0000",
  },
  error: {
    color: "#cc0000",
    fontSize: 12,
    marginTop: 4,
  },
});
