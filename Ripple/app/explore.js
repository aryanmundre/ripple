import { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { COLORS, SIZES } from "../constants";

const ExploreScreen = () => {
    const navigation = useNavigation();
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load fonts
    const [fontsLoaded] = useFonts({
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    });

    useEffect(() => {
        fetchActions();
    }, []);

    const fetchActions = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/actions/trending/');
            if (!response.ok) {
                throw new Error('Failed to fetch actions');
            }
            const data = await response.json();
            setActions(data);
        } catch (err) {
            console.error("Error fetching data:", err.message);

            // ✅ Fallback data if API request fails
            setActions([
                {
                    id: 1,
                    name: 'Tree Planting Drive',
                    organization: 'Eco Warriors',
                    category: 'Environmental',
                    action_type: 'Community Service',
                    thumbnail: 'https://example.com/tree-planting.jpg',
                },
                {
                    id: 2,
                    name: 'Blood Donation Camp',
                    organization: 'Red Cross',
                    category: 'Medical Assistance',
                    action_type: 'Donation',
                    thumbnail: 'https://example.com/blood-donation.jpg',
                },
                {
                    id: 3,
                    name: 'Food Distribution Drive',
                    organization: 'Food for All',
                    category: 'Food Security',
                    action_type: 'Community Aid',
                    thumbnail: 'https://example.com/food-distribution.jpg',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("OrganizationDetails", { id: item.id })}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.provider}>{item.organization}</Text>
                <Text style={styles.category}>{item.category}</Text>
            </View>
        </TouchableOpacity>
    );

    // Wait for fonts to load before rendering UI
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : actions.length === 0 ? (
                <Text style={styles.error}>No actions available.</Text>
            ) : (
                <FlatList
                    contentContainerStyle={{ padding: SIZES.medium }}
                    data={actions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: COLORS.lightWhite,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    infoContainer: {
        marginLeft: 20,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontFamily: 'WorkSans-Regular',
    },
    provider: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: '#666',
        marginTop: 4,
    },
    category: {
        fontSize: 12,
        color: '#007AFF',
        marginTop: 2,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ExploreScreen;
