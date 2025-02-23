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
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import {
    useFonts,
    Judson_700Bold,
} from "@expo-google-fonts/judson";
import {
    MuseoModerno_400Regular,
} from "@expo-google-fonts/museomoderno";
import {
    Lato_500Medium,
} from "@expo-google-fonts/lato";

const { width, height } = Dimensions.get("window");

const socialLoginOptions = [
    { name: "Google", icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e88fc034-c7c3-4ebb-b63a-3021c95dc604" },
    { name: "Apple", icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cb655e3f-3bcf-47a7-aeed-cb79608ab556" },
    { name: "Facebook", icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d3d0830a-d38b-442a-b404-fb60637ed1b4" },
];

export default function LogInSignUp() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Judson_700Bold,
        MuseoModerno_400Regular,
        Lato_500Medium,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle login with API
    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Login Successful!");
                navigation.navigate("Home"); // Navigate to home screen after successful login
            } else {
                Alert.alert("Error", data.detail || "Login failed.");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error("Login Error:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button - Navigates to Signup Page */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Signin")}
            >
                <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.subtitle}>Log in to start your Ripple</Text>

                {/* Username Input */}
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#565353" />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#565353" />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#565353" />
                    </TouchableOpacity>
                </View>

                {/* Log In Button - Connects to API */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>

            {/* Social Media Login */}
            <View style={styles.socialContainer}>
                <Text style={styles.socialText}>Or continue with</Text>
                <View style={styles.socialIcons}>
                    {socialLoginOptions.map((option) => (
                        <TouchableOpacity key={option.name} style={styles.socialIconContainer}>
                            <Image source={{ uri: option.icon }} style={styles.socialIcon} />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.socialText}>
                        Don't have an account?{" "}
                        <Text
                            style={styles.signUpText}
                            onPress={() => navigation.navigate("Signup")}
                        >
                            Sign up
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D408A",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: '5%',
    },
    backButton: {
        position: "absolute",
        top: '10%',
        left: '5%',
    },
    welcomeContainer: {
        position: "absolute",
        top: '25%',
        alignItems: 'center',
        width: '80%',
    },
    welcomeText: {
        fontSize: 36,
        fontFamily: "MuseoModerno_400Regular",
        color: "white",
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "Lato_500Medium",
        fontWeight: "500",
        color: "white",
        textAlign: "center",
        marginVertical: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        width: '100%',
        padding: 10,
        marginVertical: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 20,
        color: "#565353",
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#B8E1EB",
        borderRadius: 30,
        paddingVertical: 18,
        marginVertical: 80,
        width: '100%',
    },
    buttonText: {
        fontSize: 20,
        color: "black",
        fontFamily: "Lato_500Medium",
    },
    socialContainer: {
        position: "absolute",
        top: '80%',
        alignItems: "center",
        width: '80%',
    },
    socialText: {
        fontSize: 16,
        fontFamily: "Lato_500Medium",
        fontWeight: "500",
        color: "white",
        marginBottom: 12,
    },
    socialIcons: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        width: '80%',
    },
    socialIconContainer: {
        backgroundColor: 'white',
        borderRadius: 27,
        width: 27,
        height: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        width: 27,
        height: 27,
    },
    signUpText: {
        fontFamily: "Lato_500Medium",
        color: "white",
        fontWeight: "700",
    },
});
