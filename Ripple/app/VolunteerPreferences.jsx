import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    Pressable,
    TouchableOpacity,
    Modal,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../assets/icons/progressBar6.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get('window');

const frequencyOptions = [
    "Once a week",
    "2-3 times a week",
    "Once a month",
    "2-3 times a month",
    "Weekends only",
    "Weekdays only",
    "Flexible schedule",
    "As needed"
];

const virtualOptions = [
    "Yes, I prefer virtual volunteering",
    "Yes, but I also like in-person",
    "No, I prefer in-person only",
    "No preference"
];

const ageGroupOptions = [
    "Children (0-12)",
    "Teenagers (13-19)",
    "Young Adults (20-29)",
    "Adults (30-64)",
    "Seniors (65+)",
    "Special Needs Groups",
    "All age groups",
    "No preference"
];

const VolunteerPreferences = () => {
    const navigation = useNavigation();
    const [frequency, setFrequency] = useState('');
    const [virtualPreference, setVirtualPreference] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPicker, setCurrentPicker] = useState('');
    const [tempSelection, setTempSelection] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    
    const handleNext = () => {
        if (!frequency || !virtualPreference || !ageGroup) {
            Alert.alert('Error', 'Please select all preferences');
            return;
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };

    const openPicker = (type) => {
        setCurrentPicker(type);
        switch(type) {
            case 'frequency':
                setTempSelection(frequency);
                break;
            case 'virtual':
                setTempSelection(virtualPreference);
                break;
            case 'age':
                setTempSelection(ageGroup);
                break;
        }
        setModalVisible(true);
    };

    const confirmSelection = () => {
        switch(currentPicker) {
            case 'frequency':
                setFrequency(tempSelection);
                break;
            case 'virtual':
                setVirtualPreference(tempSelection);
                break;
            case 'age':
                setAgeGroup(tempSelection);
                break;
        }
        setModalVisible(false);
    };

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

    const getPickerOptions = () => {
        switch(currentPicker) {
            case 'frequency':
                return frequencyOptions;
            case 'virtual':
                return virtualOptions;
            case 'age':
                return ageGroupOptions;
            default:
                return [];
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('SkillSelection')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
            >
                <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.content}>
                <Logo width={55} height={55} style={styles.logo}/>
                <Text style={styles.title}>Get Started</Text>
                
                <View style={styles.progressBarContainer}>
                    <ProgressBar width={274} height={10} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.subtitle}>Volunteer Availability & Preferences</Text>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.questionText}>How often would you like to volunteer?</Text>
                        <TouchableOpacity 
                            style={styles.selectButton}
                            onPress={() => openPicker('frequency')}
                        >
                            <Text style={[
                                styles.selectButtonText,
                                frequency && styles.selectedText
                            ]}>
                                {frequency || "Choose option below"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.questionText}>Are you open to virtual volunteering?</Text>
                        <TouchableOpacity 
                            style={styles.selectButton}
                            onPress={() => openPicker('virtual')}
                        >
                            <Text style={[
                                styles.selectButtonText,
                                virtualPreference && styles.selectedText
                            ]}>
                                {virtualPreference || "Choose option below"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.questionText}>Do you prefer working with certain age groups?</Text>
                        <TouchableOpacity 
                            style={styles.selectButton}
                            onPress={() => openPicker('age')}
                        >
                            <Text style={[
                                styles.selectButtonText,
                                ageGroup && styles.selectedText
                            ]}>
                                {ageGroup || "Choose option below"}
                            </Text>
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
                    <Text style={styles.nextButtonText}>Create Account</Text>
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity 
                                style={styles.modalButton} 
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.modalButton} 
                                onPress={confirmSelection}
                            >
                                <Text style={[styles.modalButtonText, styles.confirmButton]}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.optionsContainer}>
                            {getPickerOptions().map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionItem,
                                        tempSelection === option && styles.selectedOption
                                    ]}
                                    onPress={() => setTempSelection(option)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        tempSelection === option && styles.selectedOptionText
                                    ]}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
        marginTop: 30,
        marginBottom: 8,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'MuseoModerno',
        marginBottom: 15,
    },
    progressBarContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 35,
    },
    subtitle: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'WorkSans',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        width: '90%',
        paddingBottom: 0,
        marginBottom: 0,
        maxHeight: '45%',
    },
    pickerContainer: {
        marginBottom: 25,
    },
    questionText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'WorkSans',
        marginBottom: 10,
    },
    selectButton: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 16,
        width: '100%',
    },
    selectButtonText: {
        color: '#666666',
        fontSize: 16,
        fontFamily: 'WorkSans',
        textAlign: 'left',
    },
    selectedText: {
        color: '#000000',
    },
    nextButton: {
        backgroundColor: '#5AA8DC',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        position: 'absolute',
        top: '82%',
        zIndex: 3,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    modalButton: {
        padding: 8,
    },
    modalButtonText: {
        fontSize: 16,
        color: '#007AFF',
        fontFamily: 'WorkSans',
    },
    confirmButton: {
        fontWeight: '600',
    },
    optionsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    optionItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8',
    },
    selectedOption: {
        backgroundColor: '#5AA8DC',
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'WorkSans',
        color: '#333333',
    },
    selectedOptionText: {
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? '8%' : 50,
        left: '5%',
        padding: 10,
        zIndex: 10,
        backgroundColor: 'transparent',
    },  
});

export default VolunteerPreferences; 