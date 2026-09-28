import { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";

export interface SortOption {
  field: "firstName" | "lastName";
  direction: "asc" | "desc";
}

interface FilterDropdownProps {
  departments: string[];
  excludedDepartments: string[];
  onChangeExcluded: (excluded: string[]) => void;
  sortOption: SortOption;
  onSelectSort: (sort: SortOption) => void;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  {
    label: "First name (A-Z)",
    value: { field: "firstName", direction: "asc" },
  },
  {
    label: "First name (Z-A)",
    value: { field: "firstName", direction: "desc" },
  },
  { label: "Last name (A-Z)", value: { field: "lastName", direction: "asc" } },
  { label: "Last name (Z-A)", value: { field: "lastName", direction: "desc" } },
];

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </View>
  );
}

export default function FilterDropdown({
  departments,
  excludedDepartments,
  onChangeExcluded,
  sortOption,
  onSelectSort,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const allSelected = departments.every(
    (d) => !excludedDepartments.includes(d),
  );

  function toggleAll() {
    onChangeExcluded(allSelected ? [...departments] : []);
  }

  function toggleDepartment(dept: string) {
    onChangeExcluded(
      excludedDepartments.includes(dept)
        ? excludedDepartments.filter((d) => d !== dept)
        : [...excludedDepartments, dept],
    );
  }

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setOpen((o) => !o)}>
        <Text style={styles.buttonText}>Filter & Sort</Text>
      </Pressable>

      {open && (
        <View style={styles.menu}>
          <ScrollView nestedScrollEnabled>
            <Text style={styles.sectionTitle}>Sort by</Text>
            {SORT_OPTIONS.map(({ label, value }) => {
              const isSelected =
                sortOption.field === value.field &&
                sortOption.direction === value.direction;
              return (
                <Pressable
                  key={label}
                  style={styles.option}
                  onPress={() => onSelectSort(value)}
                >
                  <Text style={isSelected && styles.selected}>{label}</Text>
                </Pressable>
              );
            })}

            <Text style={styles.sectionTitle}>Department</Text>
            <Pressable style={styles.checkRow} onPress={toggleAll}>
              <Checkbox checked={allSelected} />
              <Text style={styles.checkLabel}>Select all</Text>
            </Pressable>
            {departments.map((dept) => (
              <Pressable
                key={dept}
                style={styles.checkRow}
                onPress={() => toggleDepartment(dept)}
              >
                <Checkbox checked={!excludedDepartments.includes(dept)} />
                <Text style={styles.checkLabel}>{dept}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    height: 40,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginTop: 6,
    maxHeight: 400,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 4,
  },
  option: {
    paddingVertical: 10,
  },
  selected: {
    fontWeight: "700",
    color: "blue",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkLabel: {
    marginLeft: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 16,
  },
});
