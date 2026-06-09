import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from "react-native";

interface SupportTicketDetail {
  id: string;
  category: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  categoryIcon: string;
  recipient: string;
  subject: string;
}

export default function DetailSupportScreen() {


  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  // Mock data - replace with API call using id
  const [ticketDetail] = useState<SupportTicketDetail>({
    id: (id as string) || "TKT001",
    category: "Facturation",
    description: "Je n'arrive pas à voir ma dernière facture",
    status: "resolved",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    categoryIcon: "file-text",
    recipient: "support@company.com",
    subject: "Problème avec facture",
  });

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
      router.push("/(drawer)/supports" as any);
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/(drawer)/supports" as any)}>
            <Feather name="arrow-left" size={24} color={themeColors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Détail du ticket
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Ticket Header */}
        <View
          style={[styles.ticketHeader, { backgroundColor: themeColors.card }]}
        >
          <View style={styles.ticketHeaderContent}>
            <View style={styles.ticketIdSection}>
              <Text
                style={[
                  styles.ticketIdLabel,
                  { color: themeColors.textSecondary },
                ]}
              >
                Ticket ID
              </Text>
              <Text style={[styles.ticketId, { color: themeColors.text }]}>
                {ticketDetail.id}
              </Text>
            </View>
            <View style={styles.statusSection}>
              <Text
                style={[
                  styles.statusLabel,
                  { color: themeColors.textSecondary },
                ]}
              >
                Statut
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(ticketDetail.status).bg },
                ]}
              >
                <Text
                  style={{
                    color: getStatusColor(ticketDetail.status).text,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {getStatusLabel(ticketDetail.status)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ticket Details */}
        <View style={styles.detailsSection}>
          <View
            style={[styles.detailCard, { backgroundColor: themeColors.card }]}
          >
            <View style={styles.detailRow}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: themeColors.textSecondary },
                ]}
              >
                Catégorie:
              </Text>
              <Text style={[styles.detailValue, { color: themeColors.text }]}>
                {ticketDetail.category}
              </Text>
            </View>

            <View
              style={[
                styles.detailRow,
                {
                  borderTopWidth: 1,
                  borderTopColor: themeColors.border,
                  paddingTop: 12, // Fixed: Changed from paddingTopVertical to paddingTop
                },
              ]}
            >
              <Text
                style={[
                  styles.detailLabel,
                  { color: themeColors.textSecondary },
                ]}
              >
                Destinataire:
              </Text>
              <Text style={[styles.detailValue, { color: themeColors.text }]}>
                {ticketDetail.recipient}
              </Text>
            </View>

            <View
              style={[
                styles.detailRow,
                {
                  borderTopWidth: 1,
                  borderTopColor: themeColors.border,
                  paddingTop: 12,
                },
              ]}
            >
              <Text
                style={[
                  styles.detailLabel,
                  { color: themeColors.textSecondary },
                ]}
              >
                Objet:
              </Text>
              <Text style={[styles.detailValue, { color: themeColors.text }]}>
                {ticketDetail.subject}
              </Text>
            </View>

            <View
              style={[
                styles.detailRow,
                {
                  borderTopWidth: 1,
                  borderTopColor: themeColors.border,
                  paddingTop: 12,
                },
              ]}
            >
              <Text
                style={[
                  styles.detailLabel,
                  { color: themeColors.textSecondary },
                ]}
              >
                Message:
              </Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: themeColors.text, flex: 1 },
                ]}
              >
                {ticketDetail.description}
              </Text>
            </View>

            <View
              style={[
                styles.detailRow,
                {
                  borderTopWidth: 1,
                  borderTopColor: themeColors.border,
                  paddingTop: 12,
                },
              ]}
            >
              <Text
                style={[
                  styles.detailLabel,
                  { color: themeColors.textSecondary },
                ]}
              >
                Créé:
              </Text>
              <Text style={[styles.detailValue, { color: themeColors.text }]}>
                {formatDate(ticketDetail.createdAt)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
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
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  ticketHeader: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  ticketHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  ticketIdSection: {
    flex: 1,
  },
  ticketIdLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  ticketId: {
    fontSize: 18,
    fontWeight: "700",
  },
  statusSection: {
    alignItems: "flex-end",
  },
  statusLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailCard: {
    borderRadius: 12,
    padding: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
    textAlign: "right",
  },
});