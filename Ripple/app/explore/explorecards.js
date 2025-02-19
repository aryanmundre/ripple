import { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { OrgCard } from '../../components';
import { COLORS, icons, images, SIZES } from "../../constants";
import styles from '../../styles/test.js';
import * as Font from 'expo-font';

import Container from '../../assets/icons/Container.svg'
import SearchIcon from '../../assets/icons/Search.svg';
import FirstWave from '../../assets/background/Light-wave.svg';
import SecondWave from '../../assets/background/Light-medium-wave.svg';
import ThirdWave from '../../assets/background/Dark-medium-wave.svg'
import FourthWave from '../../assets/background/Dark-wave.svg';

const ExploreCards = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orgs, setOrgs] = useState({});
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'default-font': require('../../assets/fonts/MuseoModerno-SemiBold.ttf'),
    });
    setFontsLoaded(true);
  };
  //backend get request --> populate state and fill out cards
  //based on design: each organization card will have a title, header picture, icon(?), register link, 
      //organizer, contact information, description, and location coordinates
      //users will have a favorite system? 
  
  useEffect(() => {
    // Simulate fetching data from backend or API
    setTimeout(() => {
      loadFonts();
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
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bg_color}}>
      {/* background layer */}
      <View style={{position: 'absolute', zIndex:-1}}>
        <FourthWave style={{zIndex:-4, right: 10, bottom: -240, transform:[{rotate: '-2deg'}]}}/>
        <ThirdWave style={{zIndex:-3, right: 60, bottom: 95, transform:[{rotate: '7deg'}]}}/>
        <SecondWave style={{zIndex:-2, right: 65, bottom: 420, transform:[{rotate: '-1deg'}]}}/>
        <FirstWave style={{zIndex:-1, right: 45, bottom: 630}}/>
      </View>

      {/* header */}
      <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginLeft: 10, marginTop: 5, marginRight: 20, zIndex: 1}}>
        <Container width={40} height={40}/>
        <Text style={{fontSize: 36, fontWeight: '600', color: COLORS.lightWhite, fontFamily: 'default-font'}}>Explore</Text>
        <SearchIcon width={20} height={20}/>
      </View>

      {/* main content */}
      {/* <ScrollView showsVerticalScrollIndicator={true}> */}
        <View style = {{flex: 1, padding: SIZES.medium, zIndex: 1}}>
          { loading ? 
            (<ActivityIndicator size = "large" color = {COLORS.primary} />) : 
            (
              <FlatList
                data={orgs}
                renderItem={({ item }) => (
                  <OrgCard key={item.id} organization={item} />
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