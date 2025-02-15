import { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { TestComponent, Login, ScreenHeaderBackBtn, OrgCard } from '../../components';
import { COLORS, icons, images, SIZES } from "../../constants";
import styles from '../../styles/test.js';

const ExploreCards = () => {
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
              title: 'Blood Donation',
              headerImage: 'https://via.placeholder.com/150',
              profile_picture: 'https://example.com/icon1.png',
              name: 'American Red Cross',
            },
            {
              id: 2,
              title: 'Org 2',
              headerImage: 'https://example.com/header2.jpg',
              profile_picture: 'https://example.com/icon2.png',
              name: 'Description for Org 2',
            },
            {
              id: 3,
              title: 'Ecoasia',
              headerImage: 'https://via.placeholder.com/150',
              profile_picture: 'https://example.com/icon1.png',
              name: 'I want to plant treees',
          },
          {
              id: 4,
              title: 'Org 4',
              headerImage: 'https://example.com/header2.jpg',
              profile_picture: 'https://example.com/icon2.png',
              name: 'This is the 4th org',
          },
            // Add more organizations as needed
            ]);
            setLoading(false);
        }, 2000); // Simulating a delay for fetching
    }, []);

    return(
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen 
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBackBtn handlePress={() => router.back()}/>
            )
          }}
        />

        
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View style = {{flex: 1, padding: SIZES.medium}}>
            {
            loading ? (
                <ActivityIndicator size = "large" color = {COLORS.primary} />
            ) : (
                  <FlatList
                    data={orgs}
                    renderItem={({ item }) => (
                      <OrgCard key={item.id} organization={item} />
                    //   item.map((org) => {
                    //     console.log(item)
                    //     return (<OrgCard key={item.id} organization={item} />)
                    //   })
                    // )
                    )} 
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Automatically creates 2 cards per row
                    contentContainerStyle={styles.cardList}
                  />
                )
            }
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    )
  }
  
export default ExploreCards;