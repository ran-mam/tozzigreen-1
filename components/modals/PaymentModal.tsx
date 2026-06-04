import AirtelLogo from "@/components/payment/AirtelLogo";
import MVolaLogo from "@/components/payment/MVolaLogo";
import OrangeLogo from "@/components/payment/OrangeLogo";
import { PaymentMethod } from "@/types/payment";
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
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Icon */}
          <View style={styles.iconWrap}>
            <View style={styles.iconCircle}>
              {/* card SVG placeholder */}
              <Text style={styles.cardEmoji}>💳</Text>
            </View>
          </View>

          <Text style={styles.label}>Paiement</Text>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.subtitle}>
            Veuillez choisir le moyen de paiement
          </Text>

          <View style={styles.logos}>
            <OrangeLogo size="sm" onPress={() => onPay("orange")} />
            <MVolaLogo size="sm" onPress={() => onPay("mvola")} />
            <AirtelLogo size="sm" onPress={() => onPay("airtel")} />
          </View>

          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Annuler</Text>
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
    backgroundColor: "#fff",
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
    backgroundColor: "#e8f7d9",
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: { fontSize: 28 },
  label: {
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
    marginBottom: 4,
  },
  amount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a2e",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },
  logos: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  cancelBtn: {
    marginTop: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#888",
    fontSize: 13,
  },
});
