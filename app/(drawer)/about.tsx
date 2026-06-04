import { BrandColors, Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AboutScreen() {
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
          À propos
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.card, { backgroundColor: themeColors.card }]}>
        <Image
          source={require("@/assets/images/tozzigreen-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.version, { color: themeColors.textSecondary }]}>
          Version 1.0.0
        </Text>
        <Text
          style={[styles.description, { color: themeColors.textSecondary }]}
        >
          Application de facturation et de gestion de consommation
          d&apos;électricité. Rechargez votre compteur, suivez votre
          consommation et gérez votre compte en toute simplicité.
        </Text>
        <Text style={[styles.copyright, { color: themeColors.textSecondary }]}>
          © 2026 TozziGreen. Tous droits réservés.
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
  card: {
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 20,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: BrandColors.primary,
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  copyright: {
    fontSize: 12,
  },
});
