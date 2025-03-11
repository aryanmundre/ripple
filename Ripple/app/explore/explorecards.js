import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
// import Orientation from 'react-native-orientation-locker';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation, useRoute } from '@react-navigation/native'
import OrgCard from '../../components/explore/OrgCard.jsx';
import { COLORS, icons, images, SIZES } from "../../constants";
import styles from '../../styles/test.js';
import * as Font from 'expo-font';

// import MuseoModerno from '../../assets/fonts/MuseoModerno-SemiBold.ttf;'

import Container from '../../assets/icons/Container.svg'
import SearchIcon from '../../assets/icons/Search.svg';
import BackArrow from '../../assets/icons/BackArrow.svg';
import Waves from '../../assets/background/explore_wave.svg';

const ExploreCards = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orgs, setOrgs] = useState({});
  const [searchMode, setSearchMode] = useState(false)
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);

  
  const width = Dimensions.get('window').width;
  const height= Dimensions.get('window').height;
  const loadFonts = async () => {
    await Font.loadAsync({
      'default-font': require('../../assets/fonts/MuseoModerno-SemiBold.ttf'),
    });
    setFontsLoaded(true);
  };
  
  useEffect(() => {
    // Simulate fetching data from backend or API    
    loadFonts();    
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

    // Orientation.lockToPortrait(); //react native screen lock not compatible with expo-go
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  const renderOrgCards = () => {
    const orgList = [];
    for (let i = 0; i < orgs.length; i += 2) {
      const row = (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between',  flexWrap: 'wrap'}}>
          <OrgCard width={width} organization={orgs[i]} />
          <OrgCard width={width} organization={orgs[i + 1]} />
        </View>
      );
      orgList.push(row);
    }
    return orgList;
  };

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bg_color}}>
      {/* background layer */}
      <View style={{position:'absolute', flex: 1, bottom: 0, zIndex:-1}}>
        <Waves width={width} height={height*0.4}style={{zIndex: 0}}/>
      </View>
      {/* search mode */}
      { searchMode ? 
        (<>
          {/* search bar header */}
          <View style={{flexDirection: 'row', marginLeft: 8, marginTop: 8, marginRight: 15, zIndex: 1}}>
            <TouchableOpacity onPress={()=>{setSearchMode(false)}}>
              <BackArrow width={40} height={40} style={{top: 5}}/>
            </TouchableOpacity>
            <TextInput
                style={{ flex: 1, height: 40, margin: '2%', paddingLeft: 6, paddingRight: 6, color: 'rgb(39, 39, 39)', borderColor: 'rgba(153, 72, 72, 0.2)', borderRadius: 10, backgroundColor: COLORS.lightWhite}}
                placeholder="Search..."
                placeholderTextColor={'rbg(39, 39, 39'}
                value={search}
                ref={searchRef}
                onChangeText={setSearch} // Update search query when user types
            />
          </View>  
          
          {/* generated content */}
        </>)

        :
        (<ScrollView contentContainerStyle={{}}>
          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginLeft: 10, marginTop: 5, marginRight: 20, zIndex: 1}}>
            <TouchableOpacity>
              <Container width={40} height={40}/>
            </TouchableOpacity>
            <Text style={{alignItems: 'center', fontSize: 36, fontWeight: '600', color: COLORS.lightWhite, fontFamily: 'default-font'}}>Explore</Text>
            <TouchableOpacity
              onPress={()=>{ setSearchMode(true); setTimeout(()=> {if(searchRef.current){searchRef.current.focus()}}, 100); }}
            >
              <SearchIcon width={20} height={20}/>
            </TouchableOpacity>
          </View>

          {/* main content */}
          { loading ? (<ActivityIndicator size="large" color={COLORS.primary}/>) : renderOrgCards()}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
  
export default ExploreCards;