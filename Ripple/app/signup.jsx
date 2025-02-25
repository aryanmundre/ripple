//Third page
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useFonts, MuseoModerno_400Regular } from '@expo-google-fonts/museomoderno';
import { WorkSans_400Regular, WorkSans_600SemiBold, WorkSans_700Bold } from '@expo-google-fonts/work-sans';
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../assets/icons/progressBar.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";  
import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get('window');

const GettingStarted = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        MuseoModerno_400Regular,
        WorkSans_400Regular,
        WorkSans_600SemiBold,
        WorkSans_700Bold,
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [preferredName, setPreferredName] = useState('');



    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Signin")}>
                <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
           
            <View style={styles.header}>
                <View style={styles.icons}>
                    
                </View>
            </View>

            <Logo width={79.5} height={82.5} style={styles.logo}/>

            {/* Title */}
            <Text style={styles.title}>Get Started</Text>

            <View style={styles.progressBarContainer}>
                <ProgressBar width={274} height={10} />  
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputHeader}> Tell us your name</Text>

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#A9A9A9"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#A9A9A9"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Preferred Name"
                    placeholderTextColor="#A9A9A9"
                    value={preferredName}
                    onChangeText={setPreferredName}
                />
            </View>

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("NextScreen")}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            

            <View style={styles.waveContainer}>
                <SvgWave width={width} height={height * 0.55} style={{ transform: [{ rotateX: '180deg' }] }} />
            </View>

            <View style={styles.bottomWhiteBackground} />


            

            {/* Background Graphics */}
            <View style={styles.graphics}>
                {/* Add your SVG graphics here */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D408A',
        alignItems: "center",
        paddingHorizontal: 20,
        
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        marginTop: -20,
    },
    icons: {
        flexDirection: 'row',
        gap: 10,
    },
    title: {
        color: 'white',
        fontSize: 36,
        fontFamily: 'MuseoModerno_400Regular', 
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 20,
        top: "-4%"
    },
    inputContainer: {
        marginTop: 20,
        paddingHorizontal: 50,
    },
    input: {
        width: 313,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        paddingLeft: 24,
        marginBottom: 20,
        fontFamily: 'WorkSans_400Regular',
    },
    inputText: {
        color: '#575353',
        fontSize: 15,
        fontFamily: 'WorkSans_400Regular', 
    },
    backButton: {
        position: "absolute",
        top: '7%',   
        left: '5%',  
        zIndex: 10,  
        padding: 8, 
    },
    nextButton: {
        backgroundColor: '#5AA8DC',
        borderRadius: 60,
        paddingVertical: 9,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40,
    },
    nextButtonText: {
        color: '#D5E7F4',
        fontSize: 16,
        fontFamily: 'WorkSans_400Regular',
        lineHeight: 24,
    },

    progressBarContainer: {
        alignItems: "center",  
        justifyContent: "center",
        position: "absolute", 
        top: "28.7%",  
        left: 0,
        right: 0,
    },
    inputHeader: {
        fontSize: 15, 
        fontFamily: "WorkSans_400Regular",  
        color: "white", 
        textAlign: "left",
        lineHeight: 22.5,
        marginBottom: 10,  
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
    },
    waveContainer: {
        position: "absolute",
        top: "59%",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        transform: [{ scaleX: -1 }]
    },
    graphics: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GettingStarted;
