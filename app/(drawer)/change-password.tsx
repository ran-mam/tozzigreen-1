import { BrandColors, Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
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

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères.",
      );
      return;
    }

    Alert.alert("Succès", "Votre mot de passe a été changé avec succès.", [
      { text: "OK", onPress: () => router.replace("/(drawer)/settings") },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(drawer)/settings")}>
          <Feather name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Changer le mot de passe
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Formulaire */}
      <View style={[styles.card, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.label, { color: themeColors.textSecondary }]}>
          Mot de passe actuel
        </Text>
        <View
          style={[styles.inputRow, { backgroundColor: themeColors.background }]}
        >
          <Feather
            name="lock"
            size={18}
            color={themeColors.textSecondary}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={[styles.input, { color: themeColors.text }]}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Votre mot de passe actuel"
            placeholderTextColor={themeColors.textSecondary}
            secureTextEntry
          />
        </View>

        <Text style={[styles.label, { color: themeColors.textSecondary }]}>
          Nouveau mot de passe
        </Text>
        <View
          style={[styles.inputRow, { backgroundColor: themeColors.background }]}
        >
          <Feather
            name="key"
            size={18}
            color={themeColors.textSecondary}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={[styles.input, { color: themeColors.text }]}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Nouveau mot de passe"
            placeholderTextColor={themeColors.textSecondary}
            secureTextEntry
          />
        </View>

        <Text style={[styles.label, { color: themeColors.textSecondary }]}>
          Confirmer le mot de passe
        </Text>
        <View
          style={[styles.inputRow, { backgroundColor: themeColors.background }]}
        >
          <Feather
            name="check-circle"
            size={18}
            color={themeColors.textSecondary}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={[styles.input, { color: themeColors.text }]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmer le nouveau mot de passe"
            placeholderTextColor={themeColors.textSecondary}
            secureTextEntry
          />
        </View>
      </View>

      {/* Bouton */}
      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: BrandColors.primary }]}
        onPress={handleChangePassword}
      >
        <Text style={styles.saveText}>Modifier le mot de passe</Text>
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
  card: {
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 15 },
  saveBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 20,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
