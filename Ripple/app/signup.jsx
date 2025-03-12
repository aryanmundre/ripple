//Third page
import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from "../assets/icons/progressBar.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";  
import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get('window');

const SignupScreen = () => {
    const navigation = useNavigation();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [preferredName, setPreferredName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'MuseoModerno': require('../assets/fonts/MuseoModerno-Regular.ttf'),
                'WorkSans': require('../assets/fonts/WorkSans-Regular.ttf'),
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const handleNext = async () => {
        if (!firstName || !lastName) {
            Alert.alert('Error', 'Please enter your first and last name');
            return;
        }

        try {
            // Store signup data for later use
            const signupData = {
                firstName,
                lastName,
                preferredName: preferredName || firstName,
            };
            await AsyncStorage.setItem('signupData', JSON.stringify(signupData));
            navigation.navigate('AccountSetup');
        } catch (error) {
            Alert.alert('Error', 'Could not save signup data');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Signin')}
                >
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Logo width={60} height={60} style={styles.logo}/>
                    <Text style={styles.title}>Get Started</Text>
                    
                    <View style={styles.progressBarContainer}>
                        <ProgressBar width={274} height={10} />
                    </View>

                    <View style={{ width: '90%', alignSelf: 'center' }}>
                    <Text style={styles.subtitle}>Tell us your name</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="#A9A9A9"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                        
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor="#A9A9A9"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Preferred Name"
                                placeholderTextColor="#A9A9A9"
                                value={preferredName}
                                onChangeText={setPreferredName}
                            />
                        </View>
                    </View>

                    <Pressable
                        style={({pressed}) => [
                            styles.nextButton,
                            {opacity: pressed ? 0.7 : 1}
                        ]}
                        onPress={handleNext}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                    </Pressable>
                </View>

                <View style={styles.waveContainer}>
                    <SvgWave 
                        width={width} 
                        height={height * 0.55} 
                        style={{ transform: [{ rotateX: '180deg' }] }} 
                    />
                </View>
                <View style={styles.bottomWhiteBackground} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D408A',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 2,
    },
    logo: {
        marginTop: 40,
        marginBottom: 10,
    },
    title: {
        color: 'white',
        fontSize: 36,
        fontFamily: 'MuseoModerno',
        marginBottom: 20,
    },
    progressBarContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'WorkSans',
        marginBottom: 20,
        alignSelf: 'flex-start',  
        paddingHorizontal: '5%',  
    },
    
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: 15,
        width: '100%',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontFamily: 'WorkSans',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#5AA8DC',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 20,
        zIndex: 2,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'WorkSans',
    },
    waveContainer: {
        position: "absolute",
        top: "59%",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        transform: [{ scaleX: -1 }],
        pointerEvents: 'none',
    },
    bottomWhiteBackground: {
        position: "absolute",
        width: "100%",
        height: "20%",
        backgroundColor: "white",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        pointerEvents: 'none',
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? '8%' : 50, // Scales with screen height on iOS
        left: '5%', // Scales with screen width
        padding: 10, // Larger touch target
        zIndex: 10,
    },
});

export default SignupScreen;