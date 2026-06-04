import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ChangePasswordScreen() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        Alert.alert('Succès', 'Votre mot de passe a été changé avec succès.', [
            { text: 'OK', onPress: () => router.replace('/(drawer)/settings') },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(drawer)/settings')}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Changer le mot de passe</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Formulaire */}
            <View style={styles.card}>
                <Text style={styles.label}>Mot de passe actuel</Text>
                <View style={styles.inputRow}>
                    <Feather name="lock" size={18} color="#999" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Votre mot de passe actuel"
                        secureTextEntry
                    />
                </View>

                <Text style={styles.label}>Nouveau mot de passe</Text>
                <View style={styles.inputRow}>
                    <Feather name="key" size={18} color="#999" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Nouveau mot de passe"
                        secureTextEntry
                    />
                </View>

                <Text style={styles.label}>Confirmer le mot de passe</Text>
                <View style={styles.inputRow}>
                    <Feather name="check-circle" size={18} color="#999" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirmer le nouveau mot de passe"
                        secureTextEntry
                    />
                </View>
            </View>

            {/* Bouton */}
            <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
                <Text style={styles.saveText}>Modifier le mot de passe</Text>
            </TouchableOpacity>
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
        padding: 20, marginHorizontal: 20, marginBottom: 24,
    },
    label: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 6, marginTop: 12 },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 12,
    },
    input: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#333' },
    saveBtn: {
        backgroundColor: Colors.primary, borderRadius: 12,
        paddingVertical: 16, alignItems: 'center', marginHorizontal: 20,
    },
    saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});