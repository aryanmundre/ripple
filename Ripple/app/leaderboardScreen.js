import {React, useEffect, useRef, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import * as Font from 'expo-font';
import { COLORS } from '../constants/index.js';
import Waves from '../assets/background/explore_wave.svg';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LeaderboardScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Friend');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const loadFonts = async () => {
    try {
      console.log('Starting to load fonts...');
      const fonts = {
        'MuseoModerno-SemiBold': require('../assets/fonts/MuseoModerno-SemiBold.ttf'),
        'MuseoModerno-Bold': require('../assets/fonts/MuseoModerno-Bold.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
      };
      console.log('Font files required:', fonts);
      await Font.loadAsync(fonts);
      console.log('Fonts loaded successfully');
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
      console.error('Error details:', error.message);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const tabs = ['Friend', 'Local', 'World'];
  
  const leaderboardData = [
    { rank: 2, name: 'Megan', xp: 400, podium: true },
    { rank: 1, name: 'Jeffrey', xp: 415, podium: true },
    { rank: 3, name: 'Aahil', xp: 380, podium: true },
    { rank: 4, name: 'Jonathan', xp: 307 },
    { rank: 5, name: 'You', xp: 280 },
    { rank: 6, name: 'Aryan', xp: 279 },
    { rank: 7, name: 'Hajeong', xp: 257 },
    { rank: 8, name: 'Gautam', xp: 230 },
    { rank: 9, name: 'Ashley', xp: 230 },
    { rank: 10, name: 'Angel', xp: 230 },
  ];

  const renderPodium = () => {
    const podiumUsers = leaderboardData.filter(user => user.podium);
    const [second, first, third] = podiumUsers;

    return (
      <View style={styles.podiumContainer}>
        {/* Second Place */}
        <View style={[styles.podiumItem, { marginTop: 40 }]}>
          <View style={styles.profileImageContainer}>
            <Image source={require('../assets/profile-placeholder.png')} style={styles.profileImage} />
          </View>
          <Text style={styles.podiumName}>{second.name}</Text>
          <View style={[styles.podiumBase, styles.secondPlace]}>
            <Text style={styles.podiumRank}>2</Text>
            <Text style={styles.podiumXP}>{second.xp} XP</Text>
          </View>
        </View>

        {/* First Place */}
        <View style={styles.podiumItem}>
          <View style={styles.profileImageContainer}>
            <Image source={require('../assets/profile-placeholder.png')} style={styles.profileImage} />
          </View>
          <Text style={styles.podiumName}>{first.name}</Text>
          <View style={[styles.podiumBase, styles.firstPlace]}>
            <Text style={styles.firstPlaceRank}>1</Text>
            <Text style={styles.podiumXP}>{first.xp} XP</Text>
          </View>
        </View>

        {/* Third Place */}
        <View style={[styles.podiumItem, { marginTop: 60 }]}>
          <View style={styles.profileImageContainer}>
            <Image source={require('../assets/profile-placeholder.png')} style={styles.profileImage} />
          </View>
          <Text style={styles.podiumName}>{third.name}</Text>
          <View style={[styles.podiumBase, styles.thirdPlace]}>
            <Text style={styles.podiumRank}>3</Text>
            <Text style={styles.podiumXP}>{third.xp} XP</Text>
          </View>
        </View>
      </View>
    );
  };

  const animateTabChange = (newTab) => {
    const tabIndex = tabs.indexOf(newTab);
    
    // Slide animation for the white bubble
    Animated.timing(slideAnim, {
      toValue: tabIndex,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Content fade animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setSelectedTab(newTab);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {fontsLoaded ? (
        <>
          <View style={styles.background}>
            <Waves width={width} height={height * 0.4} />
          </View>

          <Text style={styles.title}>Leaderboard</Text>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <Animated.View style={[
              styles.selectedTabBackground,
              {
                transform: [{
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, 113, 226]
                  })
                }]
              }
            ]} />
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                ]}
                onPress={() => animateTabChange(tab)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab && styles.selectedTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Animated.ScrollView 
            style={[
              styles.scrollView,
              { opacity: fadeAnim }
            ]}
          >
            {renderPodium()}

            {/* Leaderboard List */}
            <View style={styles.listContainer}>
              {leaderboardData.slice(3).map((item) => (
                <View key={item.rank} style={styles.listItem}>
                  <Text style={styles.rankText}>{item.rank}</Text>
                  <View style={styles.listProfileContainer}>
                    <Image source={require('../assets/profile-placeholder.png')} style={styles.listProfileImage} />
                  </View>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <View style={styles.xpBadge}>
                    <Text style={styles.xpText}>{item.xp} XP</Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
  },
  background: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'MuseoModerno-SemiBold',
  },
  tabContainer: {
    flexDirection: 'row',
    width: 345,
    height: 38,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    padding: 3,
    marginTop: 8,
    position: 'relative',
  },
  selectedTabBackground: {
    position: 'absolute',
    width: 113,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 30,
    left: 3,
    top: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    zIndex: 1,
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'MuseoModerno-SemiBold',
  },
  selectedTabText: {
    color: '#1e3a8a',
    fontFamily: 'MuseoModerno-SemiBold',
  },
  scrollView: {
    flex: 1,
    marginTop: 15,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 0,
    paddingHorizontal: 20,
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: 22,
    width: 65,
  },
  profileImageContainer: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.8,
    borderColor: '#AFB1B6',
    marginBottom: 6,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  listProfileContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.8,
    borderColor: '#AFB1B6',
    marginLeft: 60,
  },
  listProfileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  podiumName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    marginTop: -3,
    fontFamily: 'Lato-Bold',
  },
  podiumBase: {
    width: 65,
    height: 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstPlace: {
    backgroundColor: '#ef4444',
    height: 88,
  },
  secondPlace: {
    backgroundColor: '#22c55e',
    height: 68,
  },
  thirdPlace: {
    backgroundColor: '#60a5fa',
    height: 61,
  },
  podiumRank: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'MuseoModerno-Bold',
    marginBottom: 2,
    marginTop: -10,
  },
  firstPlaceRank: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
    fontFamily: 'MuseoModerno-Bold',
    marginBottom: 2,
    marginTop: -20,
  },
  podiumXP: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'MuseoModerno-Bold',
    marginTop: -10,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 0,
    marginBottom: 8,
    height: 59,
    width: 345,
    alignSelf: 'center',
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    left: 25,
    color: '#000',
    fontFamily: 'MuseoModerno-SemiBold',
  },
  nameText: {
    fontSize: 16,
    marginLeft: 19,
    color: '#000',
    fontFamily: 'Lato-Bold',
  },
  xpBadge: {
    backgroundColor: '#7CBDEA',
    width: 70,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 14,
  },
  xpText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'MuseoModerno-Bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    padding: 10,
  },
});

export default LeaderboardScreen;
