import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PrivacyScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(drawer)/settings")}>
          <Feather name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Politique de confidentialité
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.card, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.section, { color: themeColors.text }]}>
          Collecte des données
        </Text>
        <Text style={[styles.text, { color: themeColors.textSecondary }]}>
          Nous collectons les informations nécessaires à la fourniture de nos
          services, notamment votre numéro de consommateur, vos données de
          consommation et vos informations de contact.
        </Text>

        <Text style={[styles.section, { color: themeColors.text }]}>
          Utilisation des données
        </Text>
        <Text style={[styles.text, { color: themeColors.textSecondary }]}>
          Vos données sont utilisées pour le calcul de votre facture, le suivi
          de votre consommation et l&apos;envoi d&apos;alertes importantes
          concernant votre compte.
        </Text>

        <Text style={[styles.section, { color: themeColors.text }]}>
          Protection des données
        </Text>
        <Text style={[styles.text, { color: themeColors.textSecondary }]}>
          Nous mettons en œuvre des mesures de sécurité techniques pour protéger
          vos données contre tout accès non autorisé.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  card: { borderRadius: 12, padding: 20, marginHorizontal: 20 },
  section: { fontSize: 16, fontWeight: "700", marginTop: 16, marginBottom: 8 },
  text: { fontSize: 14, lineHeight: 22 },
});
