import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Linking,
    Alert,
} from 'react-native';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';

export default function AssistanceScreen() {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            Alert.alert('Message envoyé', 'Notre équipe vous répondra dans les plus brefs délais.');
            setMessage('');
        }
    };

    const handleCall = () => {
        Linking.openURL('tel:+261340000000');
    };

    const handleWhatsApp = () => {
        Linking.openURL('https://wa.me/261340000000');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Assistance</Text>
            <Text style={styles.subtitle}>Comment pouvons-nous vous aider ?</Text>

            {/* Contact rapide */}
            <View style={styles.contactRow}>
                <TouchableOpacity style={styles.contactBtn} onPress={handleCall}>
                    <Feather name="phone" size={24} color={Colors.primary} />
                    <Text style={styles.contactLabel}>Appeler</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactBtn} onPress={handleWhatsApp}>
                    <Feather name="message-circle" size={24} color="#25D366" />
                    <Text style={styles.contactLabel}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactBtn}>
                    <Feather name="mail" size={24} color="#EA4335" />
                    <Text style={styles.contactLabel}>Email</Text>
                </TouchableOpacity>
            </View>

            {/* FAQ */}
            <Text style={styles.sectionTitle}>Questions fréquentes</Text>
            {FAQ.map((item, index) => (
                <TouchableOpacity key={index} style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>{item.question}</Text>
                    <Feather name="chevron-down" size={20} color="#999" />
                </TouchableOpacity>
            ))}
            
            {/* Message */}
            <Text style={styles.sectionTitle}>Envoyer un message</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Décrivez votre problème..."
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                <Text style={styles.sendText}>Envoyer</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>Service disponible 24h/24 et 7j/7</Text>
        </ScrollView>
    );
}

const FAQ = [
    { question: 'Comment recharger mon compteur ?' },
    { question: 'Où trouver mon numéro de facture ?' },
    { question: 'Comment contacter le service client ?' },
    { question: 'Que faire en cas de coupure ?' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4
    },
    subtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
    contactRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 32
    },
    contactBtn: {
        alignItems: 'center',
        gap: 8,
        padding: 16
    },
    contactLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#333'
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        marginTop: 8
    },
    faqItem: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    faqQuestion: { fontSize: 14, color: '#333', flex: 1 },
    textArea: {
        backgroundColor: '#f5f5f5', borderRadius: 8, padding: 14,
        fontSize: 14, minHeight: 100, textAlignVertical: 'top',
        marginBottom: 16,
    },
    sendBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',

        marginBottom: 20,
    },
    sendText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
    footer: {
        textAlign: 'center',
        color: '#999',
        fontSize: 12,
        marginBottom: 40
    },
});