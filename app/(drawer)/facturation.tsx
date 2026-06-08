import TopBar from "@/components/layout/TopBar";
import SuccessModal from "@/components/modals/SuccessModal";
import AirtelLogo from "@/components/payment/AirtelLogo";
import MVolaLogo from "@/components/payment/MVolaLogo";
import OrangeLogo from "@/components/payment/OrangeLogo";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator, TouchableOpacity } from "react-native";

import { calculateBill, issueToken } from '@/services/api';


const formatNumber = (num: string) => {
    if (!num || num === '--') return '--';
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default function FacturationScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const themeColors = Colors[theme];

    const [success, setSuccess] = useState(false);
    const [prixKwh, setPrixKwh] = useState("2000");
    const [quantite, setQuantite] = useState("10");
    const [loading, setLoading] = useState(false);

    const [tokenCode, setTokenCode] = useState('');
    const [factureAPI, setFactureAPI] = useState<any>(null);
    const [billSessionId, setBillSessionId] = useState('');

    const handleCalculate = async () => {
        if (!quantite || quantite === '0') {
            Alert.alert('Erreur', 'Veuillez entrer une quantité.');
            return;
        }

        setLoading(true);
        try {
            const data = await calculateBill(
                '261002',
                '0270100558021',
                '02',
                quantite
            );

            console.log('Réponse API:', data);

            if (data.code === 401) {
                Alert.alert('Session expirée', 'Veuillez vous reconnecter.', [
                    { text: 'OK', onPress: () => router.replace('/login' as any) }
                ]);
                setLoading(false);
                return;
            }

            if (data.code === 0) {
                setFactureAPI(data.data);
                setBillSessionId(data.data.bill_session_id);
            } else {
                Alert.alert('Erreur', data.msg || 'Erreur de calcul.');
            }
        } catch (error) {
            console.error('Erreur calcul:', error);
            Alert.alert('Erreur', 'Impossible de calculer la facture.');
        } finally {
            setLoading(false);
        }
    };

    const handlePay = async (method: string) => {
        if (!billSessionId) {
            Alert.alert('Erreur', 'Veuillez d\'abord calculer la facture.');
            return;
        }

        setLoading(true);
        try {
            const data = await issueToken(
                '261002',           // consumer_no
                '0270100558021',    // meter_no
                billSessionId,      // reçu du calcul
                false               // ne pas envoyer au compteur
            );

            console.log('Réponse paiement:', data);

            if (data.code === 401) {
                Alert.alert('Session expirée', 'Veuillez vous reconnecter.', [
                    { text: 'OK', onPress: () => router.replace('/login' as any) }
                ]);
                setLoading(false);
                return;
            }

            if (data.code === 0) {
                setSuccess(true);
                setTokenCode(data.data.sts2_token[0]);
            } else {
                Alert.alert('Erreur', data.msg || 'Paiement échoué.');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de finaliser le paiement.');
        } finally {
            setLoading(false);
        }
    };

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
                    <View style={[styles.inputWrapper, { backgroundColor: themeColors.card, borderBottomColor: '#8dc63f' }]}>
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

                    {/* Bouton Calculer */}
                    <TouchableOpacity
                        style={[styles.calculateBtn, { backgroundColor: Colors.light.primary }]}
                        onPress={handleCalculate}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text style={styles.calculateText}>Calculer</Text>
                        )}
                    </TouchableOpacity>

                    {/* Résultats de l'API */}
                    {factureAPI && (
                        <>
                            <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
                                <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Montant</Text>
                                <View style={styles.rowInputWrapper}>
                                    <Text style={[styles.rowValue, styles.calculatedValue, { color: themeColors.text }]}>
                                        {formatNumber(String(factureAPI.total_money))}
                                    </Text>
                                    <Text style={[styles.rowUnit, { color: themeColors.text }]}>Ar</Text>
                                </View>
                            </View>

                            <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
                                <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Énergie</Text>
                                <View style={styles.rowInputWrapper}>
                                    <Text style={[styles.rowValue, styles.calculatedValue, { color: themeColors.text }]}>
                                        {factureAPI.total_resource}
                                    </Text>
                                    <Text style={[styles.rowUnit, { color: themeColors.text }]}>kWh</Text>
                                </View>
                            </View>

                            {factureAPI.fee && Object.entries(factureAPI.fee).map(([key, value]: [string, any]) => (
                                <View key={key} style={[styles.row, { borderBottomColor: themeColors.border }]}>
                                    <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>{key}</Text>
                                    <View style={styles.rowInputWrapper}>
                                        <Text style={[styles.rowValue, styles.calculatedValue, { color: themeColors.text }]}>
                                            {formatNumber(String(value))}
                                        </Text>
                                        <Text style={[styles.rowUnit, { color: themeColors.text }]}>Ar</Text>
                                    </View>
                                </View>
                            ))}

                            <View style={styles.totalRow}>
                                <Text style={[styles.totalLabel, { color: themeColors.textSecondary }]}>Total à payer</Text>
                                <View style={styles.rowInputWrapper}>
                                    <Text style={[styles.totalValue, styles.calculatedValue, { color: themeColors.text }]}>
                                        {formatNumber(String(factureAPI.total_money))}
                                    </Text>
                                    <Text style={[styles.totalUnit, { color: themeColors.text }]}>Ar</Text>
                                </View>
                            </View>
                        </>
                    )}

                    {/* Message si pas encore calculé */}
                    {!factureAPI && !loading && (
                        <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
                            Entrez une quantité et appuyez sur &quot;Calculer&quot;.
                        </Text>
                    )}
                </View>

                {/* Paiement */}
                {factureAPI && (
                    <View style={styles.payment}>
                        <Text style={[styles.paymentLabel, { color: themeColors.textSecondary }]}>
                            Veuillez choisir le moyen de paiement
                        </Text>
                        <View style={styles.logos}>
                            {/* <OrangeLogo onPress={() => setSuccess(true)} />
                            <MVolaLogo onPress={() => setSuccess(true)} />
                            <AirtelLogo onPress={() => setSuccess(true)} /> */}

                            <OrangeLogo onPress={() => handlePay('orange')} />
                            <MVolaLogo onPress={() => handlePay('mvola')} />
                            <AirtelLogo onPress={() => handlePay('airtel')} />
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* <SuccessModal
                visible={success}
                onClose={() => setSuccess(false)}
                onViewBill={() => {
                    setSuccess(false);
                    router.push("/historique");
                }}
            /> */}

            <SuccessModal
                visible={success}
                tokenCode={tokenCode}
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
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        paddingHorizontal: 14,
        paddingVertical: 0,
        marginBottom: 8,
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
    calculateBtn: {
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 12,
    },
    calculateText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20,
    },
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