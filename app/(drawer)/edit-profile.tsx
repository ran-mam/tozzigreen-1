import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    BackHandler,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditProfileScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const themeColors = Colors[theme];

    // Gestion du bouton retour Android
    useEffect(() => {
        const backAction = () => {
            router.replace("/(drawer)/settings");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction,
        );

        return () => backHandler.remove();
    }, [router]);

    const [name, setName] = useState("Mika");
    const [email, setEmail] = useState("mika@example.com");
    const [phone, setPhone] = useState("+261 34 00 000 00");
    const [address, setAddress] = useState("Antananarivo, Madagascar");

    // Sauvegarde du profil
    const handleSave = () => {
        Alert.alert("Profil mis à jour", "Vos informations ont été enregistrées.", [
            { text: "OK", onPress: () => router.replace("/(drawer)/settings") },
        ]);
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: themeColors.background }]}
            keyboardShouldPersistTaps="handled"
        >
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace("/(drawer)/settings")}>
                    <Feather name="arrow-left" size={24} color={themeColors.text} />
                </TouchableOpacity>

                <Text style={[styles.headerTitle, { color: themeColors.text }]}>
                    Modifier le profil
                </Text>

                <View style={{ width: 24 }} />
            </View>

            {/* FORMULAIRE PRINCIPAL */}
            <View style={[styles.card, { backgroundColor: themeColors.card }]}>

                {/* Champ : Nom complet */}
                <Text style={[styles.label, { color: themeColors.textSecondary }]}>
                    Nom complet
                </Text>
                <View
                    style={[styles.inputRow, { backgroundColor: themeColors.background }]}
                >
                    <Feather
                        name="user"
                        size={18}
                        color={themeColors.textSecondary}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        style={[styles.input, { color: themeColors.text }]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Votre nom complet"
                        placeholderTextColor={themeColors.textSecondary}
                    />
                </View>

                {/* Champ : Email */}
                <Text style={[styles.label, { color: themeColors.textSecondary }]}>
                    Email
                </Text>
                <View
                    style={[styles.inputRow, { backgroundColor: themeColors.background }]}
                >
                    <Feather
                        name="mail"
                        size={18}
                        color={themeColors.textSecondary}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        style={[styles.input, { color: themeColors.text }]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="votre@email.com"
                        placeholderTextColor={themeColors.textSecondary}
                    />
                </View>

                {/* Champ : Téléphone */}
                <Text style={[styles.label, { color: themeColors.textSecondary }]}>
                    Téléphone
                </Text>
                <View
                    style={[styles.inputRow, { backgroundColor: themeColors.background }]}
                >
                    <Feather
                        name="phone"
                        size={18}
                        color={themeColors.textSecondary}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        style={[styles.input, { color: themeColors.text }]}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        placeholder="+261 00 00 000 00"
                        placeholderTextColor={themeColors.textSecondary}
                    />
                </View>

                {/* Champ : Adresse */}
                <Text style={[styles.label, { color: themeColors.textSecondary }]}>
                    Adresse
                </Text>
                <View
                    style={[styles.inputRow, { backgroundColor: themeColors.background }]}
                >
                    <Feather
                        name="map-pin"
                        size={18}
                        color={themeColors.textSecondary}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        style={[styles.input, { color: themeColors.text }]}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Votre adresse"
                        placeholderTextColor={themeColors.textSecondary}
                    />
                </View>
            </View>

            {/* ✅ BOUTON ENREGISTRER */}
            <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: Colors.light.primary }]}
                onPress={handleSave}
            >
                <Text style={styles.saveText}>Enregistrer</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
    },

    card: {
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 24,
        // Ajouter une marge en haut pour remplacer l'espace de l'avatar
        marginTop: 10,
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
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
    },
    saveBtn: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        marginHorizontal: 20,
    },
    saveText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});