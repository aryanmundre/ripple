//Third page
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useFonts, MuseoModerno_400Regular } from '@expo-google-fonts/museomoderno';
import { WorkSans_400Regular, WorkSans_600SemiBold, WorkSans_700Bold } from '@expo-google-fonts/work-sans';

const { width, height } = Dimensions.get('window');

const GettingStarted = () => {
    let [fontsLoaded] = useFonts({
        MuseoModerno_400Regular,
        WorkSans_400Regular,
        WorkSans_600SemiBold,
        WorkSans_700Bold,
    });



    return (
        <SafeAreaView style={styles.container}>
           
            <View style={styles.header}>
                <View style={styles.icons}>
                    {/* Add your icons here */}
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Get Started</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <Text style={styles.inputText}>First Name</Text>
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputText}>Last Name</Text>
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputText}>Preferred Name</Text>
                </View>
            </View>

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

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
        borderRadius: 40,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    icons: {
        flexDirection: 'row',
        gap: 10,
    },
    title: {
        color: 'white',
        fontSize: 36,
        fontFamily: 'MuseoModerno_400Regular', // MuseoModerno for title
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 20,
    },
    inputContainer: {
        marginTop: 50,
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
    },
    inputText: {
        color: '#575353',
        fontSize: 15,
        fontFamily: 'WorkSans_400Regular', // Work Sans for input text
    },
    nextButton: {
        backgroundColor: '#5AA8DC',
        borderRadius: 60,
        paddingVertical: 9,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50,
    },
    nextButtonText: {
        color: '#D5E7F4',
        fontSize: 16,
        fontFamily: 'WorkSans_700Bold', // Work Sans for button text
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
