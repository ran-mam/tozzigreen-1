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

export default function ChangePhoneScreen() {
    const router = useRouter();
    const [currentPhone, setCurrentPhone] = useState('+261 34 00 000 00');
    const [newPhone, setNewPhone] = useState('');

    const handleChangePhone = () => {
        if (!newPhone.trim()) {
            Alert.alert('Erreur', 'Veuillez entrer un nouveau numéro.');
            return;
        }
        if (newPhone.length < 10) {
            Alert.alert('Erreur', 'Numéro invalide.');
            return;
        }

        Alert.alert('Succès', 'Votre numéro a été changé avec succès.', [
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
                <Text style={styles.headerTitle}>Changer le numéro</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Info numéro actuel */}
            <View style={styles.currentPhoneCard}>
                <Feather name="smartphone" size={20} color={Colors.primary} />
                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.currentLabel}>Numéro actuel</Text>
                    <Text style={styles.currentPhone}>{currentPhone}</Text>
                </View>
            </View>

            {/* Formulaire */}
            <View style={styles.card}>
                <Text style={styles.label}>Nouveau numéro</Text>
                <View style={styles.inputRow}>
                    <Feather name="phone" size={18} color="#999" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        value={newPhone}
                        onChangeText={setNewPhone}
                        placeholder="+261 34 XX XXX XX"
                        keyboardType="phone-pad"
                    />
                </View>

                <Text style={styles.infoText}>
                    Un code de vérification sera envoyé à votre nouveau numéro.
                </Text>
            </View>

            {/* Bouton */}
            <TouchableOpacity style={styles.saveBtn} onPress={handleChangePhone}>
                <Text style={styles.saveText}>Modifier le numéro</Text>
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
    currentPhoneCard: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', borderRadius: 12,
        padding: 16, marginHorizontal: 20, marginBottom: 20,
    },
    currentLabel: { fontSize: 12, color: '#999' },
    currentPhone: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 2 },
    card: {
        backgroundColor: '#fff', borderRadius: 12,
        padding: 20, marginHorizontal: 20, marginBottom: 24,
    },
    label: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 8 },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 12,
    },
    input: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#333' },
    infoText: {
        fontSize: 12, color: '#999', marginTop: 12, textAlign: 'center',
    },
    saveBtn: {
        backgroundColor: Colors.primary, borderRadius: 12,
        paddingVertical: 16, alignItems: 'center', marginHorizontal: 20,
    },
    saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});