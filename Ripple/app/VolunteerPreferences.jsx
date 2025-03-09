import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    Pressable,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useFonts, MuseoModerno_400Regular } from '@expo-google-fonts/museomoderno';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../assets/icons/progressBar6.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const frequencyOptions = [
    "Weekly",
    "Monthly",
    "Quarterly",
    "As needed"
];

const virtualOptions = [
    "Yes, I'm interested",
    "No, in-person only",
    "Either is fine"
];

const ageGroupOptions = [
    "Children (0-12)",
    "Teenagers (13-19)",
    "Adults (20-64)",
    "Seniors (65+)",
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
    
    const handleNext = () => {
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

    let [fontsLoaded] = useFonts({
        MuseoModerno_400Regular,
        WorkSans_400Regular,
    });

    if (!fontsLoaded) {
        return null;
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
                        <Picker
                            selectedValue={tempSelection}
                            onValueChange={(itemValue) => setTempSelection(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item 
                                label="Select an option" 
                                value="" 
                                style={styles.pickerPlaceholder}
                            />
                            {getPickerOptions().map((option) => (
                                <Picker.Item 
                                    key={option} 
                                    label={option} 
                                    value={option}
                                    style={styles.pickerItem}
                                />
                            ))}
                        </Picker>
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
        fontFamily: 'MuseoModerno_400Regular',
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
        fontFamily: 'WorkSans_400Regular',
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
        fontFamily: 'WorkSans_400Regular',
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
        fontFamily: 'WorkSans_400Regular',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
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
        fontFamily: 'WorkSans_400Regular',
    },
    confirmButton: {
        fontWeight: '600',
    },
    picker: {
        width: '100%',
    },
    pickerItem: {
        fontSize: 16,
        fontFamily: 'WorkSans_400Regular',
    },
    pickerPlaceholder: {
        fontSize: 16,
        fontFamily: 'WorkSans_400Regular',
        color: '#666666',
    },
});

export default VolunteerPreferences; 