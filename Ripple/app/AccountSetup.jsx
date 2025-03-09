import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions,
    Pressable,
} from 'react-native';
import { useFonts, MuseoModerno_400Regular } from '@expo-google-fonts/museomoderno';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../assets/icons/progressBar2.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";  
import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get('window');

const AccountSetup = () => {
    const navigation = useNavigation();
    
    const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let [fontsLoaded] = useFonts({
        MuseoModerno_400Regular,
        WorkSans_400Regular,
    });

    const handleNext = () => {
        console.log('Next button pressed');
        navigation.navigate('LocationSetup');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Logo width={60} height={60} style={styles.logo}/>
                <Text style={styles.title}>Get Started</Text>
                
                <View style={styles.progressBarContainer}>
                    <ProgressBar width={274} height={10} />
                </View>

                <Text style={styles.subtitle}>Set up your account</Text>

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

                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Date of birth"
                            placeholderTextColor="#A9A9A9"
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                        />
                        <Icon name="calendar" size={20} color="#A9A9A9" style={styles.calendarIcon} />
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
                            secureTextEntry
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

export default AccountSetup; 