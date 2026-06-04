import { getFactureByRef } from "@/components/data/historique";
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
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  const facture = ref ? getFactureByRef(ref) : undefined;

  if (!facture) {
    return (
      <View
        style={[styles.screen, { backgroundColor: themeColors.background }]}
      >
        <TopBar />
        <View style={styles.errorContainer}>
          <Text
            style={[styles.errorText, { color: themeColors.textSecondary }]}
          >
            Facture introuvable.
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backLink, { color: Colors.light.primary }]}>
              ← Retour à l&apos;historique
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { details } = facture;

  const lignes = [
    { label: "Quantité", value: `${details.quantite}` },
    {
      label: "Prix unitaire",
      value: `${details.prixUnitaire.toLocaleString()} Ar`,
    },
    { label: "Montant HT", value: `${details.montantHT.toLocaleString()} Ar` },
    { label: "TVA", value: `${details.tva.toLocaleString()} Ar` },
    { label: "FNE", value: `${details.fne.toLocaleString()} Ar` },
    {
      label: "Taxe communale",
      value: `${details.taxeCommunale.toLocaleString()} Ar`,
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <TopBar />
      <ScrollView>
        {/* En-tête de la facture */}
        <View
          style={[styles.header, { backgroundColor: Colors.light.primary }]}
        >
          <Text style={styles.headerRef}>Ref : {facture.ref}</Text>
          {facture.date && (
            <Text style={styles.headerDate}>{facture.date}</Text>
          )}
        </View>

        {/* Montant total */}
        <View
          style={[
            styles.totalBanner,
            { backgroundColor: Colors.light.primaryDark },
          ]}
        >
          <Text style={styles.totalLabel}>Montant total</Text>
          <Text style={styles.totalValue}>{facture.montant}</Text>
        </View>

        {/* Détail de la décomposition */}
        <View style={[styles.body, { backgroundColor: themeColors.card }]}>
          {lignes.map(({ label, value }) => (
            <View
              key={label}
              style={[styles.row, { borderBottomColor: themeColors.border }]}
            >
              <Text
                style={[styles.rowLabel, { color: themeColors.textSecondary }]}
              >
                {label}
              </Text>
              <Text style={[styles.rowValue, { color: themeColors.text }]}>
                {value}
              </Text>
            </View>
          ))}
        </View>

        {/* Boutons actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.backBtn, { borderColor: Colors.light.primary }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.backBtnText, { color: Colors.light.primary }]}>
              Retour à l&apos;historique
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.payBtn, { backgroundColor: Colors.light.primary }]}
          >
            <Text style={styles.payBtnText}>Payer maintenant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    padding: 20,
    alignItems: "flex-start",
  },
  headerRef: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 4,
  },
  headerDate: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  totalBanner: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontWeight: "600",
  },
  totalValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },
  body: {
    padding: 18,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rowLabel: { fontSize: 13 },
  rowValue: { fontSize: 15, fontWeight: "700" },
  actions: {
    padding: 18,
    gap: 12,
  },
  backBtn: {
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  backBtnText: {
    fontWeight: "600",
    fontSize: 14,
  },
  payBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  payBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 12,
  },
  backLink: {
    fontWeight: "600",
    fontSize: 15,
  },
});
