import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FactureDetailScreen() {
  const { order } = useLocalSearchParams<{ order: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  // Convertir le JSON string en objet
  const facture = order ? JSON.parse(order) : null;

  if (!facture) {
    return (
      <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
        <TopBar />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: themeColors.textSecondary }]}>
            Facture introuvable.
          </Text>
          <TouchableOpacity onPress={() => router.push('/historique' as any)}>
            <Text style={[styles.backLink, { color: Colors.light.primary }]}>
              ← Retour à l&apos;historique
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <TopBar />
      <ScrollView>
        {/* En-tête */}
        <View style={[styles.header, { backgroundColor: Colors.light.primary }]}>
          <Text style={styles.headerRef}>N° {facture.bill_no}</Text>
          <Text style={styles.headerDate}>{facture.bill_date}</Text>
        </View>

        {/* Montant */}
        <View style={[styles.totalBanner, { backgroundColor: Colors.light.primaryDark }]}>
          <Text style={styles.totalLabel}>Montant payé</Text>
          <Text style={styles.totalValue}>{facture.account_pay_amount} Ar</Text>
        </View>

        {/* Détails */}
        <View style={[styles.body, { backgroundColor: themeColors.card }]}>
          <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Énergie</Text>
            <Text style={[styles.rowValue, { color: themeColors.text }]}>{facture.total_resource} kWh</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Montant énergie</Text>
            <Text style={[styles.rowValue, { color: themeColors.text }]}>{facture.energy_amount} Ar</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Montant HT</Text>
            <Text style={[styles.rowValue, { color: themeColors.text }]}>{facture.amount} Ar</Text>
          </View>
          <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Taxes</Text>
            <Text style={[styles.rowValue, { color: themeColors.text }]}>{facture.tax_amount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: themeColors.textSecondary }]}>Total payé</Text>
            <Text style={[styles.totalValueText, { color: themeColors.text }]}>{facture.account_pay_amount} Ar</Text>
          </View>
        </View>

        {/* Retour */}
        <TouchableOpacity
          style={[styles.backBtn, { borderColor: Colors.light.primary }]}
          onPress={() => router.push('/historique' as any)}
        >
          <Text style={[styles.backBtnText, { color: Colors.light.primary }]}>
            ← Retour à l&apos;historique
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { padding: 20, alignItems: "flex-start" },
  headerRef: { color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 4 },
  headerDate: { color: "rgba(255,255,255,0.8)", fontSize: 13 },
  totalBanner: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: "600" },
  totalValue: { color: "#fff", fontSize: 24, fontWeight: "900" },
  body: {
    padding: 18,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rowLabel: { fontSize: 13 },
  rowValue: { fontSize: 15, fontWeight: "700" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  totalValueText: { fontSize: 20, fontWeight: "900" },
  backBtn: {
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 18,
    marginTop: 20,
  },
  backBtnText: { fontWeight: "600", fontSize: 14 },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  errorText: { fontSize: 16, marginBottom: 12 },
  backLink: { fontWeight: "600", fontSize: 15 },
});