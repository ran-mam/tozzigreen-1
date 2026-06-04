import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  size?: "sm" | "md";
  onPress?: () => void;
}

export default function OrangeLogo({ size = "md", onPress }: Props) {
  const height = size === "sm" ? 52 : 90;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.container, { height }]}
    >
      <Text style={[styles.text, { fontSize: size === "sm" ? 14 : 18 }]}>
        orange™
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orangeMoney,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 1,
  },
});
