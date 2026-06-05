import AirtelLogo from "@/components/payment/AirtelLogo";
import MVolaLogo from "@/components/payment/MVolaLogo";
import OrangeLogo from "@/components/payment/OrangeLogo";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaymentMethod } from "@/types/payments";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  amount: string;
  onClose: () => void;
  onPay: (method: PaymentMethod) => void;
}

export default function PaymentModal({
  visible,
  amount,
  onClose,
  onPay,
}: Props) {
  const { theme } = useTheme();
  const themeColors = Colors[theme];
  const isDark = theme === "dark";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          {/* Icon */}
          <View style={styles.iconWrap}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isDark
                    ? "rgba(52,211,153,0.15)"
                    : "#e8f7d9",
                },
              ]}
            >
              {/* card */}
              <Text style={styles.cardEmoji}>💳</Text>
            </View>
          </View>

          <Text style={[styles.label, { color: themeColors.textSecondary }]}>
            Paiement
          </Text>
          <Text style={[styles.amount, { color: themeColors.text }]}>
            {amount}
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Veuillez choisir le moyen de paiement
          </Text>

          <View style={styles.logos}>
            <OrangeLogo size="sm" onPress={() => onPay("orange")} />
            <MVolaLogo size="sm" onPress={() => onPay("mvola")} />
            <AirtelLogo size="sm" onPress={() => onPay("airtel")} />
          </View>

          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.cancelBtn,
              { borderColor: isDark ? "#555" : "#ddd" },
            ]}
          >
            <Text style={[styles.cancelText, { color: themeColors.textSecondary }]}>
              Annuler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 18,
    padding: 28,
    width: 300,
    alignItems: "center",
  },
  iconWrap: {
    marginBottom: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: { fontSize: 28 },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
  },
  amount: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: "center",
  },
  logos: {
    flexDirection: "row",
    gap: 25,
    width: "100%",
    marginVertical: 20,
  },
  cancelBtn: {
    marginTop: 30,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 13,
  },
});