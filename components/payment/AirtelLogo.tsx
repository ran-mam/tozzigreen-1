import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  size?: "sm" | "md";
  onPress?: () => void;
}

export default function AirtelLogo({ size = "md", onPress }: Props) {
  const height = size === "sm" ? 52 : 90;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.container, { height }]}
    >
      <Text style={[styles.text, { fontSize: size === "sm" ? 14 : 18 }]}>
        airtel
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.airtel,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "900",
  },
});
