//Third page
import React, { useState } from 'react';
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
} from 'react-native';
import { useFonts, MuseoModerno_400Regular } from '@expo-google-fonts/museomoderno';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from "../assets/icons/progressBar.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";  

const { width, height } = Dimensions.get('window');

const SignupScreen = () => {
    const navigation = useNavigation();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [preferredName, setPreferredName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    let [fontsLoaded] = useFonts({
        MuseoModerno_400Regular,
        WorkSans_400Regular,
    });

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
                <View style={styles.content}>
                    <Logo width={60} height={60} style={styles.logo}/>
                    <Text style={styles.title}>Get Started</Text>
                    
                    <View style={styles.progressBarContainer}>
                        <ProgressBar width={274} height={10} />
                    </View>

                    <Text style={styles.subtitle}>Tell us your name</Text>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="#A9A9A9"
                                value={firstName}
                                onChangeText={setFirstName}
                                testID="firstName-input"
                            />
                        </View>
                        
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor="#A9A9A9"
                                value={lastName}
                                onChangeText={setLastName}
                                testID="lastName-input"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Preferred Name (Optional)"
                                placeholderTextColor="#A9A9A9"
                                value={preferredName}
                                onChangeText={setPreferredName}
                                testID="preferredName-input"
                            />
                        </View>
                    </View>

                    <Pressable
                        style={({pressed}) => [
                            styles.nextButton,
                            {opacity: pressed ? 0.7 : 1}
                        ]}
                        onPress={handleNext}
                        testID="next-button"
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

export default SignupScreen;
