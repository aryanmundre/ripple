import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

const App = () => {
    let [fontsLoaded] = useFonts({
        'MuseoModerno': require('../components/MuseoModerno-Regular.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Svg width="120%" height={200} viewBox="0 0 1440 320" style={styles.topWave}>
                <Path
                    fill="#7bbde9"
                    d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,197.3C672,181,768,139,864,138.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                />
            </Svg>

            <View style={styles.content}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Our mission is to ...</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <Svg width="120%" height={200} viewBox="0 0 1440 320" style={styles.bottomWave}>
                <Path
                    fill="#0c3f89"
                    d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,202.7C960,181,1056,139,1152,138.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    content: {
        position: 'absolute',
        top: height * 0.56,
        width: '80%',
        left: '2%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 2,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'MuseoModerno',
        fontSize: height * 0.06,
        color: '#FFFFFF',
        marginBottom: height * 0.01,
    },
    subtitle: {
        fontSize: height * 0.025,
        color: '#FFFFFF',
        marginBottom: height * 0.03,
    },
    buttonContainer: {
        position: 'absolute',
        top: height * 0.75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '10%',
        zIndex: 2,
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 35,
        marginBottom: 10,
        width: '40%',
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    topWave: {
        position: 'absolute',
        left: '-50%',
        width: "160%",
        height: "110%",
        transform: [{ scaleY: -3 }],
        zIndex: 0,
    },
    bottomWave: {
        position: 'absolute',
        bottom: 0,
        width: "190%",
        height: "120%",
        left: '-15%',
        transform: [{ scaleY: 6 }],
        zIndex: 1,
    },
});

export default App;
