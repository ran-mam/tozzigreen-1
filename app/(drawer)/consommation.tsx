import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

const STATS = [
  { label: "Ce mois", value: "20 kWh", color: Colors.primary },
  { label: "Mois précédent", value: "18 kWh", color: Colors.primaryDark },
  { label: "Cumul annuel", value: "210 kWh", color: "#1a1a2e" },
];

export default function ConsommationScreen() {
  return (
    <View style={styles.screen}>
      <TopBar />
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>Consommation</Text>
      </View>
      <View style={styles.content}>
        {STATS.map(({ label, value, color }) => (
          <View key={label} style={[styles.card, { borderLeftColor: color }]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, { color }]}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f4f4f4" },
  titleBar: { backgroundColor: Colors.primary, padding: 14 },
  titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  content: { padding: 18 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
  },
  label: { fontSize: 14, color: "#555", fontWeight: "500" },
  value: { fontSize: 20, fontWeight: "900" },
});
