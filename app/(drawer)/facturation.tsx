import TopBar from "@/components/layout/TopBar";
import SuccessModal from "@/components/modals/SuccessModal";
import AirtelLogo from "@/components/payment/AirtelLogo";
import MVolaLogo from "@/components/payment/MVolaLogo";
import OrangeLogo from "@/components/payment/OrangeLogo";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const ROWS = [
  { label: "Quantité", value: "10" },
  { label: "Montant HT", value: "20000" },
  { label: "TVA", value: "4000" },
  { label: "FNE", value: "100" },
  { label: "Taxe communale", value: "200" },
];

export default function FacturationScreen() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [prixKwh, setPrixKwh] = useState("2000");
  const [rowValues, setRowValues] = useState(ROWS.map((r) => r.value));
  const [total, setTotal] = useState("24300");

  return (
    <View style={styles.screen}>
      <TopBar />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Prix du kwh</Text>
          <View style={styles.headerInputWrapper}>
            <TextInput
              style={styles.headerValue}
              value={prixKwh}
              onChangeText={(text) => setPrixKwh(text.replace(/[^0-9]/g, ""))}
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
            <Text style={styles.headerUnit}>Ar</Text>
          </View>
        </View>

        <View style={styles.body}>
          {ROWS.map(({ label }, index) => (
            <View key={label} style={styles.row}>
              <Text style={styles.rowLabel}>{label}</Text>
              <View style={styles.rowInputWrapper}>
                <TextInput
                  style={styles.rowValue}
                  value={rowValues[index]}
                  onChangeText={(text) =>
                    setRowValues((prev) =>
                      prev.map((v, i) =>
                        i === index ? text.replace(/[^0-9]/g, "") : v
                      )
                    )
                  }
                  keyboardType="numeric"
                />
                <Text style={styles.rowUnit}>Ar</Text>
              </View>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total à payer</Text>
            <View style={styles.rowInputWrapper}>
              <TextInput
                style={styles.totalValue}
                value={total}
                onChangeText={(text) => setTotal(text.replace(/[^0-9]/g, ""))}
                keyboardType="numeric"
              />
              <Text style={styles.totalUnit}>Ar</Text>
            </View>
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
  headerInputWrapper: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 4,
  },
  headerValue: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 24,
    padding: 0,
  },
  headerUnit: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 2,
  },
  body: { padding: 18 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowLabel: { fontSize: 13, color: "#666" },
  rowInputWrapper: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  rowValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a2e",
    padding: 0,
    minWidth: 60,
    textAlign: "right",
  },
  rowUnit: { fontSize: 13, fontWeight: "600", color: "#1a1a2e" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingTop: 16,
  },
  totalLabel: { fontSize: 13, color: "#666", fontWeight: "600" },
  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1a1a2e",
    padding: 0,
    minWidth: 80,
    textAlign: "right",
  },
  totalUnit: { fontSize: 15, fontWeight: "700", color: "#1a1a2e" },
  payment: { padding: 18 },
  paymentLabel: { fontSize: 13, color: "#555", marginBottom: 25, textAlign: "center" },
  logos: { flexDirection: "row", gap: 10 },
});
