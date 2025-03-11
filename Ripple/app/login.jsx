import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { MuseoModerno_400Regular } from "@expo-google-fonts/museomoderno";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import SvgWave from "../assets/icons/Wave.svg";  
import { API_ENDPOINTS, handleApiError } from "../constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const socialLoginOptions = [
    { name: "Google", icon: { uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e88fc034-c7c3-4ebb-b63a-3021c95dc604" } },
    { name: "Apple", icon: { uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cb655e3f-3bcf-47a7-aeed-cb79608ab556" } },
    { name: "Facebook", icon: { uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d3d0830a-d38b-442a-b404-fb60637ed1b4" } },
];

export default function LogInSignUp() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [fontsLoaded] = useFonts({
        'MuseoModerno': MuseoModerno_400Regular,
        'WorkSans': WorkSans_400Regular,
    });

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        setIsLoading(true);
        try {
            console.log('Attempting login with:', { email: username });
            const response = await fetch(API_ENDPOINTS.LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email: username, password }),
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Server Response:', JSON.stringify(data, null, 2));

            if (response.ok) {
                // Store the token
                if (data.token) {
                    await AsyncStorage.setItem('authToken', data.token);
                    await AsyncStorage.setItem('userData', JSON.stringify(data.user));
                }
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else {
                const errorMessage = data.detail || 
                    (typeof data === 'object' ? JSON.stringify(data) : 'Login failed. Please check your credentials.');
                Alert.alert("Error", errorMessage);
            }
        } catch (error) {
            console.log('Login Error:', error);
            const errorMessage = handleApiError(error);
            Alert.alert("Error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (!fontsLoaded) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={[styles.title, { fontFamily: undefined }]}>Welcome Back</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* White Background for top section */}
                <View style={styles.topBackground} />

                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-left" size={24} color="black" />
                </TouchableOpacity>

                {/* Wave Container */}
                <View style={styles.waveContainer}>
                    <SvgWave width={width} height={height * 0.55} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Log in to start your Ripple</Text>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Icon name="user" size={20} color="#666666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                testID="username-input"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Icon name="lock" size={20} color="#666666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                testID="password-input"
                            />
                            <TouchableOpacity 
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Icon 
                                    name={showPassword ? "eye" : "eye-off"} 
                                    size={20} 
                                    color="#666666" 
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={styles.forgotPassword}
                            onPress={() => {/* Handle forgot password */}}
                        >
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            testID="login-button"
                        >
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </TouchableOpacity>

                        <View style={styles.socialContainer}>
                            <Text style={styles.socialText}>Or continue with</Text>
                            <View style={styles.socialButtons}>
                                {socialLoginOptions.map((option) => (
                                    <TouchableOpacity key={option.name} style={styles.socialButton}>
                                        <Image source={option.icon} style={styles.socialIcon} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.signupLink}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D408A",
    },
    topBackground: {
        position: "absolute",
        width: "100%",
        height: "35%",
        backgroundColor: "white",
        top: 0,
        left: 0,
        right: 0,
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 10,
    },
    waveContainer: {
        position: "absolute",
        top: "0%",
        left: 0,
        right: 0,
        zIndex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 200,
        zIndex: 2,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'MuseoModerno',
        marginBottom: 8,
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'WorkSans',
        marginBottom: 40,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    inputWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        marginBottom: 16,
        paddingHorizontal: 20,
        height: 50,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontFamily: 'WorkSans',
        fontSize: 16,
        color: '#333333',
    },
    eyeIcon: {
        padding: 5,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: 'white',
        fontFamily: 'WorkSans',
        fontSize: 14,
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#B8E1EB',
        borderRadius: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    loginButtonText: {
        color: '#333333',
        fontSize: 16,
        fontFamily: 'WorkSans',
    },
    socialContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    socialText: {
        color: 'white',
        fontFamily: 'WorkSans',
        fontSize: 14,
        marginBottom: 20,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        width: 24,
        height: 24,
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupText: {
        color: 'white',
        fontFamily: 'WorkSans',
        fontSize: 14,
    },
    signupLink: {
        color: 'white',
        fontFamily: 'WorkSans',
        fontSize: 14,
        
    },
});
