import { BrandColors, Colors } from "@/constants/Colors";
import { USER } from "@/constants/user";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    BackHandler,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsScreen() {
    const router = useRouter();
    const { theme, toggleTheme, isDarkMode } = useTheme();
    const themeColors = Colors[theme];

    const [notifications, setNotifications] = useState(true);

    useEffect(() => {
        const backAction = () => {
            router.replace("/(drawer)");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction,
        );

        return () => backHandler.remove();
    }, [router]);

    const handleLogout = () => {
        Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
            { text: "Annuler", style: "cancel" },
            {
                text: "Déconnecter",
                style: "destructive",
                onPress: () => router.replace("/login" as any),
            },
        ]);
    };

    const dynamicStyles = {
        container: {
            backgroundColor: themeColors.background,
        },
        title: {
            color: themeColors.text,
        },
        sectionTitle: {
            color: themeColors.textSecondary,
        },
        card: {
            backgroundColor: themeColors.card,
        },
        identityCard: {
            backgroundColor: themeColors.card,
        },
        identityName: {
            color: themeColors.text,
        },
        identityId: {
            color: themeColors.textSecondary,
        },
        rowText: {
            color: themeColors.text,
        },
        divider: {
            backgroundColor: themeColors.border,
        },
        versionText: {
            color: themeColors.textSecondary,
        },
        logoutBtn: {
            backgroundColor: themeColors.card,
        },
        chevronColor: themeColors.chevron,
    };

    return (
        <ScrollView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace("/(drawer)")}>
                    <Feather name="arrow-left" size={24} color={themeColors.text} />
                </TouchableOpacity>
                <Text style={[styles.title, dynamicStyles.title]}>Paramètres</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Identité utilisateur */}
            <View style={[styles.identityCard, dynamicStyles.identityCard]}>
                <Feather name="user" size={22} color={BrandColors.primary} />
                <View style={styles.identityInfo}>
                    <Text style={[styles.identityName, dynamicStyles.identityName]}>
                        {USER.name}
                    </Text>
                    <Text style={[styles.identityId, dynamicStyles.identityId]}>
                        Identifiant : {USER.id}
                    </Text>
                </View>
            </View>

            {/* Section Compte */}
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
                Compte
            </Text>
            <View style={[styles.card, dynamicStyles.card]}>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push("/edit-profile" as any)}
                >
                    <Feather name="user" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>
                        Modifier le profil
                    </Text>
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={dynamicStyles.chevronColor}
                    />
                </TouchableOpacity>

                <View style={[styles.divider, dynamicStyles.divider]} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push("/change-password" as any)}
                >
                    <Feather name="lock" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>
                        Changer le mot de passe
                    </Text>
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={dynamicStyles.chevronColor}
                    />
                </TouchableOpacity>

                <View style={[styles.divider, dynamicStyles.divider]} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push("/change-phone" as any)}
                >
                    <Feather name="phone" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>
                        Changer le numéro
                    </Text>
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={dynamicStyles.chevronColor}
                    />
                </TouchableOpacity>
            </View>

            {/* Section Préférences */}
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
                Préférences
            </Text>
            <View style={[styles.card, dynamicStyles.card]}>
                <View style={styles.row}>
                    <Feather name="bell" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>
                        Notifications
                    </Text>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: "#ddd", true: "#939597" }}
                    />
                </View>
                <View style={[styles.divider, dynamicStyles.divider]} />
                <View style={styles.row}>
                    <Feather name="moon" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>
                        Mode sombre
                    </Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme} // toggles global theme
                        trackColor={{ false: "#ddd", true: "#939597" }}
                    />
                </View>
            </View>

            {/* Section Infos */}
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
                Informations
            </Text>
            <View style={[styles.card, dynamicStyles.card]}>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push("/about" as any)}
                >
                    <Feather name="info" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>À propos</Text>
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={dynamicStyles.chevronColor}
                    />
                </TouchableOpacity>

                <View style={[styles.divider, dynamicStyles.divider]} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push("/privacy" as any)}
                >
                    <Feather name="shield" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>
                        Politique de confidentialité
                    </Text>
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={dynamicStyles.chevronColor}
                    />
                </TouchableOpacity>

                <View style={[styles.divider, dynamicStyles.divider]} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push("/terms" as any)}
                >
                    <Feather name="file-text" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>
                        Conditions d&apos;utilisation
                    </Text>
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={dynamicStyles.chevronColor}
                    />
                </TouchableOpacity>

                <View style={[styles.divider, dynamicStyles.divider]} />
                <View style={styles.row}>
                    <Feather name="tag" size={20} color={BrandColors.primary} />
                    <Text style={[styles.rowText, dynamicStyles.rowText]}>Version</Text>
                    <Text style={[styles.versionText, dynamicStyles.versionText]}>
                        1.0.0
                    </Text>
                </View>
            </View>

            {/* Déconnexion */}
            <TouchableOpacity
                style={[styles.logoutBtn, dynamicStyles.logoutBtn]}
                onPress={handleLogout}
            >
                <Feather name="log-out" size={20} color="#e53e3e" />
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: "600",
        textTransform: "uppercase",
        marginBottom: 10,
        marginTop: 8,
        marginLeft: 4,
    },
    card: {
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    identityCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    identityInfo: {
        flex: 1,
    },
    identityName: {
        fontSize: 16,
        fontWeight: "600",
    },
    identityId: {
        fontSize: 13,
        marginTop: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingVertical: 14,
    },
    rowText: {
        flex: 1,
        fontSize: 15,
    },
    divider: {
        height: 1,
    },
    versionText: {
        fontSize: 14,
    },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    logoutText: {
        fontSize: 15,
        color: "#e53e3e",
        fontWeight: "600",
    },
});
