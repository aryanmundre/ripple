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

const { width, height } = Dimensions.get('window');

const skills = [
    { id: 1, title: "Teaching & Mentoring", emoji: "📚" },
    { id: 2, title: "Event Planning", emoji: "📅" },
    { id: 3, title: "Social Media", emoji: "📱" },
    { id: 4, title: "Writing & Editing", emoji: "✍️" },
    { id: 5, title: "Photography", emoji: "📸" },
    { id: 6, title: "Web Development", emoji: "💻" },
    { id: 7, title: "Graphic Design", emoji: "🎨" },
    { id: 8, title: "Public Speaking", emoji: "🎤" },
];

const SkillSelection = () => {
    const navigation = useNavigation();
    const [selectedSkills, setSelectedSkills] = useState([]);
    
    const handleNext = () => {
        navigation.navigate('Main');
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
                    <Text style={styles.subtitle}>What skills can you contribute?</Text>
                    <Text style={styles.subHeader}>Choose your top 3</Text>

                    <View style={styles.skillsGrid}>
                        {skills.map((skill) => (
                            <TouchableOpacity
                                key={skill.id}
                                style={styles.skillItem}
                                onPress={() => toggleSkill(skill.id)}
                            >
                                <View style={[
                                    styles.skillButton,
                                    selectedSkills.includes(skill.id) && styles.selectedSkill
                                ]}>
                                    <Text style={styles.skillText}>{skill.emoji} {skill.title}</Text>
                                </View>
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
        paddingHorizontal: 10,
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
        width: '80%',
        paddingBottom: 0,
        marginBottom: 0,
        maxHeight: '40%',
    },
    skillsGrid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        gap: 11,
        marginTop: 0,
    },
    skillItem: {
        width: '45%',
        aspectRatio: 0.9,
        backgroundColor: 'white',
        borderRadius: 12,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
    },
    skillButton: {
        position: 'absolute',
        bottom: 10,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#666666',
        borderRadius: 25,
        paddingVertical: 3,
        paddingHorizontal: 6,
        height: 20,
        justifyContent: 'center',
    },
    selectedSkill: {
        backgroundColor: '#5AA8DC',
    },
    skillText: {
        color: 'white',
        fontSize: 11,
        fontFamily: 'WorkSans_400Regular',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#5AA8DC',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        position: 'absolute',
        top: '72%',
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