import TopBar from "@/components/layout/TopBar";
import SuccessModal from "@/components/modals/SuccessModal";
import AirtelLogo from "@/components/payment/AirtelLogo";
import MVolaLogo from "@/components/payment/MVolaLogo";
import OrangeLogo from "@/components/payment/OrangeLogo";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default function FacturationScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const themeColors = Colors[theme];

    const [success, setSuccess] = useState(false);
    const [prixKwh, setPrixKwh] = useState("2000");
    const [quantite, setQuantite] = useState("10");

    const prixKwhNum = parseFloat(prixKwh) || 0;
    const quantiteNum = parseFloat(quantite) || 0;

    const facture = useMemo(() => {
        const montantHT = prixKwhNum * quantiteNum;
        const tva = montantHT * 0.2;
        const fne = 100;
        const taxeCommunale = 200;
        const total = montantHT + tva + fne + taxeCommunale;

        return {
            montantHT: montantHT.toFixed(0),
            tva: tva.toFixed(0),
            fne: fne.toFixed(0),
            taxeCommunale: taxeCommunale.toFixed(0),
            total: total.toFixed(0),
        };
    }, [prixKwhNum, quantiteNum]);

    return (
        <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
            <TopBar />
            <ScrollView>
                <View style={[styles.header, { backgroundColor: Colors.light.primary }]}>
                    <Text style={styles.headerLabel}>Prix du kWh</Text>
                    <View style={styles.headerInputWrapper}>
                        <TextInput
                            style={styles.headerValue}
                            value={prixKwh}
                            onChangeText={(text) => setPrixKwh(text.replace(/[^0-9]/g, ""))}
                            keyboardType="numeric"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                        />
                        <Text style={styles.headerUnit}>Ar</Text>
                    </View>
                </View>

                {/* Formulaire */}
                <View style={styles.body}>

                    {/* Quantité - MODIFIABLE */}
                    <Text style={[styles.label, { color: themeColors.text }]}>Quantité</Text>
                    <View style={[styles.inputWrapper, { backgroundColor: themeColors.card, borderColor: Colors.light.primary }]}>
                        <TextInput
                            style={[styles.input, { color: themeColors.text }]}
                            value={quantite}
                            onChangeText={(text) => setQuantite(text.replace(/[^0-9]/g, ""))}
                            keyboardType="numeric"
                            placeholder="Entrez la quantité"
                            placeholderTextColor={themeColors.textSecondary}
                        />
                        <Text style={[styles.unit, { color: themeColors.text }]}>kWh</Text>
                    </View>

                    {/* Le reste comme avant */}
                    <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
                        <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Montant HT</Text>
                        <View style={styles.rowInputWrapper}>
                            <Text style={[styles.rowValue, styles.calculatedValue, { color: themeColors.text }]}>
                                {formatNumber(facture.montantHT)}
                            </Text>
                            <Text style={[styles.rowUnit, { color: themeColors.text }]}>Ar</Text>
                        </View>
                    </View>

                    <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
                        <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>TVA</Text>
                        <View style={styles.rowInputWrapper}>
                            <Text style={[styles.rowValue, styles.calculatedValue, { color: themeColors.text }]}>
                                {formatNumber(facture.tva)}
                            </Text>
                            <Text style={[styles.rowUnit, { color: themeColors.text }]}>Ar</Text>
                        </View>
                    </View>

                    <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
                        <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>FNE</Text>
                        <View style={styles.rowInputWrapper}>
                            <Text style={[styles.rowValue, styles.calculatedValue, { color: themeColors.text }]}>
                                {formatNumber(facture.fne)}
                            </Text>
                            <Text style={[styles.rowUnit, { color: themeColors.text }]}>Ar</Text>
                        </View>
                    </View>

                    <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
                        <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Taxe communale</Text>
                        <View style={styles.rowInputWrapper}>
                            <Text style={[styles.rowValue, styles.calculatedValue, { color: themeColors.text }]}>
                                {formatNumber(facture.taxeCommunale)}
                            </Text>
                            <Text style={[styles.rowUnit, { color: themeColors.text }]}>Ar</Text>
                        </View>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={[styles.totalLabel, { color: themeColors.textSecondary }]}>Total à payer</Text>
                        <View style={styles.rowInputWrapper}>
                            <Text style={[styles.totalValue, styles.calculatedValue, { color: themeColors.text }]}>
                                {formatNumber(facture.total)}
                            </Text>
                            <Text style={[styles.totalUnit, { color: themeColors.text }]}>Ar</Text>
                        </View>
                    </View>
                </View>

                {/* Paiement */}
                <View style={styles.payment}>
                    <Text style={[styles.paymentLabel, { color: themeColors.textSecondary }]}>
                        Veuillez choisir le moyen de paiement
                    </Text>
                    <View style={styles.logos}>
                        <OrangeLogo onPress={() => setSuccess(true)} />
                        <MVolaLogo onPress={() => setSuccess(true)} />
                        <AirtelLogo onPress={() => setSuccess(true)} />
                    </View>
                </View>
            </ScrollView>

            <SuccessModal
                visible={success}
                onClose={() => setSuccess(false)}
                onViewBill={() => {
                    setSuccess(false);
                    router.push("/historique");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    header: { padding: 16 },
    headerLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    headerInputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    headerValue: {
        color: "#fff",
        fontWeight: "900",
        fontSize: 24,
        padding: 0,
    },
    headerUnit: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 2,
    },
    body: { padding: 18 },
    // Nouveau style pour Quantité
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1.5,
        paddingHorizontal: 14,
        paddingVertical: 0,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        paddingVertical: 10,
    },
    unit: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    // Anciens styles conservés
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    rowLabel: { fontSize: 13 },
    rowInputWrapper: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 4,
    },
    rowValue: {
        fontSize: 15,
        fontWeight: "700",
        padding: 0,
        minWidth: 60,
        textAlign: "right",
    },
    calculatedValue: {
        opacity: 0.7,
    },
    rowUnit: { fontSize: 13, fontWeight: "600" },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        paddingTop: 16,
    },
    totalLabel: { fontSize: 13, fontWeight: "600" },
    totalValue: {
        fontSize: 20,
        fontWeight: "900",
        padding: 0,
        minWidth: 80,
        textAlign: "right",
    },
    totalUnit: { fontSize: 15, fontWeight: "700" },
    payment: { padding: 18 },
    paymentLabel: {
        fontSize: 13,
        marginBottom: 25,
        textAlign: "center",
    },
    logos: { flexDirection: "row", gap: 10 },
});