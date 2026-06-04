import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  size?: "sm" | "md";
  onPress?: () => void;
}

export default function AirtelLogo({ size = "md", onPress }: Props) {
  const height = size === "sm" ? 52 : 90;
  const imgSize = size === "sm" ? 82 : 100;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.container, { height }]}
    >
      <Image
        source={require("@/assets/images/airtel.jpeg")}
        style={{ width: imgSize, height: imgSize }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});