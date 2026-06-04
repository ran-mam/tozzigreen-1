import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const DATA: Record<string, { ref: string; date?: string; montant: string }[]> =
  {
    "Juin 2026": [
      { ref: "1234098", date: "10/06/2026", montant: "24 300 Ar" },
      { ref: "1234095", date: "26/06/2026", montant: "34 300 Ar" },
    ],
    "Juillet 2026": [
      { ref: "2234098", montant: "24 300 Ar" },
      { ref: "2234095", montant: "34 300 Ar" },
    ],
  };

export default function HistoriqueScreen() {
  return (
    <View style={styles.screen}>
      <TopBar />
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>Historique des facturations</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {Object.entries(DATA).map(([month, bills]) => (
          <View key={month}>
            <Text style={styles.month}>{month}</Text>
            {bills.map((b) => (
              <View key={b.ref} style={styles.card}>
                <View>
                  <Text style={styles.ref}>Ref : {b.ref}</Text>
                  {b.date && <Text style={styles.date}>{b.date}</Text>}
                </View>
                <View style={styles.right}>
                  <Text style={styles.montant}>{b.montant}</Text>
                  <TouchableOpacity style={styles.detailBtn}>
                    <Text style={styles.detailText}>Voir détail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f4f4f4" },
  titleBar: { backgroundColor: Colors.primary, padding: 14 },
  titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  content: { padding: 16, paddingBottom: 32 },
  month: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
    marginTop: 18,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ref: { fontSize: 13, fontWeight: "700", color: "#1a1a2e" },
  date: { fontSize: 11, color: "#999", marginTop: 2 },
  right: { flexDirection: "row", alignItems: "center", gap: 12 },
  montant: { fontSize: 15, fontWeight: "800", color: "#1a1a2e" },
  detailBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  detailText: { fontSize: 11, color: Colors.primary, fontWeight: "600" },
});
