import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(drawer)/settings')}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>À propos</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.card}>
                <Image
                    source={require('@/assets/images/tozzigreen-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.version}>Version 1.0.0</Text>
                <Text style={styles.description}>
                    Application de facturation et de gestion de consommation d&apos;électricité.
                    Rechargez votre compteur, suivez votre consommation et gérez votre compte
                    en toute simplicité.
                </Text>
                <Text style={styles.copyright}>
                    © 2026 TozziGreen. Tous droits réservés.
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
    card: {
        backgroundColor: '#fff', borderRadius: 12,
        padding: 24, marginHorizontal: 20, alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 8
    },
    version: {
        fontSize: 14,
        color: '#999',
        marginBottom: 20
    },
    description: {
        fontSize: 15,
        color: '#555',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24
    },
    copyright: {
        fontSize: 12,
        color: '#999'
    },
});