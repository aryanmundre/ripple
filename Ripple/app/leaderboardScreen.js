import {React, useEffect, useRef} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';

import Waves from '../assets/background/explore_wave.svg';

// import styles from '../../styles/test.js';
import * as Font from 'expo-font';
import { COLORS } from '../constants/index.js';
import FirstRect from '../assets/icons/leaderboard/Firstplace.svg'
import SecondRect from '../assets/icons/leaderboard/Secondplace.svg'
import ThirdRect from '../assets/icons/leaderboard/Thirdplace.svg'

const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

const LeaderboardScreen = () => {
  const svgRef = useRef(null);
  

  const loadFonts = async () => {
    await Font.loadAsync({
    'default-font': require('../assets/fonts/MuseoModerno-SemiBold.ttf'),
    });
    setFontsLoaded(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bg_color}}>
      {/* header */}
      <View style={{position:'absolute', flex: 1, bottom: 0, zIndex:-1}}>
        <Waves width={width} height={height*0.4} style={{zIndex: 0}}/>
      </View>
        {/* headers */}
      <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 5, zIndex: 1}}>
        <Text style={{alignItems: 'center', fontSize: 36, fontWeight: '600', color: COLORS.lightWhite, fontFamily: 'default-font'}}>Leaderboard</Text>
      </View>

      {/* screen state */}
      <View>
        
      </View>
      {/* leaderboard */}
      <ScrollView>
        <View  style={{flex: 1, alignItems: 'center',}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
          {/* second podium */}
          <View style={{alignItems: 'center', margin: '1%', padding: '1%'}}>
            <SecondRect/>
            <Text style={styles.placementText}>2</Text>
            <Text style={styles.xpText}>400 xp</Text>
          </View>
          {/* first podium */}          
          <View style={{alignItems: 'center', margin: '1%', padding: '1%'}}>
            <FirstRect/>
            <Text style={styles.placementText}>1</Text>
            <Text style={styles.xpText}>800 xp</Text>
          </View>
          {/* third podium */}
          <View style={{alignItems: 'center', margin: '1%', padding: '1%'}}>
            <ThirdRect/>
            <Text style={styles.placementText}>3</Text>
            <Text style={styles.xpText}>100 xp</Text>
          </View>
        </View>
        <View style={{top: '-10%', alignItems: 'center',}}>
          <View style={{borderRadius: 15, flexDirection: 'row', alignItems:'center', width: width*0.8, height: height*0.065, paddingHorizontal: '5%', marginVertical: '1%', backgroundColor: COLORS.lightWhite}}>
            <Text>4</Text>
            <Text>Jonathan</Text>
            <Text>300 xp</Text>
          </View>
          <View style={{borderRadius: 15, flexDirection: 'row', alignItems:'center', width: width*0.8, height: height*0.065, paddingHorizontal: '5%', marginVertical: '1%', backgroundColor: COLORS.lightWhite}}>
            <Text>5</Text>
            <Text>UCLA</Text>
            <Text>100 xp</Text>
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placementText: {
    position: 'absolute', 
    top: '5%', 
    fontSize:'50', 
    fontFamily: 'default-font',
    color: COLORS.lightWhite,
  },
  xpText: {
    position: 'absolute', 
    top: '50%', 
    fontSize:'14', 
    fontFamily: 'default-font',
    color: COLORS.lightWhite,
  }
});

export default LeaderboardScreen;
