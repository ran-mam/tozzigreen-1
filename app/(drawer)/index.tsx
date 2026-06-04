import TopBar from "@/components/layout/TopBar";
import PaymentModal from "@/components/modals/PaymentModal";
import SuccessModal from "@/components/modals/SuccessModal";
import StatBadge from "@/components/ui/StatBadge";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
// import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GRID = [
  { label: "Recharger", icon: "credit-card", route: null },
  { label: "Facturation", icon: "file-text", route: "facturation" },
  { label: "Consommation", icon: "activity", route: "consommation" },
  { label: "Assistance", icon: "help-circle", route: "assistance" },
] as const;

export default function AccueilScreen() {
  const router = useRouter();
  const [payModal, setPayModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  return (
    <View style={styles.screen}>
      <TopBar />
      <ScrollView>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Bonjour Mika ! bienvenue sur votre application de facturation.
          </Text>
          <Text style={styles.bannerSub}>
            Vous devez d&aposabord passez au remboursement
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/facturation")}
            style={styles.rembBtn}
          >
            <Text style={styles.rembText}>Rembourser</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <StatBadge label="Consommation du mois" value="20 kwh" />
          <StatBadge label="Prix du kwh" value="2 000 Ar" />
          <StatBadge label="Montant" value="40 000 Ar" last />
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {GRID.map(({ label, icon, route }) => (
            <TouchableOpacity
              key={label}
              style={styles.gridItem}
              activeOpacity={0.8}
              onPress={() =>
                route ? router.push(`/${route}`) : setPayModal(true)
              }
            >
              <Feather name={icon as any} size={40} color="#1a1a2e" />
              <Text style={styles.gridLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <PaymentModal
        visible={payModal}
        amount="300 000 Ar"
        onClose={() => setPayModal(false)}
        onPay={() => {
          setPayModal(false);
          setSuccessModal(true);
        }}
      />
      <SuccessModal
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        onViewBill={() => {
          setSuccessModal(false);
          router.push("/historique");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f4f4f4" },
  banner: {
    backgroundColor: Colors.primary,
    padding: 20,
    alignItems: "center",
  },
  bannerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  bannerSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 14,
  },
  rembBtn: {
    backgroundColor: Colors.orange,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  rembText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  stats: {
    backgroundColor: Colors.primaryDark,
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    gap: 10,
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 34,
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  gridLabel: { fontSize: 14, fontWeight: "600", color: "#1a1a2e" },
});
