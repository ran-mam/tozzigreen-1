import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    // ActivityIndicator,
    Platform,
    Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getOrders } from '@/services/api';

import Skeleton from '@/components/ui/Skeleton';

const PAGE_SIZE = 10;

export default function HistoriqueScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const themeColors = Colors[theme];
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalOrders, setTotalOrders] = useState(0);

    const [dateFrom, setDateFrom] = useState(new Date(2026, 5, 1));
    const [dateTo, setDateTo] = useState(new Date());
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    useEffect(() => {
        setPage(1);
        loadOrders(1);
    }, [dateFrom, dateTo]);

    const loadOrders = async (pageNum: number) => {
        if (pageNum === 1) setLoading(true);
        else setLoadingMore(true);

        try {
            const startDate = `${dateFrom.getFullYear()}-${String(dateFrom.getMonth() + 1).padStart(2, '0')}-${String(dateFrom.getDate()).padStart(2, '0')}`;
            const endDate = `${dateTo.getFullYear()}-${String(dateTo.getMonth() + 1).padStart(2, '0')}-${String(dateTo.getDate()).padStart(2, '0')}`;

            const data = await getOrders('261002', startDate, endDate, pageNum, PAGE_SIZE);

            if (data.code === 401) {
                Alert.alert('Session expirée', 'Veuillez vous reconnecter.', [
                    { text: 'OK', onPress: () => router.replace('/login' as any) }
                ]);
                setLoading(false);
                return;
            }

            if (data.code === 0) {
                const newBills = data.data?.bill_list || [];
                if (pageNum === 1) setOrders(newBills);
                else setOrders(prev => [...prev, ...newBills]);
                setTotalOrders(data.data?.total || 0);
                setHasMore(newBills.length === PAGE_SIZE);
            }
        } catch (error) {
            console.error('Erreur historique:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (hasMore && !loadingMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            loadOrders(nextPage);
        }
    };

    const groupedOrders = orders.reduce((acc: any, bill: any) => {
        const month = bill.bill_date.slice(0, 7).replace('-', '');
        if (!acc[month]) acc[month] = [];
        acc[month].push(bill);
        return acc;
    }, {});

    const formatMonth = (month: string) => {
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        return `${months[parseInt(month.slice(4, 6)) - 1]} ${month.slice(0, 4)}`;
    };

    const formatDateDisplay = (date: Date) => {
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    };

    const formatDate = (date: string) => {
        if (!date) return '';
        const parts = date.split(' ')[0].split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    return (
        <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
            <TopBar />
            <View style={[styles.titleBar, { backgroundColor: Colors.light.primary }]}>
                <Text style={styles.titleText}>Historique des facturations</Text>
            </View>

            {/* Filtre dates */}
            <View style={styles.filterRow}>
                <TouchableOpacity
                    style={[styles.datePill, { backgroundColor: themeColors.card }]}
                    onPress={() => setShowFrom(true)}
                >
                    <Feather name="calendar" size={14} color={Colors.light.primary} />
                    <Text style={[styles.datePillText, { color: themeColors.text }]}>
                        {formatDateDisplay(dateFrom)}
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.dateSeparator, { color: themeColors.textSecondary }]}>à</Text>
                <TouchableOpacity
                    style={[styles.datePill, { backgroundColor: themeColors.card }]}
                    onPress={() => setShowTo(true)}
                >
                    <Feather name="calendar" size={14} color={Colors.light.primary} />
                    <Text style={[styles.datePillText, { color: themeColors.text }]}>
                        {formatDateDisplay(dateTo)}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* SKELETON LOADER */}
            {loading && (
                <View style={styles.skeletonContainer}>

                    <Skeleton
                        width={120}
                        height={12}
                        style={{
                            marginBottom: 16,
                            marginTop: 8,
                        }}
                    />

                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <View
                            key={i}
                            style={[
                                styles.billCard,
                                { backgroundColor: themeColors.card }
                            ]}
                        >
                            <View style={styles.billLeft}>

                                <Skeleton
                                    width={8}
                                    height={8}
                                    borderRadius={4}
                                />

                                <View>
                                    <Skeleton
                                        width={130}
                                        height={14}
                                        style={{ marginBottom: 6 }}
                                    />

                                    <Skeleton
                                        width={90}
                                        height={12}
                                    />
                                </View>

                            </View>

                            <View style={styles.billRight}>

                                <Skeleton
                                    width={70}
                                    height={14}
                                />

                                <Skeleton
                                    width={16}
                                    height={16}
                                    borderRadius={8}
                                />

                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* Liste */}
            {!loading && orders.length === 0 && (
                <View style={styles.emptyState}>
                    <Feather name="inbox" size={48} color={themeColors.textSecondary} />
                    <Text style={[styles.emptyTitle, { color: themeColors.text }]}>Aucune facture</Text>
                    <Text style={[styles.emptySub, { color: themeColors.textSecondary }]}>
                        Essayez de modifier la période
                    </Text>
                </View>
            )}

            {!loading && orders.length > 0 && (
                <ScrollView contentContainerStyle={styles.content}>
                    {Object.entries(groupedOrders).map(([month, bills]: [string, any]) => (
                        <View key={month} style={styles.section}>
                            <Text style={[styles.monthHeader, { color: themeColors.textSecondary }]}>
                                {formatMonth(month)}
                            </Text>
                            {bills.map((b: any) => (
                                <TouchableOpacity
                                    key={b.bill_id}
                                    style={[styles.billCard, { backgroundColor: themeColors.card }]}
                                    onPress={() => router.push({
                                        pathname: "/(drawer)/historique_detail" as any,
                                        params: { order: JSON.stringify(b) },
                                    })}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.billLeft}>
                                        <View style={[styles.billDot, { backgroundColor: Colors.light.primary }]} />
                                        <View>
                                            <Text style={[styles.billRef, { color: themeColors.text }]}>
                                                N° {b.bill_no}
                                            </Text>
                                            <Text style={[styles.billMeta, { color: themeColors.textSecondary }]}>
                                                {formatDate(b.bill_date)} · {b.total_resource} kWh
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.billRight}>
                                        <Text style={[styles.billAmount, { color: themeColors.text }]}>
                                            {b.account_pay_amount} Ar
                                        </Text>
                                        <Feather name="chevron-right" size={16} color={themeColors.textSecondary} />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}

                    {hasMore && (
                        <>
                            {!loadingMore ? (
                                <TouchableOpacity
                                    style={styles.loadMore}
                                    onPress={handleLoadMore}
                                >
                                    <Text style={styles.loadMoreText}>
                                        Afficher plus de factures
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={{ paddingHorizontal: 20 }}>
                                    {[1, 2, 3].map((i) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.billCard,
                                                {
                                                    backgroundColor: themeColors.card,
                                                },
                                            ]}
                                        >
                                            <View style={styles.billLeft}>
                                                <Skeleton
                                                    width={8}
                                                    height={8}
                                                    borderRadius={4}
                                                />

                                                <View>
                                                    <Skeleton
                                                        width={130}
                                                        height={14}
                                                        style={{ marginBottom: 6 }}
                                                    />

                                                    <Skeleton
                                                        width={90}
                                                        height={12}
                                                    />
                                                </View>
                                            </View>

                                            <View style={styles.billRight}>
                                                <Skeleton
                                                    width={70}
                                                    height={14}
                                                />

                                                <Skeleton
                                                    width={16}
                                                    height={16}
                                                    borderRadius={8}
                                                />
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </>
                    )}

                    <View style={{ height: 40 }} />
                </ScrollView>
            )}

            {showFrom && (
                <DateTimePicker value={dateFrom} mode="date" display="default"
                    onChange={(_, d) => { setShowFrom(Platform.OS === 'ios'); if (d) setDateFrom(d); }}
                    maximumDate={dateTo} accentColor={Colors.light.primary} />
            )}
            {showTo && (
                <DateTimePicker value={dateTo} mode="date" display="default"
                    onChange={(_, d) => { setShowTo(Platform.OS === 'ios'); if (d) setDateTo(d); }}
                    minimumDate={dateFrom} maximumDate={new Date()} accentColor={Colors.light.primary} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    titleBar: { padding: 14 },
    titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        gap: 10,
    },
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    datePillText: { fontSize: 13, fontWeight: '600' },
    dateSeparator: { fontSize: 13 },
    skeletonContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    skeletonCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 14,
        marginBottom: 8,
    },
    content: { paddingBottom: 32 },
    section: { paddingHorizontal: 20, marginBottom: 4 },
    monthHeader: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginTop: 12,
    },
    billCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 14,
        marginBottom: 8,
    },
    billLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    billDot: { width: 8, height: 8, borderRadius: 4 },
    billRef: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
    billMeta: { fontSize: 12 },
    billRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    billAmount: { fontSize: 15, fontWeight: '800' },
    emptyState: { alignItems: 'center', paddingTop: 60 },
    emptyTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
    emptySub: { fontSize: 13, marginTop: 4 },
    loadMore: { alignItems: 'center', paddingVertical: 20 },
    loadMoreText: { color: Colors.light.primary, fontWeight: '600', fontSize: 14 },
});
