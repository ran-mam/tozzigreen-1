import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(drawer)/settings')}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Conditions d&apos;utilisation</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.card}>
                <Text style={styles.section}>1. Acceptation des conditions</Text>
                <Text style={styles.text}>
                    En utilisant cette application, vous acceptez les présentes conditions d&apos;utilisation.
                </Text>

                <Text style={styles.section}>2. Services fournis</Text>
                <Text style={styles.text}>
                    L&apos;application permet le rechargement de compteur électrique, la consultation
                    de factures et le suivi de consommation.
                </Text>

                <Text style={styles.section}>3. Responsabilités</Text>
                <Text style={styles.text}>
                    L&apos;utilisateur est responsable de l&apos;exactitude des informations fournies.
                    TozziGreen ne peut être tenu responsable en cas d&apos;erreur de saisie.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f4' },
    header: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', padding: 20,
    },
    headerTitle: { fontSize: 18, fontWeight: '700' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginHorizontal: 20 },
    section: { fontSize: 16, fontWeight: '700', marginTop: 16, marginBottom: 8, color: '#333' },
    text: { fontSize: 14, color: '#666', lineHeight: 22 },
});