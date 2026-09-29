import { Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type AddEditButtonNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface AddEditButtonProps {
  id?: string;
}

export default function AddEditButton({ id }: AddEditButtonProps) {
  const navigation = useNavigation<AddEditButtonNavigationProp>();
  return (
    <Pressable
      style={{
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 16,
        height: 40,
        justifyContent: "center",
      }}
      onPress={() => navigation.navigate("EditEmployee", { id })}
    >
      <Text>{id ? "Edit Employee" : "+ Add New Employee"}</Text>
    </Pressable>
  );
}
