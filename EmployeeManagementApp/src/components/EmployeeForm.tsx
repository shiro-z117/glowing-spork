import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Keyboard, StyleSheet } from "react-native";
import InputField from "./InputField";
import {
  isValidEmail,
  isValidPhone,
  isValidName,
} from "../services/validation";

export interface EmployeeFormValues {
  avatar: string;
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
  onDelete?: () => void;
}

const emptyValues: EmployeeFormValues = {
  avatar: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  jobTitle: "",
  isActive: true,
};

type FormErrors = Partial<Record<keyof EmployeeFormValues, string>>;
type PendingAction = "submit" | "reset" | "delete" | null;

function validateField(
  key: keyof EmployeeFormValues,
  values: EmployeeFormValues,
): string | undefined {
  switch (key) {
    case "firstName":
      return isValidName(values.firstName)
        ? undefined
        : "First name is required";
    case "lastName":
      return isValidName(values.lastName) ? undefined : "Last name is required";
    case "email":
      return isValidEmail(values.email)
        ? undefined
        : "Enter a valid email address";
    case "phone":
      return isValidPhone(values.phone)
        ? undefined
        : "Enter a valid phone number";
    case "department":
      return isValidName(values.department)
        ? undefined
        : "Department is required";
    case "jobTitle":
      return isValidName(values.jobTitle) ? undefined : "Job title is required";
    default:
      return undefined;
  }
}

function capitalizeWords(str: string): string {
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function EmployeeForm({
  initialValues,
  onSubmit,
  onDelete,
}: EmployeeFormProps) {
  const [values, setValues] = useState<EmployeeFormValues>(
    initialValues ?? emptyValues,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusOpen, setStatusOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearPendingTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function armPending(action: PendingAction) {
    clearPendingTimeout();
    setPendingAction(action);
    timeoutRef.current = setTimeout(() => {
      setPendingAction(null);
    }, 6000);
  }

  function cancelPending() {
    clearPendingTimeout();
    setPendingAction(null);
  }

  useEffect(() => {
    return () => clearPendingTimeout();
  }, []);

  function updateField<K extends keyof EmployeeFormValues>(
    key: K,
    value: EmployeeFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleFieldDone(key: keyof EmployeeFormValues) {
    Keyboard.dismiss();
    const error = validateField(key, values);
    setErrors((prev) => ({ ...prev, [key]: error }));
  }

  function validateAll(): boolean {
    const keys: (keyof EmployeeFormValues)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "department",
      "jobTitle",
    ];
    const newErrors: FormErrors = {};
    keys.forEach((key) => {
      const error = validateField(key, values);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function performSubmit() {
    if (validateAll()) {
      onSubmit({
        ...values,
        firstName: capitalizeWords(values.firstName),
        lastName: capitalizeWords(values.lastName),
        department: capitalizeWords(values.department),
        jobTitle: capitalizeWords(values.jobTitle),
      });
    }
  }

  function performReset() {
    setValues(initialValues ?? emptyValues);
    setErrors({});
  }

  function handleSubmitPress() {
    if (pendingAction === "submit") {
      cancelPending();
      performSubmit();
    } else {
      validateAll();
      armPending("submit");
    }
  }

  function handleResetPress() {
    if (pendingAction === "reset") {
      cancelPending();
      performReset();
    } else {
      armPending("reset");
    }
  }

  function handleDeletePress() {
    if (pendingAction === "delete") {
      cancelPending();
      onDelete?.();
    } else {
      armPending("delete");
    }
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={cancelPending}>
      <InputField
        label="Avatar URL"
        value={values.avatar}
        onChangeText={(t) => updateField("avatar", t)}
        onSubmitEditing={() => handleFieldDone("avatar")}
        error={errors.avatar}
      />
      <InputField
        label="First Name"
        value={values.firstName}
        onChangeText={(t) => updateField("firstName", t)}
        onSubmitEditing={() => handleFieldDone("firstName")}
        error={errors.firstName}
      />
      <InputField
        label="Last Name"
        value={values.lastName}
        onChangeText={(t) => updateField("lastName", t)}
        onSubmitEditing={() => handleFieldDone("lastName")}
        error={errors.lastName}
      />
      <InputField
        label="Email"
        value={values.email}
        onChangeText={(t) => updateField("email", t)}
        onSubmitEditing={() => handleFieldDone("email")}
        error={errors.email}
        keyboardType="email-address"
      />
      <InputField
        label="Phone"
        value={values.phone}
        onChangeText={(t) => updateField("phone", t)}
        onSubmitEditing={() => handleFieldDone("phone")}
        error={errors.phone}
        keyboardType="phone-pad"
      />
      <InputField
        label="Department"
        value={values.department}
        onChangeText={(t) => updateField("department", t)}
        onSubmitEditing={() => handleFieldDone("department")}
        error={errors.department}
      />
      <InputField
        label="Job Title"
        value={values.jobTitle}
        onChangeText={(t) => updateField("jobTitle", t)}
        onSubmitEditing={() => handleFieldDone("jobTitle")}
        error={errors.jobTitle}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status</Text>

        <Pressable
          style={styles.statusButton}
          onPress={() => setStatusOpen((o) => !o)}
        >
          <Text>{values.isActive ? "Active" : "Inactive"}</Text>
        </Pressable>

        {statusOpen && (
          <View style={styles.statusMenu}>
            <Pressable
              style={styles.statusOption}
              onPress={() => {
                updateField("isActive", true);
                setStatusOpen(false);
              }}
            >
              <Text>Active</Text>
            </Pressable>
            <Pressable
              style={styles.statusOption}
              onPress={() => {
                updateField("isActive", false);
                setStatusOpen(false);
              }}
            >
              <Text>Inactive</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmitPress}>
        <Text style={styles.buttonText}>
          {pendingAction === "submit" ? "Are you sure?" : "Submit"}
        </Text>
      </Pressable>
      <Pressable style={styles.resetButton} onPress={handleResetPress}>
        <Text style={styles.buttonText}>
          {pendingAction === "reset" ? "Are you sure?" : "Reset"}
        </Text>
      </Pressable>
      {onDelete && (
        <Pressable style={styles.deleteButton} onPress={handleDeletePress}>
          <Text style={styles.buttonText}>
            {pendingAction === "delete" ? "Are you sure?" : "Delete"}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  statusButton: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  statusMenu: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: "#fff",
  },
  statusOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  submitButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  resetButton: {
    backgroundColor: "green",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
});
