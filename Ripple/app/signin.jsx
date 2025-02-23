import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
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

export default function LogInSignUp() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Judson_700Bold,
        MuseoModerno_400Regular,
        Lato_500Medium,
    });

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            <Text style={styles.title}>Ripple</Text>

            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.subtitle}>Start the Ripple, change the world</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.socialContainer}>
                <Text style={styles.socialText}>Or Sign In with</Text>
                <View style={styles.socialIcons}>
                    <Image
                        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e88fc034-c7c3-4ebb-b63a-3021c95dc604" }}
                        style={styles.socialIcon}
                    />
                    <Image
                        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cb655e3f-3bcf-47a7-aeed-cb79608ab556" }}
                        style={styles.socialIcon}
                    />
                    <Image
                        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d3d0830a-d38b-442a-b404-fb60637ed1b4" }}
                        style={styles.socialIcon}
                    />
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
    title: {
        fontSize: 96,
        fontWeight: "700",
        fontFamily: "Judson_700Bold",
        color: "black",
        textAlign: "center",
        position: "absolute",
        top: '17%',
    },
    welcomeContainer: {
        position: "absolute",
        top: '50%',
        left: '10%',
        right: '10%',
        alignItems: 'left'
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
        textAlign: "left",
        marginTop: 5,
        lineHeight: 24,
        letterSpacing: 0.16,
    },
    buttonContainer: {
        position: "absolute",
        top: '68%',
        left: '10%',
        right: '10%',
    },
    signupButton: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingVertical: 18,
        marginBottom: 14,
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#B8E1EB",
        borderRadius: 30,
        paddingVertical: 18,
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 20,
        color: "black",
    },
    socialContainer: {
        position: "absolute",
        top: '89%',
        alignItems: "center",
        width: '50%'
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
    socialIcon: {
        width: 27,
        height: 27,
    },
});
