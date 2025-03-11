import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { useFonts, MuseoModerno_400Regular } from '@expo-google-fonts/museomoderno';
import { WorkSans_400Regular, WorkSans_600SemiBold, WorkSans_700Bold } from '@expo-google-fonts/work-sans';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS, handleApiError } from "../constants/api";
import ProgressBar from "../assets/icons/progressBar3.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";  
import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get('window');

const LocationSetup = () => {
    const navigation = useNavigation();
    
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = async () => {
        if (!streetAddress || !city || !state || !zipCode) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (zipCode.length !== 5 || isNaN(zipCode)) {
            Alert.alert('Error', 'Please enter a valid zip code');
            return;
        }

        setIsLoading(true);
        try {
            // Get all signup data
            const existingData = await AsyncStorage.getItem('signupData');
            console.log('Existing signup data:', existingData);
            const signupData = JSON.parse(existingData || '{}');
            
            // Validate that we have all required data from previous steps
            if (!signupData.firstName || !signupData.lastName || !signupData.username || !signupData.email || !signupData.password) {
                Alert.alert('Error', 'Missing required information from previous steps. Please start over.');
                navigation.navigate('Signup');
                return;
            }

            // Format the data for the server
            const registrationData = {
                first_name: signupData.firstName,
                last_name: signupData.lastName,
                display_name: signupData.preferredName || signupData.firstName,
                username: signupData.username,
                email: signupData.email,
                password: signupData.password,
                date_of_birth: signupData.dateOfBirth,
                street_address: streetAddress.trim(),
                city: city.trim(),
                state: state.trim(),
                zip_code: zipCode.trim(),
                interests: signupData.interests || {},
                preferred_time_commitment: signupData.preferredTimeCommitment || null
            };

            console.log('Registration Data:', JSON.stringify(registrationData, null, 2));

            // Register user
            try {
                const response = await fetch(API_ENDPOINTS.SIGNUP, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(registrationData),
                });

                console.log('Response status:', response.status);
                const data = await response.json();
                console.log('Server Response:', JSON.stringify(data, null, 2));

                if (response.ok) {
                    // Store the token
                    if (data.token) {
                        await AsyncStorage.setItem('userToken', data.token);
                        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
                    }
                    // Clear signup data
                    await AsyncStorage.removeItem('signupData');
                    navigation.navigate('CauseSelection');
                } else {
                    const errorMessage = data.detail || 
                        (typeof data === 'object' ? JSON.stringify(data) : 'Registration failed');
                    Alert.alert('Error', errorMessage);
                }
            } catch (error) {
                console.log('Network Error:', error);
                Alert.alert('Error', 'Network error occurred. Please check your internet connection.');
            }
        } catch (error) {
            console.log('Error in registration:', error);
            const errorMessage = handleApiError(error);
            Alert.alert('Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    let [fontsLoaded] = useFonts({
        MuseoModerno_400Regular,
        WorkSans_400Regular,
        WorkSans_600SemiBold,
        WorkSans_700Bold,
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Logo width={60} height={60} style={styles.logo}/>
                    <Text style={styles.title}>Get Started</Text>
                    
                    <View style={styles.progressBarContainer}>
                        <ProgressBar width={274} height={10} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.subtitle}>Location</Text>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Street Address"
                                placeholderTextColor="#A9A9A9"
                                value={streetAddress}
                                onChangeText={setStreetAddress}
                            />
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={[styles.inputWrapper, styles.cityWrapper]}>
                                <TextInput
                                    style={[styles.input, styles.cityInput]}
                                    placeholder="City"
                                    placeholderTextColor="#A9A9A9"
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </View>

                            <View style={[styles.inputWrapper, styles.stateWrapper]}>
                                <TextInput
                                    style={[styles.input, styles.stateInput]}
                                    placeholder="State"
                                    placeholderTextColor="#A9A9A9"
                                    value={state}
                                    onChangeText={setState}
                                />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Zip code"
                                placeholderTextColor="#A9A9A9"
                                value={zipCode}
                                onChangeText={setZipCode}
                                keyboardType="numeric"
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
        fontFamily: 'MuseoModerno_400Regular',
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
        fontFamily: 'WorkSans_400Regular',
        marginBottom: 20,
        alignSelf: 'flex-start',
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
        fontFamily: 'WorkSans_400Regular',
        fontSize: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    cityWrapper: {
        width: '58%',
        marginBottom: 0,
    },
    stateWrapper: {
        width: '38%',
        marginBottom: 0,
    },
    cityInput: {
        width: '100%',
    },
    stateInput: {
        width: '100%',
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
        fontFamily: 'WorkSans_400Regular',
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
});

export default LocationSetup; 