import { getFactureByRef } from "@/components/data/historique";
import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";

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

  const facture = ref ? getFactureByRef(ref) : undefined;

  if (!facture) {
    return (
      <View style={styles.screen}>
        <TopBar />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Facture introuvable.</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>← Retour à l&apos;historique</Text>
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
    <View style={styles.screen}>
      <TopBar />
      <ScrollView>
        {/* En-tête de la facture */}
        <View style={styles.header}>
          <Text style={styles.headerRef}>Ref : {facture.ref}</Text>
          {facture.date && (
            <Text style={styles.headerDate}>{facture.date}</Text>
          )}
        </View>

        {/* Montant total */}
        <View style={styles.totalBanner}>
          <Text style={styles.totalLabel}>Montant total</Text>
          <Text style={styles.totalValue}>{facture.montant}</Text>
        </View>

        {/* Détail de la décomposition */}
        <View style={styles.body}>
          {lignes.map(({ label, value }) => (
            <View key={label} style={styles.row}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Boutons actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backBtnText}>Retour à l&apos;historique</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payBtn}>
            <Text style={styles.payBtnText}>Payer maintenant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f4f4f4" },
  header: {
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.primaryDark,
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
    backgroundColor: "#fff",
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
    borderBottomColor: "#f0f0f0",
  },
  rowLabel: { fontSize: 13, color: "#666" },
  rowValue: { fontSize: 15, fontWeight: "700", color: "#1a1a2e" },
  actions: {
    padding: 18,
    gap: 12,
  },
  backBtn: {
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  backBtnText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  payBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  payBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
  // États vides / erreurs
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 12,
  },
  backLink: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});