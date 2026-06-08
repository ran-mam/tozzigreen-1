import { BrandColors, Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onViewBill: () => void;
  tokenCode?: string;
}

export default function SuccessModal({ visible, onClose, onViewBill, tokenCode }: Props) {
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
              { backgroundColor: isLight ? "#e8f7d9" : "#1a3d1a" },
            ]}
          >
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Paiement réussi
          </Text>

          {/* Code de recharge */}
          {tokenCode && (
            <View style={styles.tokenBox}>
              <Text style={[styles.tokenLabel, { color: themeColors.textSecondary }]}>
                Code de recharge
              </Text>
              <Text style={styles.tokenCode}>
                {tokenCode.replace(/(\d{4})/g, '$1 ').trim()}
              </Text>
            </View>
          )}

          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            {tokenCode
              ? 'Tapez ce code sur votre compteur électrique'
              : 'Vous pouvez consulter votre facture'
            }
          </Text>
          <TouchableOpacity onPress={onViewBill} style={styles.btn}>
            <Text style={styles.btnText}>Voir la facture</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={[styles.closeText, { color: themeColors.textSecondary }]}>
              Fermer
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
  tokenBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  tokenLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  tokenCode: {
    fontSize: 22,
    fontWeight: '900',
    color: BrandColors.primary,
    letterSpacing: 2,
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
  closeBtn: {
    marginTop: 12,
    paddingVertical: 8,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '500',
  },
});