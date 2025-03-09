import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { useFonts, MuseoModerno_400Regular } from '@expo-google-fonts/museomoderno';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../assets/icons/progressBar5.svg";  
import Logo from "../assets/icons/logo.svg"; 
import SvgWave from "../assets/icons/Wave.svg";
import CheckBox from "../assets/icons/checkbox.svg";
import CheckBoxSelected from "../assets/icons/checkbox-selected.svg";

const { width, height } = Dimensions.get('window');

const skills = [
    { id: 1, title: "Teaching & Tutoring" },
    { id: 2, title: "Medical & First Aid" },
    { id: 3, title: "Public Speaking & Advocacy" },
    { id: 4, title: "Legal Assistance" },
    { id: 5, title: "I'm just here to serve kindness!" },
];

const SkillSelection = () => {
    const navigation = useNavigation();
    const [selectedSkills, setSelectedSkills] = useState([]);
    
    const handleNext = () => {
        navigation.navigate('VolunteerPreferences');
    };

    const toggleSkill = (skillId) => {
        setSelectedSkills(prev => {
            if (prev.includes(skillId)) {
                return prev.filter(id => id !== skillId);
            }
            if (prev.length < 3) {
                return [...prev, skillId];
            }
            return prev;
        });
    };

    let [fontsLoaded] = useFonts({
        MuseoModerno_400Regular,
        WorkSans_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Logo width={55} height={55} style={styles.logo}/>
                <Text style={styles.title}>Get Started</Text>
                
                <View style={styles.progressBarContainer}>
                    <ProgressBar width={274} height={10} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.subtitle}>Do you have any special skills or experience you'd like to offer?</Text>
                    <Text style={styles.subHeader}>Choose your top 3</Text>

                    <View style={styles.skillsContainer}>
                        {skills.map((skill) => (
                            <TouchableOpacity
                                key={skill.id}
                                style={styles.skillItem}
                                onPress={() => toggleSkill(skill.id)}
                            >
                                {selectedSkills.includes(skill.id) ? 
                                    <CheckBoxSelected width={24} height={24} style={styles.checkbox} /> :
                                    <CheckBox width={24} height={24} style={styles.checkbox} />
                                }
                                <Text style={styles.skillText}>{skill.title}</Text>
                            </TouchableOpacity>
                        ))}
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
        fontSize: 16,
        fontFamily: 'WorkSans_400Regular',
        marginBottom: 6,
        textAlign: 'center',
    },
    subHeader: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'WorkSans_400Regular',
        marginBottom: 20,
        opacity: 0.8,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    inputContainer: {
        width: '90%',
        paddingBottom: 0,
        marginBottom: 0,
        maxHeight: '45%',
    },
    skillsContainer: {
        width: '100%',
        gap: 12,
    },
    skillItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 12,
        marginBottom: 0,
    },
    checkbox: {
        marginRight: 12,
    },
    skillText: {
        color: '#333333',
        fontSize: 14,
        fontFamily: 'WorkSans_400Regular',
    },
    nextButton: {
        backgroundColor: '#5AA8DC',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        position: 'absolute',
        top: '80%',
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
});

export default SkillSelection; 