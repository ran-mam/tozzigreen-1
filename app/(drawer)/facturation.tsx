import TopBar from "@/components/layout/TopBar";
import SuccessModal from "@/components/modals/SuccessModal";
import AirtelLogo from "@/components/payment/AirtelLogo";
import MVolaLogo from "@/components/payment/MVolaLogo";
import OrangeLogo from "@/components/payment/OrangeLogo";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ROWS = [
  { label: "Quantité", value: "10" },
  { label: "Montant HT", value: "20 000 Ar" },
  { label: "TVA", value: "4 000 Ar" },
  { label: "FNE", value: "100 Ar" },
  { label: "Taxe communale", value: "200 Ar" },
];

export default function FacturationScreen() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  return (
    <View style={styles.screen}>
      <TopBar />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Prix du kwh</Text>
          <Text style={styles.headerValue}>2 000 Ar</Text>
        </View>

        <View style={styles.body}>
          {ROWS.map(({ label, value }) => (
            <View key={label} style={styles.row}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total à payer</Text>
            <Text style={styles.totalValue}>24 300 Ar</Text>
          </View>
        </View>

        <View style={styles.payment}>
          <Text style={styles.paymentLabel}>
            Veuillez choisir le moyen de paiement
          </Text>
          <View style={styles.logos}>
            <OrangeLogo onPress={() => setSuccess(true)} />
            <MVolaLogo onPress={() => setSuccess(true)} />
            <AirtelLogo onPress={() => setSuccess(true)} />
          </View>
        </View>
      </ScrollView>

      <SuccessModal
        visible={success}
        onClose={() => setSuccess(false)}
        onViewBill={() => {
          setSuccess(false);
          router.push("/historique");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f4f4f4" },
  header: { backgroundColor: Colors.primary, padding: 16 },
  headerLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  headerValue: { color: "#fff", fontWeight: "900", fontSize: 24 },
  body: { padding: 18 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowLabel: { fontSize: 13, color: "#666" },
  rowValue: { fontSize: 15, fontWeight: "700", color: "#1a1a2e" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  totalLabel: { fontSize: 13, color: "#666", fontWeight: "600" },
  totalValue: { fontSize: 20, fontWeight: "900", color: "#1a1a2e" },
  payment: { padding: 18 },
  paymentLabel: { fontSize: 13, color: "#555", marginBottom: 14 },
  logos: { flexDirection: "row", gap: 10 },
});
