import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Switch,
    Alert,
} from 'react-native';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        Alert.alert(
            'Déconnexion',
            'Êtes-vous sûr de vouloir vous déconnecter ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Déconnecter',
                    style: 'destructive',
                    onPress: () => router.replace('/login' as any),
                },
            ]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Supprimer le compte',
            'Cette action est irréversible. Toutes vos données seront perdues.',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => Alert.alert('Compte supprimé', 'Votre compte a été supprimé.'),
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(drawer)')}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Paramètres</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Section Compte */}
            <Text style={styles.sectionTitle}>Compte</Text>
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push('/edit-profile' as any)}
                >
                    <Feather name="user" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>Modifier le profil</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <View style={styles.divider} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push('/change-password' as any)}
                >
                    <Feather name="lock" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>Changer le mot de passe</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <View style={styles.divider} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push('/change-phone' as any)}
                >
                    <Feather name="phone" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>Changer le numéro</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            {/* Section Préférences */}
            <Text style={styles.sectionTitle}>Préférences</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Feather name="bell" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>Notifications</Text>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: '#ddd', true: Colors.primary }}
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Feather name="moon" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>Mode sombre</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: '#ddd', true: Colors.primary }}
                    />
                </View>
            </View>

            {/* Section Infos */}
            <Text style={styles.sectionTitle}>Informations</Text>
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push('/about' as any)}
                >
                    <Feather name="info" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>À propos</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <View style={styles.divider} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push('/privacy' as any)}
                >
                    <Feather name="shield" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>Politique de confidentialité</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <View style={styles.divider} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => router.push('/terms' as any)}
                >
                    <Feather name="file-text" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>Conditions d&apos;utilisation</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <View style={styles.divider} />
                <View style={styles.row}>
                    <Feather name="tag" size={20} color={Colors.primary} />
                    <Text style={styles.rowText}>Version</Text>
                    <Text style={styles.versionText}>1.0.0</Text>
                </View>
            </View>

            {/* Déconnexion */}
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Feather name="log-out" size={20} color="#e53e3e" />
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>

            {/* Supprimer le compte */}
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
                <Feather name="trash-2" size={20} color="#e53e3e" />
                <Text style={styles.deleteText}>Supprimer mon compte</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#999',
        textTransform: 'uppercase',
        marginBottom: 10,
        marginTop: 8,

        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
    },
    rowText: {
        flex: 1,
        fontSize: 15,
        color: '#333'
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0'
    },
    versionText: {
        fontSize: 14,
        color: '#999'
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    logoutText: {
        fontSize: 15,
        color: '#e53e3e',
        fontWeight: '600'
    },
    deleteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
    },
    deleteText: {
        fontSize: 15,
        color: '#e53e3e',
        fontWeight: '600'
    },
});