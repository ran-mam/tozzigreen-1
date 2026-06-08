import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAPI } from '@/services/api';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [identifierError, setIdentifierError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    const handleLogin = async () => {

        // Réinitialiser les erreurs
        setIdentifierError('');
        setPasswordError('');
        setServerError('');

        // Validation
        let hasError = false;

        if (!identifier.trim()) {
            setIdentifierError('L\'identifiant est requis.');
            hasError = true;
        }

        if (!password.trim()) {
            setPasswordError('Le mot de passe est requis.');
            hasError = true;
        }

        if (hasError) return;

        setLoading(true);

        try {
            const data = await loginAPI(identifier, password);
            console.log('Réponse:', data);

            if (data.code === 0) {
                await AsyncStorage.setItem('token', data.data.token);
                router.replace('/(drawer)' as any);
            } else {

                setIdentifierError('Identifiant ou numéro de téléphone incorrect.');
                setPasswordError('Mot de passe incorrect.');
            }
        } catch (error) {
            console.error('Erreur login:', error);
            setServerError('Impossible de se connecter au serveur.');
        } finally {
            setLoading(false);
        }
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

                    {/* Erreur serveur */}
                    {serverError !== '' && (
                        <View style={styles.serverErrorBox}>
                            <Text style={styles.serverErrorText}>{serverError}</Text>
                        </View>
                    )}

                    {/* Champ Identifiant */}
                    <Text style={styles.label}>Identifiant ou numéro de téléphone</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                identifierError !== '' && styles.inputError,
                            ]}
                            placeholderTextColor="#999"
                            value={identifier}
                            onChangeText={(text) => {
                                setIdentifier(text);
                                if (identifierError) setIdentifierError('');
                                if (serverError) setServerError('');
                            }}
                            autoCapitalize="none"
                        />
                    </View>
                    {identifierError !== '' && (
                        <Text style={styles.errorText}>{identifierError}</Text>
                    )}

                    {/* Champ Mot de passe */}
                    <Text style={styles.label}>Mot de passe</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                passwordError !== '' && styles.inputError,
                            ]}
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (passwordError) setPasswordError('');
                                if (serverError) setServerError('');
                            }}
                            autoCapitalize="none"
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Feather
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color="#999"
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError !== '' && (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    )}

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Se connecter</Text>
                        )}
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
        marginBottom: 4,
        position: 'relative',
    },
    eyeButton: {
        position: 'absolute',
        right: 14,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    eyeIcon: {
        fontSize: 20,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 0,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#000',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    inputError: {
        borderColor: '#e53e3e',
        borderWidth: 1.5,
    },
    errorText: {
        color: '#e53e3e',
        fontSize: 12,
        marginBottom: 12,
        marginTop: 4,
    },
    serverErrorBox: {
        backgroundColor: '#fff5f5',
        borderWidth: 1,
        borderColor: '#e53e3e',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    serverErrorText: {
        color: '#e53e3e',
        fontSize: 13,
        textAlign: 'center',
        fontWeight: '500',
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