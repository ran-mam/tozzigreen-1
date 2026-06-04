import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
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
  return (
    <View style={styles.screen}>
      <TopBar />
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>Notifications</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {NOTIFS.map((n, i) => (
          <View key={i} style={[styles.card, n.unread && styles.unread]}>
            <View style={[styles.dot, n.unread && styles.dotActive]} />
            <View style={styles.body}>
              <Text style={styles.title}>{n.title}</Text>
              <Text style={styles.desc}>{n.desc}</Text>
              <Text style={styles.time}>{n.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f4f4f4" },
  titleBar: { backgroundColor: Colors.primary, padding: 14 },
  titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  content: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    gap: 12,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  unread: { backgroundColor: "#f0f9e5", borderLeftColor: Colors.primary },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginTop: 6,
  },
  dotActive: { backgroundColor: Colors.primary },
  body: { flex: 1 },
  title: { fontSize: 13, fontWeight: "700", color: "#1a1a2e", marginBottom: 3 },
  desc: { fontSize: 12, color: "#666", lineHeight: 18, marginBottom: 6 },
  time: { fontSize: 11, color: "#aaa" },
});
