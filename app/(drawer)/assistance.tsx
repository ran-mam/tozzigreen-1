import { BrandColors, Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AssistanceScreen() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  // ouverture et fermeture des questions FAQ
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleSend = () => {
    if (message.trim()) {
      Alert.alert(
        "Message envoyé",
        "Notre équipe vous répondra dans les plus brefs délais.",
      );
      setMessage("");
    }
  };

  const handleCall = () => {
    Linking.openURL("tel:+261340000000");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(drawer)")}>
          <Feather name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.text }]}>
          Assistance
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
        Comment pouvons-nous vous aider ?
      </Text>

      {/* Contact rapide */}
      <View style={styles.contactRow}>
        <TouchableOpacity
          style={[styles.contactBtn, { backgroundColor: themeColors.card }]}
          onPress={handleCall}
        >
          <Feather name="phone" size={32} color={BrandColors.primary} />
          <Text style={[styles.contactLabel, { color: themeColors.text }]}>
            Appeler
          </Text>
        </TouchableOpacity>

      </View>

      {/* FAQ */}
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Questions fréquentes
      </Text>
      {FAQ.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            style={[styles.faqItem, { borderBottomColor: themeColors.border }]}
            onPress={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            <Text style={[styles.faqQuestion, { color: themeColors.text }]}>
              {item.question}
            </Text>
            <Feather
              name={expandedIndex === index ? "chevron-up" : "chevron-down"}
              size={20}
              color={themeColors.chevron}
            />
          </TouchableOpacity>
          {expandedIndex === index && (
            <Text
              style={[styles.faqAnswer, { color: themeColors.textSecondary }]}
            >
              {item.answer}
            </Text>
          )}
        </View>
      ))}

      {/* SÉPARATEUR */}
      <View
        style={[styles.separator, { backgroundColor: themeColors.border }]}
      />

      {/* Message */}
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Envoyer un message
      </Text>
      <TextInput
        style={[
          styles.textArea,
          {
            backgroundColor: themeColors.card,
            color: themeColors.text,
            borderColor: themeColors.border,
          },
        ]}
        placeholder="Décrivez votre problème..."
        placeholderTextColor={themeColors.textSecondary}
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity
        style={[styles.sendBtn, { backgroundColor: BrandColors.primary }]}
        onPress={handleSend}
      >
        <Text style={styles.sendText}>Envoyer</Text>
      </TouchableOpacity>

      <Text style={[styles.footer, { color: themeColors.textSecondary }]}>
        Service disponible 24h/24 et 7j/7
      </Text>
    </ScrollView>
  );
}

const FAQ = [
  {
    question: "Comment recharger mon compteur ?",
    answer:
      "Allez dans la section Consommation, cliquez sur Recharger et choisissez votre mode de paiement (Airtel, Orange, MVola).",
  },
  {
    question: "Où trouver mon numéro de facture ?",
    answer:
      "Votre numéro de facture se trouve dans la section Facturation, en haut de votre dernière facture.",
  },
  {
    question: "Comment contacter le service client ?",
    answer:
      "Vous pouvez nous appeler au +261 34 00 000 00 ou nous écrire via WhatsApp au même numéro.",
  },
  {
    question: "Que faire en cas de coupure ?",
    answer:
      "Vérifiez d'abord votre solde dans l'application. Si le problème persiste, contactez notre service client au +261 34 00 000 00.",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  contactBtn: {
    alignItems: "center",
    gap: 12,
    padding: 24,
    borderRadius: 16,
    width: 130,
  },
  contactLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 8,
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  faqQuestion: {
    fontSize: 14,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    marginVertical: 20,
  },
  textArea: {
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
    borderWidth: 1,
  },
  sendBtn: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 40,
  },
});
