import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const NOTIFS = [
  {
    title: "Facture disponible",
    desc: "Votre facture de Juin 2026 est disponible.",
    time: "Il y a 2h",
    unread: true,
  },
  {
    title: "Paiement reçu",
    desc: "Votre paiement de 24 300 Ar a été traité avec succès.",
    time: "Il y a 1j",
    unread: false,
  },
  {
    title: "Rappel de remboursement",
    desc: "Vous avez un remboursement en attente.",
    time: "Il y a 3j",
    unread: false,
  },
];

export default function NotificationScreen() {
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <TopBar />
      <View
        style={[styles.titleBar, { backgroundColor: Colors.light.primary }]}
      >
        <Text style={styles.titleText}>Notifications</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {NOTIFS.map((n, i) => (
          <View
            key={i}
            style={[
              styles.card,
              { backgroundColor: themeColors.card },
              n.unread && {
                backgroundColor: theme === "light" ? "#f0f9e5" : "#1a2a0f",
                borderLeftColor: Colors.light.primary,
              },
            ]}
          >
            <View
              style={[
                styles.dot,
                { backgroundColor: themeColors.textSecondary },
                n.unread && { backgroundColor: Colors.light.primary },
              ]}
            />
            <View style={styles.body}>
              <Text style={[styles.title, { color: themeColors.text }]}>
                {n.title}
              </Text>
              <Text style={[styles.desc, { color: themeColors.textSecondary }]}>
                {n.desc}
              </Text>
              <Text style={[styles.time, { color: themeColors.textSecondary }]}>
                {n.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  titleBar: { padding: 14 },
  titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  content: { padding: 16, paddingBottom: 32 },
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    gap: 12,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  body: { flex: 1 },
  title: { fontSize: 13, fontWeight: "700", marginBottom: 3 },
  desc: { fontSize: 12, lineHeight: 18, marginBottom: 6 },
  time: { fontSize: 11 },
});
