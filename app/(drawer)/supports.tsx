import { BrandColors, Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    BackHandler
} from "react-native";

interface SupportTicket {
    id: string;
    category: string;
    objet: string;
    status: "open" | "in-progress" | "resolved" | "closed";
    createdAt: string;
    updatedAt: string;
    categoryIcon: string;
}

export default function SupportsScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const themeColors = Colors[theme];

    // Mock data - replace with API data
    const [supportTickets] = useState<SupportTicket[]>([
        {
            id: "TKT001",
            category: "Facturation",
            objet: "Je n'arrive pas à voir ma dernière facture",
            status: "resolved",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-16",
            categoryIcon: "file-text",
        },
        {
            id: "TKT002",
            category: "Paiement",
            objet: "Ma recharge ne s'est pas effectuée correctement",
            status: "in-progress",
            createdAt: "2024-01-18",
            updatedAt: "2024-01-18",
            categoryIcon: "credit-card",
        },
        {
            id: "TKT003",
            category: "Technique",
            objet: "L'application se ferme lors du paiement",
            status: "open",
            createdAt: "2024-01-19",
            updatedAt: "2024-01-19",
            categoryIcon: "cpu",
        },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "open":
                return { bg: "#FEF3C7", text: "#D97706" };
            case "in-progress":
                return { bg: "#DBEAFE", text: "#0284C7" };
            case "resolved":
                return { bg: "#DCFCE7", text: "#22C55E" };
            case "closed":
                return { bg: "#F3F4F6", text: "#6B7280" };
            default:
                return { bg: "#F3F4F6", text: "#6B7280" };
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "open":
                return "Ouvert";
            case "in-progress":
                return "En cours";
            case "resolved":
                return "Résolu";
            case "closed":
                return "Fermé";
            default:
                return status;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    useEffect(() => {
        const backAction = () => {
            router.replace("/(drawer)" as any);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [router]);

    return (
        <View style={{ flex: 1, backgroundColor: themeColors.background }}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.replace("/(drawer)")}>
                        <Feather name="arrow-left" size={24} color={themeColors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: themeColors.text }]}>
                        Mes demandes
                    </Text>
                    <TouchableOpacity onPress={() => router.push("/(drawer)/assistance")}>
                        <Feather name="plus" size={24} color={BrandColors.primary} />
                    </TouchableOpacity>
                </View>

                {supportTickets.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View
                            style={[
                                styles.emptyIcon,
                                { backgroundColor: BrandColors.primary + "15" },
                            ]}
                        >
                            <Feather name="inbox" size={48} color={BrandColors.primary} />
                        </View>
                        <Text style={[styles.emptyTitle, { color: themeColors.text }]}>
                            Aucune demande
                        </Text>
                        <Text
                            style={[styles.emptyText, { color: themeColors.textSecondary }]}
                        >
                            Vous n&apos;avez pas encore créé de demande de support
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.newButton,
                                { backgroundColor: BrandColors.primary },
                            ]}
                            onPress={() => router.push("/(drawer)/assistance")}
                        >
                            <Feather name="plus" size={18} color="white" />
                            <Text style={styles.newButtonText}>Créer une demande</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <View style={styles.statsContainer}>
                            <View
                                style={[styles.statBox, { backgroundColor: themeColors.card }]}
                            >
                                <Text
                                    style={[styles.statNumber, { color: BrandColors.primary }]}
                                >
                                    {supportTickets.length}
                                </Text>
                                <Text
                                    style={[
                                        styles.statLabel,
                                        { color: themeColors.textSecondary },
                                    ]}
                                >
                                    Demandes
                                </Text>
                            </View>
                            <View
                                style={[styles.statBox, { backgroundColor: themeColors.card }]}
                            >
                                <Text style={[styles.statNumber, { color: "#22C55E" }]}>
                                    {supportTickets.filter((t) => t.status === "resolved").length}
                                </Text>
                                <Text
                                    style={[
                                        styles.statLabel,
                                        { color: themeColors.textSecondary },
                                    ]}
                                >
                                    Résolues
                                </Text>
                            </View>
                        </View>

                        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                            Historique des demandes
                        </Text>

                        {supportTickets.map((ticket) => {
                            const statusColors = getStatusColor(ticket.status);
                            return (
                                <TouchableOpacity
                                    key={ticket.id}
                                    style={[
                                        styles.ticketCard,
                                        { backgroundColor: themeColors.card },
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        router.push(`/(drawer)/detailSupport?id=${ticket.id}` as any)
                                    }
                                >
                                    <View style={styles.ticketHeader}>
                                        <View style={styles.ticketTitleSection}>
                                            <View
                                                style={[
                                                    styles.categoryIcon,
                                                    { backgroundColor: BrandColors.primary + "15" },
                                                ]}
                                            >
                                                <Feather
                                                    name={ticket.categoryIcon as any}
                                                    size={20}
                                                    color={BrandColors.primary}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={[
                                                        styles.ticketId,
                                                        { color: themeColors.textSecondary },
                                                    ]}
                                                >
                                                    {ticket.id}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.ticketCategory,
                                                        { color: themeColors.text },
                                                    ]}
                                                    numberOfLines={1}
                                                >
                                                    {ticket.category}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                { backgroundColor: statusColors.bg },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.statusText,
                                                    { color: statusColors.text },
                                                ]}
                                            >
                                                {getStatusLabel(ticket.status)}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.ticketObjet,
                                            { color: themeColors.textSecondary },
                                        ]}
                                        numberOfLines={2}
                                    >
                                        {ticket.objet}
                                    </Text>

                                    <View style={styles.ticketFooter}>
                                        <Text
                                            style={[
                                                styles.ticketDate,
                                                { color: themeColors.textSecondary },
                                            ]}
                                        >
                                            Créée: {formatDate(ticket.createdAt)}
                                        </Text>
                                        <Feather
                                            name="arrow-right"
                                            size={16}
                                            color={BrandColors.primary}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}

                        <View style={{ height: 24 }} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
    },
    statsContainer: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },
    statBox: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    ticketCard: {
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },
    ticketHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    ticketTitleSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    ticketId: {
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 2,
    },
    ticketCategory: {
        fontSize: 14,
        fontWeight: "600",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "600",
    },
    ticketObjet: {
        fontSize: 13,
        marginBottom: 12,
        lineHeight: 18,
    },
    ticketFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    ticketDate: {
        fontSize: 12,
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        marginBottom: 24,
        textAlign: "center",
    },
    newButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    newButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
});