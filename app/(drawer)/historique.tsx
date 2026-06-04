import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
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
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <TopBar />
      <View
        style={[styles.titleBar, { backgroundColor: Colors.light.primary }]}
      >
        <Text style={styles.titleText}>Historique des facturations</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {Object.entries(DATA).map(([month, bills]) => (
          <View key={month}>
            <Text style={[styles.month, { color: themeColors.textSecondary }]}>
              {month}
            </Text>
            {bills.map((b) => (
              <View
                key={b.ref}
                style={[styles.card, { backgroundColor: themeColors.card }]}
              >
                <View>
                  <Text style={[styles.ref, { color: themeColors.text }]}>
                    Ref : {b.ref}
                  </Text>
                  {b.date && (
                    <Text
                      style={[
                        styles.date,
                        { color: themeColors.textSecondary },
                      ]}
                    >
                      {b.date}
                    </Text>
                  )}
                </View>
                <View style={styles.right}>
                  <Text style={[styles.montant, { color: themeColors.text }]}>
                    {b.montant}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.detailBtn,
                      { borderColor: Colors.light.primary },
                    ]}
                    onPress={() =>
                      router.push({
                        pathname: "/(drawer)/historique_detail" as any,
                        params: { ref: b.ref },
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.detailText,
                        { color: Colors.light.primary },
                      ]}
                    >
                      Voir détail
                    </Text>
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
  screen: { flex: 1 },
  titleBar: { padding: 14 },
  titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  content: { padding: 16, paddingBottom: 32 },
  month: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  card: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ref: { fontSize: 13, fontWeight: "700" },
  date: { fontSize: 11, marginTop: 2 },
  right: { flexDirection: "row", alignItems: "center", gap: 12 },
  montant: { fontSize: 15, fontWeight: "800" },
  detailBtn: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  detailText: { fontSize: 11, fontWeight: "600" },
});
