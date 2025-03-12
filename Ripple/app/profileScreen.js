import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants';
import Waves3 from '../assets/icons/Waves3.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verticalScale, scale, moderateScale } from '../utils/scaling';
import { useFonts, MuseoModerno_700Bold, } from '@expo-google-fonts/museomoderno';

const { width, height } = Dimensions.get('window');
const isLargeDevice = height > 850; // iPhone 14 Plus/16 Plus threshold

// Sample Activity Data
const activities = [
    {
        id: 1,
        name: 'Blood Donation',
        date: 'February 6, 2025',
        xp: '+50 XP',
        icon: 'plus-square',
    },
    {
        id: 2,
        name: 'Tutoring Children',
        date: 'February 9, 2025',
        xp: '+35 XP',
        icon: 'book',
    },
];

const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    // Load fonts
    const [fontsLoaded] = useFonts({
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        MuseoModerno_700Bold,
    });

    // Load profile data when component mounts or when screen is focused
    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const savedProfile = await AsyncStorage.getItem('userProfile');
                if (savedProfile) {
                    const profileData = JSON.parse(savedProfile);
                    setName(profileData.name || '');
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        };

        loadProfileData();

        // Add focus listener to reload data when screen is focused
        const unsubscribe = navigation.addListener('focus', loadProfileData);
        return unsubscribe;
    }, [navigation]);

    // Ensure fonts are loaded before rendering UI
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image source={require('../assets/profile-placeholder.png')} style={styles.profileImage} />
                <Text style={styles.name}>{name || 'Enter your name'}</Text>
                <Text style={styles.location}>Los Angeles, CA</Text>
            </View>

            {/* Wave Background */}
      <View style={styles.waveContainer}>
        <Waves3 width={width} height={460} style={{ position: 'absolute', top: 0 }} />
      </View>     

      {/* Blue Bottom Background */}
        <View style={styles.bottomBackground} />

            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>143</Text>
                    <Text style={styles.statLabel}>Day Streak</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>1234</Text>
                    <Text style={styles.statLabel}>Total XP</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>56</Text>
                    <Text style={styles.statLabel}>Friends</Text>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome name="user-plus" size={16} color="white" />
                    <Text style={styles.buttonText}>Add Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton}
                  onPress={() => navigation.navigate('ProfileSettings')}
                > 
                    <FontAwesome name="pencil" size={16} color="white" />
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>

            {/* Recent Activities Section */}
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <FlatList
                data={activities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.activityCard}>
                        <FontAwesome name={item.icon} size={24} color={COLORS.primary} />
                        <View style={styles.activityDetails}>
                            <Text style={styles.activityTitle}>{item.name}</Text>
                            <Text style={styles.activityDate}>{item.date}</Text>
                        </View>
                        <Text style={styles.xpTag}>{item.xp}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: scale(20),
    },
    header: {
        alignItems: 'center',
        marginBottom: verticalScale(20),
        paddingTop: isLargeDevice ? verticalScale(40) : verticalScale(50),
        zIndex: 2,
    },
    profileImage: {
        width: isLargeDevice ? scale(75) : scale(85),
        height: isLargeDevice ? scale(75) : scale(85),
        borderRadius: isLargeDevice ? scale(37.5) : scale(42.5),
        marginBottom: verticalScale(3),
        marginTop: verticalScale(25),
    },
    name: {
        fontSize: isLargeDevice ? moderateScale(20) : moderateScale(22),
        fontFamily: 'MuseoModerno_700Bold',
        color: '#FFF'
    },
    location: {
        fontSize: moderateScale(14),
        fontFamily: 'WorkSans-Regular',
        color: '#FFF',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: scale(15),
        marginBottom: verticalScale(20),
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: moderateScale(20),
        fontFamily: 'WorkSans-Regular',
        color: COLORS.primary,
    },
    statLabel: {
        fontSize: moderateScale(12),
        fontFamily: 'WorkSans-Regular',
        color: '#666',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(20),
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7CBEEA',
        padding: scale(10),
        borderRadius: moderateScale(8),
        flex: 1,
        marginRight: scale(5),
        justifyContent: 'center',
        height: verticalScale(40),
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7CBEEA',
        padding: scale(10),
        borderRadius: moderateScale(8),
        flex: 1,
        marginLeft: scale(5),
        justifyContent: 'center',
        height: verticalScale(40),
    },
    buttonText: {
        color: '#0D408A',
        fontSize: moderateScale(14),
        fontFamily: 'WorkSans-Regular',
        marginLeft: scale(5),
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontFamily: 'WorkSans-Regular',
        marginBottom: verticalScale(10),
        color: '#FFF'
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: scale(15),
        marginBottom: verticalScale(10),
        justifyContent: 'space-between',
    },
    activityDetails: {
        flex: 1,
        marginLeft: scale(10),
    },
    activityTitle: {
        fontSize: moderateScale(16),
        fontFamily: 'WorkSans-Regular',
    },
    activityDate: {
        fontSize: moderateScale(14),
        fontFamily: 'WorkSans-Regular',
        color: '#666',
    },
    xpTag: {
        fontSize: moderateScale(14),
        fontFamily: 'WorkSans-Regular',
        color: COLORS.primary,
    },
    waveContainer: {
        position: 'absolute',
        top: verticalScale(5),
        left: 0,
        width: '100%',
        height: isLargeDevice ? verticalScale(450) : verticalScale(500),
    },
    bottomBackground: {
        position: 'absolute',
        bottom: 0,
        width: '140%',
        height: '70%', // Covers only lower half
        backgroundColor: '#0D408A', 
    }
});

export default ProfileScreen;
