import { StyleSheet, Text, View } from "react-native";

interface StatBadgeProps {
  label: string;
  value: string;
  last?: boolean;
}

export default function StatBadge({ label, value, last }: StatBadgeProps) {
  return (
    <View style={[styles.container, !last && styles.border]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.25)",
  },
  label: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 9,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
    textAlign: "center",
  },
  value: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 14,
  },
});
