import { BrandColors, Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function ChangePhoneScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPhone, setCurrentPhone] = useState("+261 34 00 000 00");
  const [newPhone, setNewPhone] = useState("");

  const handleChangePhone = () => {
    if (!newPhone.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nouveau numéro.");
      return;
    }
    if (newPhone.length < 10) {
      Alert.alert("Erreur", "Numéro invalide.");
      return;
    }

    Alert.alert("Succès", "Votre numéro a été changé avec succès.", [
      { text: "OK", onPress: () => router.replace("/(drawer)/settings") },
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(drawer)/settings")}>
          <Feather name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Changer le numéro
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Info numéro actuel */}
      <View style={[styles.currentPhoneCard, { backgroundColor: themeColors.card }]}>
        <Feather name="smartphone" size={20} color={BrandColors.primary} />
        <View style={{ marginLeft: 12 }}>
          <Text style={[styles.currentLabel, { color: themeColors.textSecondary }]}>
            Numéro actuel
          </Text>
          <Text style={[styles.currentPhone, { color: themeColors.text }]}>
            {currentPhone}
          </Text>
        </View>
      </View>

      {/* Formulaire */}
      <View style={[styles.card, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.label, { color: themeColors.textSecondary }]}>
          Nouveau numéro
        </Text>
        <View style={[styles.inputRow, { backgroundColor: themeColors.background }]}>
          <Feather
            name="phone"
            size={18}
            color={themeColors.textSecondary}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={[styles.input, { color: themeColors.text }]}
            value={newPhone}
            onChangeText={setNewPhone}
            placeholder="+261 34 XX XXX XX"
            placeholderTextColor={themeColors.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
          Un code de vérification sera envoyé à votre nouveau numéro.
        </Text>
      </View>

      {/* Bouton */}
      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: BrandColors.primary }]}
        onPress={handleChangePhone}
      >
        <Text style={styles.saveText}>Modifier le numéro</Text>
      </TouchableOpacity>
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
  currentPhoneCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  currentLabel: { fontSize: 12 },
  currentPhone: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 8 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 15 },
  infoText: {
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
  },
  saveBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 20,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});