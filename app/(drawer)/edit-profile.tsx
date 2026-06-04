import { useEffect, useState } from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity,
    ScrollView, Alert, BackHandler
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
    const router = useRouter();

    useEffect(() => {
        const backAction = () => {
            router.replace('/(drawer)/settings');
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [router]);

    const [name, setName] = useState('Mika');
    const [email, setEmail] = useState('mika@example.com');
    const [phone, setPhone] = useState('+261 34 00 000 00');
    const [address, setAddress] = useState('Antananarivo, Madagascar');

    const handleSave = () => {
        Alert.alert('Profil mis à jour', 'Vos informations ont été enregistrées.', [
            { text: 'OK', onPress: () => router.replace('/(drawer)/settings') },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(drawer)/settings')}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Modifier le profil</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.avatarSection}>
                <View style={styles.avatar}>
                    <Feather name="user" size={40} color="#fff" />
                </View>
                <TouchableOpacity>
                    <Text style={styles.changePhoto}>Changer la photo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Nom complet</Text>
                <View style={styles.inputRow}>
                    <Feather name="user" size={18} color="#999" style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>

                <Text style={styles.label}>Email</Text>
                <View style={styles.inputRow}>
                    <Feather name="mail" size={18} color="#999" style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>

                <Text style={styles.label}>Téléphone</Text>
                <View style={styles.inputRow}>
                    <Feather name="phone" size={18} color="#999" style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                </View>

                <Text style={styles.label}>Adresse</Text>
                <View style={styles.inputRow}>
                    <Feather name="map-pin" size={18} color="#999" style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} value={address} onChangeText={setAddress} />
                </View>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Enregistrer</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 24
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    changePhoto: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 24,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
        marginBottom: 6,
        marginTop: 12
    },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1, paddingVertical: 12,
        fontSize: 15,
        color: '#333'
    },
    saveBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
});