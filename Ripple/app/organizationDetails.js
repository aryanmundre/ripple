import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import SvgBackArrow from '../assets/icons/BackArrow.svg'; 
import { COLORS } from '../constants';

const OrganizationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { organizationId } = route.params; // Get the ID from navigation params
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrganizationDetails();
    }, []);

    const fetchOrganizationDetails = async () => {
        const baseURL = 'http://127.0.0.1:8000/api'; // Change to local IP if using a physical device
        const apiURL = `${baseURL}/organizations/${organizationId}/`;

        try {
            const response = await fetch(apiURL);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setOrganization(data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            
            // ✅ Explicitly setting fallback data
            setOrganization({
                id: 1,
                name: 'Blood Donation',
                xp: 50,
                orgName: 'American Red Cross',
                orgLogo: 'https://example.com/red-cross-logo.png',
                thumbnail: 'https://example.com/blood-donation.jpg',
                description: 'Join us for a blood donation drive and save lives!',
                organizer: 'Aryan Mundre',
                location: 'Los Angeles, CA',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            {/* Thumbnail Image with Back Button */}
            <View>
                <Image source={{ uri: organization.thumbnail }} style={styles.image} />
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <SvgBackArrow width={24} height={24} fill="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>
                    {organization.name} <Text style={styles.xp}>{organization.xp}XP</Text>
                </Text>
                <TouchableOpacity>
                    <FontAwesome name="star-o" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.orgInfo}>
                <Image source={{ uri: organization.orgLogo }} style={styles.orgLogo} />
                <Text style={styles.orgName}>{organization.orgName}</Text>
            </View>

            <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>The Team</Text>
                <View style={styles.organizerRow}>
                    <FontAwesome name="user-circle-o" size={24} color="#aaa" />
                    <View style={styles.organizerDetails}>
                        <Text style={styles.organizerName}>{organization.organizer}</Text>
                        <Text style={styles.organizerFrom}>From: {organization.orgName}</Text>
                    </View>
                    <TouchableOpacity style={styles.contactButton}>
                        <FontAwesome name="envelope-o" size={16} color={COLORS.primary} />
                        <Text style={styles.contactText}>Contact Organizer</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{organization.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    backButton: {
        position: 'absolute',
        top: 40, 
        left: 20,
        padding: 5, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    xp: {
        fontSize: 16,
        color: COLORS.primary,
    },
    orgInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    orgLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    orgName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    registerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    organizerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    organizerDetails: {
        marginLeft: 10,
        flex: 1,
    },
    organizerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    organizerFrom: {
        fontSize: 14,
        color: '#666',
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 8,
        borderRadius: 6,
    },
    contactText: {
        color: COLORS.primary,
        marginLeft: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});

export default OrganizationScreen;
