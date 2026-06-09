import { BrandColors, Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AssistanceScreen() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"faq" | "form">("faq");
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  // ouverture et fermeture des questions FAQ
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleSend = () => {
    if (!recipient.trim()) {
      Alert.alert("Erreur", "Veuillez entrer une destinataire");
      return;
    }

    if (!subject.trim()) {
      Alert.alert("Erreur", "Veuillez entrer l'objet du message");
      return;
    }

    if (!message.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre message");
      return;
    }

    if (message.trim().length < 10) {
      Alert.alert(
        "Erreur",
        "Le message doit contenir au minimum 10 caractères",
      );
      return;
    }

    // Submit to API
    Alert.alert(
      "Message envoyé",
      "Votre message a été envoyé avec succès. Vous pouvez suivre son statut dans l'onglet Support.",
    );
    setRecipient("");
    setSubject("");
    setMessage("");
  };

  const handleCall = () => {
    Linking.openURL("tel:+261340000000");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        keyboardShouldPersistTaps="handled"
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

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === "faq" ? BrandColors.primary : themeColors.card,
                borderBottomColor:
                  activeTab === "faq" ? BrandColors.primary : "transparent",
              },
            ]}
            onPress={() => setActiveTab("faq")}
          >
            <Feather
              name="help-circle"
              size={18}
              color={activeTab === "faq" ? "white" : themeColors.textSecondary}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "faq" ? "white" : themeColors.textSecondary,
                },
              ]}
            >
              FAQ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === "form" ? BrandColors.primary : themeColors.card,
                borderBottomColor:
                  activeTab === "form" ? BrandColors.primary : "transparent",
              },
            ]}
            onPress={() => setActiveTab("form")}
          >
            <Feather
              name="send"
              size={18}
              color={activeTab === "form" ? "white" : themeColors.textSecondary}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "form" ? "white" : themeColors.textSecondary,
                },
              ]}
            >
              Formulaire
            </Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              <Text
                style={[styles.subtitle, { color: themeColors.textSecondary }]}
              >
                Comment pouvons-nous vous aider ?
              </Text>

              {/* Contact rapide */}
              <View style={styles.contactRow}>
                <TouchableOpacity
                  style={[
                    styles.contactBtn,
                    { backgroundColor: themeColors.card },
                  ]}
                  onPress={handleCall}
                >
                  <Feather name="phone" size={32} color={BrandColors.primary} />
                  <Text
                    style={[styles.contactLabel, { color: themeColors.text }]}
                  >
                    Appeler
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Questions fréquentes
              </Text>
              {FAQ.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      styles.faqItem,
                      { borderBottomColor: themeColors.border },
                    ]}
                    onPress={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                  >
                    <Text
                      style={[styles.faqQuestion, { color: themeColors.text }]}
                    >
                      {item.question}
                    </Text>
                    <Feather
                      name={
                        expandedIndex === index ? "chevron-up" : "chevron-down"
                      }
                      size={20}
                      color={themeColors.chevron}
                    />
                  </TouchableOpacity>
                  {expandedIndex === index && (
                    <Text
                      style={[
                        styles.faqAnswer,
                        { color: themeColors.textSecondary },
                      ]}
                    >
                      {item.answer}
                    </Text>
                  )}
                </View>
              ))}

              <Text style={[styles.footer, { color: themeColors.textSecondary }]}>
                Service disponible 24h/24 et 7j/7
              </Text>
            </View>
          </View>
        )}

        {/* Form Tab */}
        {activeTab === "form" && (
          <View>
            {/* Help Icon and Message */}
            <View style={styles.helpSection}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: BrandColors.primary + "15" },
                ]}
              >
                <Feather name="mail" size={40} color={BrandColors.primary} />
              </View>
              <Text style={[styles.helpMessage, { color: themeColors.text }]}>
                Envoyez un message
              </Text>
              <Text
                style={[
                  styles.helpSubtitle,
                  { color: themeColors.textSecondary },
                ]}
              >
                Contactez-nous directement
              </Text>
            </View>

            {/* Destinataire */}
            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Destinataire
              </Text>
              <TextInput
                style={[
                  styles.messageInput,
                  {
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    borderColor: themeColors.border,
                  },
                ]}
                placeholder="Entrez une destinataire"
                placeholderTextColor={themeColors.textSecondary}
                value={recipient}
                onChangeText={setRecipient}
              />
            </View>

            {/* Objet */}
            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Objet
              </Text>
              <TextInput
                style={[
                  styles.messageInput,
                  {
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    borderColor: themeColors.border,
                  },
                ]}
                placeholder="Sujet du message"
                placeholderTextColor={themeColors.textSecondary}
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            {/* Contenu du message */}
            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Contenu du message
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: themeColors.card,
                    color: themeColors.text,
                    borderColor: themeColors.border,
                  },
                ]}
                placeholder="Écrivez votre message ici..."
                placeholderTextColor={themeColors.textSecondary}
                multiline={true}
                numberOfLines={6}
                value={message}
                onChangeText={setMessage}
                textAlignVertical="top"
              />

              <Text
                style={[
                  styles.characterCount,
                  { color: themeColors.textSecondary },
                ]}
              >
                {message.length} / 1000 caractères
              </Text>
            </View>

            {/* Info Box */}
            <View
              style={[
                styles.infoBox,
                { backgroundColor: BrandColors.primary + "10" },
              ]}
            >
              <Feather name="info" size={20} color={BrandColors.primary} />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: BrandColors.primary },
              ]}
              onPress={handleSend}
            >
              <Feather name="send" size={20} color="white" />
              <Text style={styles.submitButtonText}>Envoyer le message</Text>
            </TouchableOpacity>

            <View style={{ height: 24 }} />

            <Text style={[styles.infoText, { color: themeColors.text }]}>
              Nous répondons à tous les messages dans les 24 heures
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
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
    marginTop: 40,
    marginBottom: 40,
  },
  /* Form Styles */
  helpSection: {
    alignItems: "center",
    marginBottom: 32,
    paddingVertical: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  helpMessage: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  helpSubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: "500",
  },
  messageInput: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    marginBottom: 4,
  },
  textInput: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    minHeight: 120,
    maxHeight: 200,
  },
  characterCount: {
    fontSize: 12,
    marginTop: 8,
    alignSelf: "flex-end",
  },
  infoBox: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 12,
    display: "none",
  },
  infoText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});