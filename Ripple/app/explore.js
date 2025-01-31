import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { TestComponent, Login, ScreenHeaderBtn, OrgCard } from '../components';
import { COLORS, icons, images, SIZES } from "../constants";


const Home = () => {
    const router = useRouter();
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orgs, setOrgs] = useState({});
    
    //backend get request --> populate state and fill out cards
    //based on design: each organization card will have a title, header picture, icon(?), register link, 
        //organizer, contact information, description, and location coordinates
        //users will have a favorite system? 
    useEffect(() => {
        // Simulate fetching data from backend or API
        setTimeout(() => {
        setOrgs([
            {
                id: 1,
                title: 'Org 1',
                headerImage: 'https://example.com/header1.jpg',
                profile_picture: 'https://example.com/icon1.png',
                name: 'Description for Org 1',
            },
            {
                id: 2,
                title: 'Org 2',
                headerImage: 'https://example.com/header2.jpg',
                profile_picture: 'https://example.com/icon2.png',
                name: 'Description for Org 2',
            },
            // Add more organizations as needed
            ]);
            setLoading(false);
        }, 2000); // Simulating a delay for fetching
    }, []);
        
    const handleGoHome = () => {
        router.push('/');
    };

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

        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style = {{flex: 1, padding: SIZES.medium}}>
            {
            loading ? (
                <ActivityIndicator size = "large" color = {COLORS.primary} />
            ) : (
                orgs.map((org) => (
                    <OrgCard key = {org.id} organization = {org} />
                ))
                )
            }
            <Button title="Go back home" onPress={() => router.push('/')} />
            <TestComponent />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
export default Home;