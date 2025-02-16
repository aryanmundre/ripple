import { useState, useEffect } from 'react';
import { View, SafeAreaView, Button, ActivityIndicator, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { ScreenHeaderBtn } from '../components';
import { COLORS, SIZES } from "../constants";

const ExploreScreen = () => {
    const router = useRouter();
    const [actions, setActions] = useState([]);
    const [likedActions, setLikedActions] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            setError(err.message);
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

    const toggleLike = (id) => {
        setLikedActions((prev) => {
            const newLikes = new Set(prev);
            if (newLikes.has(id)) {
                newLikes.delete(id);
            } else {
                newLikes.add(id);
            }
            return newLikes;
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.provider}>{item.organization}</Text>
                <Text style={styles.category}>{item.category}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.likeButton}>
                <FontAwesome name={likedActions.has(item.id) ? "star" : "star-o"} size={24} color={likedActions.has(item.id) ? "gold" : "gray"} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return(
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen 
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn/>
            )
          }}
        />

        <FlatList
          contentContainerStyle={{ padding: SIZES.medium }}
          data={actions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
              {error && <Text style={styles.error}>{error} - Using fallback data</Text>}
            </>
          }
        />
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
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
        fontFamily: 'Roboto-Regular',
        color: '#007AFF',
        marginTop: 2,
    },
    likeButton: {
        padding: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ExploreScreen;
