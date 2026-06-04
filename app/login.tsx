import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // console.log('Identifiant:', identifier);
        // console.log('Mot de passe:', password);
        alert('Connexion en cours...');

        router.replace('/(drawer)' as any);
    };

    return (
        <View style={styles.container}>

            <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Login</Text>
                </View>
            </SafeAreaView>

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.body}>

                    <View style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/images/tozzigreen-logo.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.label}>Identifiant ou numéro de téléphone</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={identifier}
                            onChangeText={setIdentifier}
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={styles.label}>Mot de passe</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Se connecter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff'
    },
    headerSafeArea: {
        backgroundColor: '#000'
    },
    header: {
        backgroundColor: '#000',
        paddingVertical: 6,
        paddingHorizontal: 24,
        alignItems: 'flex-start'
    },
    headerText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500'
    },
    flex: {
        flex: 1
    },
    body: {
        flex: 1,
        paddingHorizontal: 24,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 100,
    },
    logoImage: {
        width: 260,
        height: 36,
    },
    label: {
        fontSize: 14, 
        fontWeight: '500', 
        color: '#000', 
        marginBottom: 8
    },
    inputContainer: {
        marginBottom: 16
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 0,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#000',
        borderWidth: 1, borderColor: '#E0E0E0'
    },
    loginButton: {
        backgroundColor: '#9CC22E',
        borderRadius: 0,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    forgotPassword: {
        alignItems: 'center',
        marginBottom: 24
    },
    forgotPasswordText: {
        color: '#666', 
        fontSize: 14
    },
});