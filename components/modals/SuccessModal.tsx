import { BrandColors, Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface Props {
  visible: boolean;
  onClose: () => void;
  onViewBill: () => void;
}

export default function SuccessModal({ visible, onClose, onViewBill }: Props) {
  const { theme } = useTheme();
  const themeColors = Colors[theme];
  const isLight = theme === "light";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: isLight ? "#e8f7d9" : "#1a3d1a",
              },
            ]}
          >
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Paiement réussi
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Vous pouvez consulter votre facture
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.btn}>
            <Text style={styles.btnText}>Fermer</Text>
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
    padding: 36,
    width: 290,
    alignItems: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  check: {
    fontSize: 36,
    color: BrandColors.primary,
    fontWeight: "900",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 22,
    textAlign: "center",
  },
  btn: {
    backgroundColor: BrandColors.primary,
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