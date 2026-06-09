import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
    // ActivityIndicator,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getMonthlyBill } from '@/services/api';
import Skeleton from '@/components/ui/Skeleton';

const STATS = [
    { label: "Consommation totale", value: "-- kWh", color: Colors.light.primary },
    { label: "Moyenne journalière", value: "-- kWh", color: Colors.light.primaryDark },
    { label: "Coût estimé", value: "-- Ar", color: Colors.light.primary },
];

export default function ConsommationScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const themeColors = Colors[theme];

    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [stats, setStats] = useState(STATS);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setHasSearched(true);
        try {
            const month = `${dateFrom.getFullYear()}-${String(dateFrom.getMonth() + 1).padStart(2, '0')}`;

            const data = await getMonthlyBill('261002', '0270100558021', month);
            console.log('Conso mensuelle:', data);

            if (data.code === 401) {
                Alert.alert('Session expirée', 'Veuillez vous reconnecter.', [
                    { text: 'OK', onPress: () => router.replace('/login' as any) }
                ]);
                setLoading(false);
                return;
            }

            if (data.code === 0) {
                const d = data.data;
                const jours = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0).getDate();

                setStats([
                    { label: "Consommation totale", value: `${d.total_resource} kWh`, color: Colors.light.primary },
                    { label: "Moyenne journalière", value: `${(d.total_resource / jours).toFixed(1)} kWh`, color: Colors.light.primaryDark },
                    { label: "Coût estimé", value: `${d.total_amount} Ar`, color: Colors.light.primary },
                ]);
            } else {
                Alert.alert('Erreur', data.msg || 'Aucune donnée pour cette période.');
            }
        } catch (error) {
            console.error('Erreur conso:', error);
            Alert.alert('Erreur', 'Impossible de récupérer les données.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const onChangeFrom = (_event: any, selectedDate?: Date) => {
        setShowFrom(Platform.OS === 'ios');
        if (selectedDate) setDateFrom(selectedDate);
    };

    const onChangeTo = (_event: any, selectedDate?: Date) => {
        setShowTo(Platform.OS === 'ios');
        if (selectedDate) setDateTo(selectedDate);
    };

    return (
        <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
            <TopBar />
            <View style={[styles.titleBar, { backgroundColor: Colors.light.primary }]}>
                <Text style={styles.titleText}>Consommation</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Filtre période */}
                <View style={[styles.filterCard, { backgroundColor: themeColors.card }]}>
                    <Text style={[styles.filterTitle, { color: themeColors.text }]}>
                        Sélectionnez une période
                    </Text>

                    <TouchableOpacity style={styles.dateRow} onPress={() => setShowFrom(true)}>
                        <Feather name="calendar" size={18} color={Colors.light.primary} />
                        <Text style={[styles.dateLabel, { color: themeColors.textSecondary }]}>Du :</Text>
                        <Text style={[styles.dateValue, { color: themeColors.text }]}>
                            {formatDate(dateFrom)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dateRow} onPress={() => setShowTo(true)}>
                        <Feather name="calendar" size={18} color={Colors.light.primary} />
                        <Text style={[styles.dateLabel, { color: themeColors.textSecondary }]}>Au :</Text>
                        <Text style={[styles.dateValue, { color: themeColors.text }]}>
                            {formatDate(dateTo)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.searchBtn,
                            { opacity: loading ? 0.7 : 1 }
                        ]}
                        onPress={handleSearch}
                        disabled={loading}
                    >
                        <Feather name="search" size={16} color="#fff" />
                        <Text style={styles.searchText}>Rechercher</Text>
                    </TouchableOpacity>
                </View>

                {/* SKELETON LOADER */}
                {loading && (
                    <View style={{ marginTop: 10 }}>
                        {[1, 2, 3].map((i) => (
                            <Skeleton
                                key={i}
                                width="100%"
                                height={60}
                                borderRadius={12}
                                style={{ marginBottom: 12 }}
                            />
                        ))}
                    </View>
                )}

                {/* Message si aucune recherche */}
                {!hasSearched && !loading && (
                    <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
                        Sélectionnez une période et appuyez sur &quot;Rechercher&quot; pour voir votre consommation.
                    </Text>
                )}

                {/* Résultats */}
                {!loading && hasSearched && stats.map(({ label, value, color }) => (
                    <View
                        key={label}
                        style={[styles.card, { backgroundColor: themeColors.card, borderLeftColor: color }]}
                    >
                        <Text style={[styles.label, { color: themeColors.textSecondary }]}>{label}</Text>
                        <Text style={[styles.value, { color: themeColors.text }]}>{value}</Text>
                    </View>
                ))}
            </ScrollView>

            {showFrom && (
                <DateTimePicker
                    value={dateFrom}
                    mode="date"
                    display="default"
                    onChange={onChangeFrom}
                    maximumDate={dateTo}
                />
            )}
            {showTo && (
                <DateTimePicker
                    value={dateTo}
                    mode="date"
                    display="default"
                    onChange={onChangeTo}
                    minimumDate={dateFrom}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    titleBar: { padding: 14 },
    titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
    content: { padding: 18 },
    filterCard: {
        borderRadius: 12,
        padding: 18,
        marginBottom: 20,
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 14,
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },
    dateLabel: { fontSize: 14, fontWeight: "500" },
    dateValue: { fontSize: 14, fontWeight: "600" },
    searchBtn: {
        backgroundColor: Colors.light.primary,
        borderRadius: 8,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 4,
    },
    searchText: { color: "#fff", fontWeight: "700", fontSize: 14 },
    emptyText: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 30,
        lineHeight: 22,
    },
    card: {
        borderRadius: 12,
        padding: 18,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderLeftWidth: 4,
    },
    label: { fontSize: 14, fontWeight: "500" },
    value: { fontSize: 20, fontWeight: "900" },
});