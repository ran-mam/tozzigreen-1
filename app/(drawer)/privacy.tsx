import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(drawer)/settings')}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Politique de confidentialité</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.card}>
                <Text style={styles.section}>Collecte des données</Text>
                <Text style={styles.text}>
                    Nous collectons les informations nécessaires à la fourniture de nos services,
                    notamment votre numéro de consommateur, vos données de consommation et
                    vos informations de contact.
                </Text>

                <Text style={styles.section}>Utilisation des données</Text>
                <Text style={styles.text}>
                    Vos données sont utilisées pour le calcul de votre facture, le suivi de votre
                    consommation et l&apos;envoi d&apos;alertes importantes concernant votre compte.
                </Text>

                <Text style={styles.section}>Protection des données</Text>
                <Text style={styles.text}>
                    Nous mettons en œuvre des mesures de sécurité techniques pour protéger vos
                    données contre tout accès non autorisé.
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