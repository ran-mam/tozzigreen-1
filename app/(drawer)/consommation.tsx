import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

const STATS = [
  { label: "Ce mois", value: "20 kWh", color: Colors.light.primary },
  { label: "Mois précédent", value: "18 kWh", color: Colors.light.primaryDark },
  { label: "Cumul annuel", value: "210 kWh", color: Colors.light.dark },
];

export default function ConsommationScreen() {
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <TopBar />
      <View
        style={[styles.titleBar, { backgroundColor: Colors.light.primary }]}
      >
        <Text style={styles.titleText}>Consommation</Text>
      </View>
      <View style={styles.content}>
        {STATS.map(({ label, value, color }) => (
          <View
            key={label}
            style={[
              styles.card,
              { backgroundColor: themeColors.card, borderLeftColor: color },
            ]}
          >
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>
              {label}
            </Text>
            <Text style={[styles.value, { color }]}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  titleBar: { padding: 14 },
  titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  content: { padding: 18 },
  card: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
  },
  label: { fontSize: 14, fontWeight: "500" },
  value: { fontSize: 20, fontWeight: "900" },
});
