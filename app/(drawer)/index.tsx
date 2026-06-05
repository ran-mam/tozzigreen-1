import TopBar from "@/components/layout/TopBar";
import PaymentModal from "@/components/modals/PaymentModal";
import SuccessModal from "@/components/modals/SuccessModal";
import StatBadge from "@/components/ui/StatBadge";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GRID = [
  { label: "Recharger", icon: "credit-card", route: "facturation" },
  { label: "Facturation", icon: "file-text", route: "historique" },
  { label: "Consommation", icon: "activity", route: "consommation" },
  { label: "Assistance", icon: "help-circle", route: "assistance" },
] as const;

export default function AccueilScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  const [payModal, setPayModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <TopBar />
      <ScrollView>
        {/* Banner */}
        <View
          style={[styles.banner, { backgroundColor: Colors.light.primary }]}
        >
          <Text style={styles.bannerTitle}>
            Bonjour Mika ! bienvenue sur votre application de facturation.
          </Text>
          <Text style={styles.bannerSub}>
            Vous devez d&apos;abord passez au remboursement
          </Text>
          <TouchableOpacity
            onPress={() => setPayModal(true)}
            style={[styles.rembBtn, { backgroundColor: Colors.light.orange }]}
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
              style={[
                styles.gridItem,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() =>
                route ? router.push(`/${route}`) : setPayModal(true)
              }
            >
              <Feather name={icon as any} size={40} color={themeColors.text} />
              <Text style={[styles.gridLabel, { color: themeColors.text }]}>
                {label}
              </Text>
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
  screen: { flex: 1 },
  banner: {
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  bannerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 4,
  },
  bannerSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 14,
  },
  rembBtn: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  rembText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  stats: {
    backgroundColor: "#CAD612",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    gap: 10,
  },
  gridItem: {
    width: "47%",
    alignItems: "center",
    padding: 34,
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
