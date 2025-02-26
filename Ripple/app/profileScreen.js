import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants';


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
    // Load fonts
    const [fontsLoaded] = useFonts({
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    });

    // Ensure fonts are loaded before rendering UI
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image source={require('../assets/profile-placeholder.png')} style={styles.profileImage} />
                <Text style={styles.name}>Angel Wang</Text>
                <Text style={styles.location}>Los Angeles, CA</Text>
            </View>

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

                onPress={() => navigation.navigate("ProfileSettings")}> 
                {/* NAVIGATING TO PROFILE SETTINGS*/}

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
        backgroundColor: COLORS.lightWhite,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontFamily: 'WorkSans-Regular',
    },
    location: {
        fontSize: 14,
        fontFamily: 'WorkSans-Regular',
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontFamily: 'WorkSans-Regular',
        color: COLORS.primary,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: '#666',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
        justifyContent: 'center',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'WorkSans-Regular',
        marginLeft: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'WorkSans-Regular',
        marginBottom: 10,
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    activityDetails: {
        flex: 1,
        marginLeft: 10,
    },
    activityTitle: {
        fontSize: 16,
        fontFamily: 'WorkSans-Regular',
    },
    activityDate: {
        fontSize: 14,
        fontFamily: 'WorkSans-Regular',
        color: '#666',
    },
    xpTag: {
        fontSize: 14,
        fontFamily: 'WorkSans-Regular',
        color: COLORS.primary,
    },
});

export default ProfileScreen;
