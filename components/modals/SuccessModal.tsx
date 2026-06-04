import { Colors } from "@/constants/Colors";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onViewBill: () => void;
}

export default function SuccessModal({ visible, onClose, onViewBill }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={styles.title}>Paiement réussi</Text>
          <Text style={styles.subtitle}>
            Vous pouvez consulter votre facture
          </Text>
          <TouchableOpacity onPress={onViewBill} style={styles.btn}>
            <Text style={styles.btnText}>Cliquez ici</Text>
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
    padding: 36,
    width: 290,
    alignItems: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#e8f7d9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  check: {
    fontSize: 36,
    color: Colors.primary,
    fontWeight: "900",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a2e",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 22,
    textAlign: "center",
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 13,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
