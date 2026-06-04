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

export default function TermsScreen() {
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
          Conditions d&apos;utilisation
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.card, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.section, { color: themeColors.text }]}>
          1. Acceptation des conditions
        </Text>
        <Text style={[styles.text, { color: themeColors.textSecondary }]}>
          En utilisant cette application, vous acceptez les présentes conditions
          d&apos;utilisation.
        </Text>

        <Text style={[styles.section, { color: themeColors.text }]}>
          2. Services fournis
        </Text>
        <Text style={[styles.text, { color: themeColors.textSecondary }]}>
          L&apos;application permet le rechargement de compteur électrique, la
          consultation de factures et le suivi de consommation.
        </Text>

        <Text style={[styles.section, { color: themeColors.text }]}>
          3. Responsabilités
        </Text>
        <Text style={[styles.text, { color: themeColors.textSecondary }]}>
          L&apos;utilisateur est responsable de l&apos;exactitude des
          informations fournies. TozziGreen ne peut être tenu responsable en cas
          d&apos;erreur de saisie.
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "700"
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20
  },
  section: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    lineHeight: 22
  },
});
