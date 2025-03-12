import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
// import Orientation from 'react-native-orientation-locker';
import * as ScreenOrientation from 'expo-screen-orientation';
import OrgCard from '../../components/explore/OrgCard.jsx';
import { COLORS, icons, images, SIZES } from "../../constants";
import * as Font from 'expo-font';


import Container from '../../assets/icons/Container.svg'
import SearchIcon from '../../assets/icons/Search.svg';
import BackArrow from '../../assets/icons/BackArrow.svg';
import Waves from '../../assets/background/explore_wave.svg';

const ExploreCards = () => {
  const [actions, setActions] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [search, setSearch] = useState('');
  const [nextPage, setNextPage] = useState(null);
  const searchRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const loadFonts = async () => {
    await Font.loadAsync({
      'default-font': require('../../assets/fonts/MuseoModerno-SemiBold.ttf'),
    });
    setFontsLoaded(true);
  };

  const fetchActions = async () => {
    try {
      const response = await fetch('https://ripple-z6px.onrender.com/api/actions/feed/');
      const data = await response.json();
      setActions(data.results);
      setFilteredActions(data.results);
      setNextPage(data.next);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching actions:', error);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (!text.trim()) {
      setFilteredActions(actions);
      return;
    }

    const searchTerms = text.toLowerCase().split(' ');
    const filtered = actions.filter(action => {
      const searchString = `${action.name} ${action.organization} ${action.category} ${action.action_type}`.toLowerCase();
      return searchTerms.every(term => searchString.includes(term));
    });
    setFilteredActions(filtered);
  };

  const loadMoreActions = async () => {
    if (!nextPage) return;
    
    try {
      const response = await fetch(nextPage);
      const data = await response.json();
      const newActions = [...actions, ...data.results];
      setActions(newActions);
      setFilteredActions(searchMode ? handleSearch(search) : newActions);
      setNextPage(data.next);
    } catch (error) {
      console.error('Error loading more actions:', error);
    }
  };
  
  useEffect(() => {
    loadFonts();
    fetchActions();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  const renderActionCards = () => {
    const actionsToRender = searchMode ? filteredActions : actions;
    const rows = [];
    for (let i = 0; i < actionsToRender.length; i += 2) {
      const row = (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {actionsToRender[i] && (<OrgCard width={width} organization={{
            id: actionsToRender[i].id,
            title: actionsToRender[i].name,
            headerImage: actionsToRender[i].thumbnail,
            name: actionsToRender[i].organization,
            category: actionsToRender[i].category,
            action_type: actionsToRender[i].action_type
          }} />)}
          {i + 1 < actionsToRender.length && (
            <OrgCard width={width} organization={{
              id: actionsToRender[i + 1].id,
              title: actionsToRender[i + 1].name,
              headerImage: actionsToRender[i + 1].thumbnail,
              name: actionsToRender[i + 1].organization,
              category: actionsToRender[i + 1].category,
              action_type: actionsToRender[i + 1].action_type
            }} />
          )}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  const NoResultsMessage = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <Text style={{ color: '#B8E1EB', fontSize: 16, fontFamily: 'default-font' }}>
        No activities found for "{search}"
      </Text>
    </View>
  );

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bg_color}}>
      {/* background layer */}
      <View style={{position:'absolute', flex: 1, bottom: 0, zIndex:-1}}>
        <Waves width={width} height={height*0.4} style={{zIndex: 0}}/>
      </View>
      {/* search mode */}
      { searchMode ? 
        (<>
          {/* search bar header */}
          <View style={{flexDirection: 'row', marginLeft: 8, marginTop: 8, marginRight: 15, zIndex: 1}}>
            <TouchableOpacity onPress={()=>{
              setSearchMode(false);
              setSearch('');
              setFilteredActions(actions);
            }}>
              <BackArrow width={40} height={40} style={{top: 5}}/>
            </TouchableOpacity>
            <TextInput
                style={{ flex: 1, height: 40, margin: '2%', paddingLeft: 6, paddingRight: 6, color: 'rgb(39, 39, 39)', borderColor: 'rgba(153, 72, 72, 0.2)', borderRadius: 10, backgroundColor: COLORS.lightWhite}}
                placeholder="Search activities..."
                placeholderTextColor={'rgb(39, 39, 39)'}
                value={search}
                ref={searchRef}
                onChangeText={handleSearch}
                autoFocus={true}
            />
          </View>  
          
          {/* generated content */}
          <ScrollView contentContainerStyle={{}}>
            {filteredActions.length > 0 ? renderActionCards() : <NoResultsMessage />}
          </ScrollView>
        </>)
        :
        (<ScrollView 
          contentContainerStyle={{}}
          onScroll={({nativeEvent}) => {
            const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
            const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
            if (isEndReached && !loading) {
              loadMoreActions();
            }
          }}
          scrollEventThrottle={400}
        >
          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginLeft: 10, marginTop: 5, marginRight: 20, zIndex: 1}}>
            <TouchableOpacity>
              <Container width={40} height={40}/>
            </TouchableOpacity>
            <Text style={{alignItems: 'center', fontSize: 34, fontWeight: '600', color: COLORS.lightWhite, fontFamily: 'default-font'}}>Explore</Text>
            <TouchableOpacity
              onPress={()=>{ setSearchMode(true); setTimeout(()=> {if(searchRef.current){searchRef.current.focus()}}, 100); }}
            >
              <SearchIcon width={20} height={20}/>
            </TouchableOpacity>
          </View>

          {/* main content */}
          { loading ? (<ActivityIndicator size="large" color={COLORS.primary}/>) : renderActionCards()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default ExploreCards;