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
    TouchableOpacity,
    Platform,
    Modal,
    Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from "../assets/icons/progressBar2.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";  
import Icon from "react-native-vector-icons/Feather";
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');

const AccountSetup = () => {
    const navigation = useNavigation();
    
    const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        if (!username || !dateOfBirth || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return;
        }

        try {
            const existingData = await AsyncStorage.getItem('signupData');
            const signupData = JSON.parse(existingData || '{}');
            
            // Add account setup data
            const updatedData = {
                ...signupData,
                username,
                dateOfBirth,
                email,
                password,
            };
            
            await AsyncStorage.setItem('signupData', JSON.stringify(updatedData));
            navigation.navigate('LocationSetup');
        } catch (error) {
            Alert.alert('Error', 'Could not save account data');
        }
    };

    const onDateChange = (date) => {
        if (date) {
            const selectedDate = new Date(date);
            // Format date as YYYY-MM-DD
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            setDateOfBirth(formattedDate);
        }
        setShowCalendar(false);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Logo width={60} height={60} style={styles.logo}/>
                    <Text style={styles.title}>Get Started</Text>
                    
                    <View style={styles.progressBarContainer}>
                        <ProgressBar width={274} height={10} />
                    </View>

                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>
                            Set up your account
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#A9A9A9"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>

                        <View style={styles.datePickerContainer}>
                            <TouchableOpacity 
                                style={styles.inputWrapper}
                                onPress={toggleCalendar}
                            >
                                <TextInput
                                    style={styles.input}
                                    placeholder="Date of birth"
                                    placeholderTextColor="#A9A9A9"
                                    value={dateOfBirth}
                                    editable={false}
                                />
                                <Icon name="calendar" size={20} color="#A9A9A9" style={styles.calendarIcon} />
                            </TouchableOpacity>

                            {showCalendar && (
                                <View style={styles.calendarContainer}>
                                    <CalendarPicker
                                        onDateChange={onDateChange}
                                        maxDate={new Date()}
                                        minDate={new Date(1900, 0, 1)}
                                        selectedDayColor="#5AA8DC"
                                        selectedDayTextColor="#FFFFFF"
                                        width={width * 0.85}
                                        textStyle={{
                                            fontFamily: 'WorkSans',
                                            color: '#333333',
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                placeholderTextColor="#A9A9A9"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#A9A9A9"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#A9A9A9" />
                            </TouchableOpacity>
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
    subtitleContainer: {
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: '5%',
        marginTop: Platform.OS === 'ios' ? '2%' : 0, // Adjusts spacing for iOS
    },
    subtitle: {
        color: 'white',
        fontSize: Platform.OS === 'ios' 
            ? Math.min(16, Dimensions.get('window').width * 0.04) // Responsive font size
            : 16,
        fontFamily: 'WorkSans',
        marginBottom: Platform.OS === 'ios' 
            ? Dimensions.get('window').height * 0.025 // Responsive margin
            : 20,
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
        fontFamily: 'WorkSans',
        fontSize: 16,
    },
    calendarIcon: {
        position: 'absolute',
        right: 20,
        top: 15,
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
    datePickerContainer: {
        width: '100%',
        position: 'relative',
        zIndex: 1000,
    },
    calendarContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? '8%' : 50, // Scales with screen height on iOS
        left: '5%', // Scales with screen width
        padding: 10, // Larger touch target
        zIndex: 10,
    },
});

export default AccountSetup; 