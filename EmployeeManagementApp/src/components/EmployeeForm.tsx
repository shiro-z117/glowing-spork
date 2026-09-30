import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import InputField from "./InputField";
import { isValidEmail, isValidPhone, isValidName } from "../services/validation";

export interface EmployeeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  isActive: boolean;
}

interface EmployeeFormProps {
  initialValues?: EmployeeFormValues;
  onSubmit: (values: EmployeeFormValues) => void;
}

const emptyValues: EmployeeFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  jobTitle: "",
  isActive: true,
};

export default function EmployeeForm({
  initialValues,
  onSubmit,
}: EmployeeFormProps) {
  const [values, setValues] = useState<EmployeeFormValues>(
    initialValues ?? emptyValues,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof EmployeeFormValues, string>>
  >({});

  function updateField<K extends keyof EmployeeFormValues>(
    key: K,
    value: EmployeeFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};

    if (!isValidName(values.firstName))
      newErrors.firstName = "First name is required";
    if (!isValidName(values.lastName))
      newErrors.lastName = "Last name is required";
    if (!isValidEmail(values.email))
      newErrors.email = "Enter a valid email address";
    if (!isValidPhone(values.phone))
      newErrors.phone = "Enter a valid phone number";
    if (!isValidName(values.department))
      newErrors.department = "Department is required";
    if (!isValidName(values.jobTitle))
      newErrors.jobTitle = "Job title is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      onSubmit(values);
    }
  }

  return (
    <View>
      <InputField
        label="First Name"
        value={values.firstName}
        onChangeText={(t) => updateField("firstName", t)}
        error={errors.firstName}
      />
      <InputField
        label="Last Name"
        value={values.lastName}
        onChangeText={(t) => updateField("lastName", t)}
        error={errors.lastName}
      />
      <InputField
        label="Email"
        value={values.email}
        onChangeText={(t) => updateField("email", t)}
        error={errors.email}
        keyboardType="email-address"
      />
      <InputField
        label="Phone"
        value={values.phone}
        onChangeText={(t) => updateField("phone", t)}
        error={errors.phone}
        keyboardType="phone-pad"
      />
      <InputField
        label="Department"
        value={values.department}
        onChangeText={(t) => updateField("department", t)}
        error={errors.department}
      />
      <InputField
        label="Job Title"
        value={values.jobTitle}
        onChangeText={(t) => updateField("jobTitle", t)}
        error={errors.jobTitle}
      />

      <Pressable
        style={styles.statusToggle}
        onPress={() => updateField("isActive", !values.isActive)}
      >
        <Text>
          Status: {values.isActive ? "Active" : "Inactive"} (tap to toggle)
        </Text>
      </Pressable>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  statusToggle: {
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
});
