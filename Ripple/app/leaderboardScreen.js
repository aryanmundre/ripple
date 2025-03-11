import {React, useEffect, useRef, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import * as Font from 'expo-font';
import { COLORS } from '../constants/index.js';
import Waves from '../assets/background/explore_wave.svg';

const { width, height } = Dimensions.get('window');
// Base dimensions (based on iPhone 12)
const baseWidth = 390;
const baseHeight = 844;

// Scaling functions
const scale = size => (width / baseWidth) * size;
const verticalScale = size => (height / baseHeight) * size;

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
    fontSize: scale(36),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: verticalScale(5),
    fontFamily: 'MuseoModerno-SemiBold',
  },
  tabContainer: {
    flexDirection: 'row',
    width: scale(345),
    height: verticalScale(38),
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: scale(30),
    padding: scale(3),
    marginTop: verticalScale(8),
    position: 'relative',
  },
  selectedTabBackground: {
    position: 'absolute',
    width: scale(113),
    height: verticalScale(32),
    backgroundColor: '#fff',
    borderRadius: scale(30),
    left: scale(3),
    top: verticalScale(3),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(30),
    zIndex: 1,
  },
  tabText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '500',
    fontFamily: 'MuseoModerno-SemiBold',
  },
  selectedTabText: {
    color: '#1e3a8a',
    fontFamily: 'MuseoModerno-SemiBold',
  },
  scrollView: {
    flex: 1,
    marginTop: verticalScale(15),
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 0,
    paddingHorizontal: scale(20),
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: scale(22),
    width: scale(65),
  },
  profileImageContainer: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(27.5),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1.8),
    borderColor: '#AFB1B6',
    marginBottom: verticalScale(6),
  },
  profileImage: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(27.5),
  },
  listProfileContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1.8),
    borderColor: '#AFB1B6',
    marginLeft: scale(60),
  },
  listProfileImage: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
  },
  podiumName: {
    color: '#fff',
    fontSize: scale(16),
    marginBottom: verticalScale(5),
    marginTop: verticalScale(-3),
    fontFamily: 'Lato-Bold',
  },
  podiumBase: {
    width: scale(65),
    height: verticalScale(60),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstPlace: {
    backgroundColor: '#ef4444',
    height: verticalScale(88),
  },
  secondPlace: {
    backgroundColor: '#22c55e',
    height: verticalScale(68),
  },
  thirdPlace: {
    backgroundColor: '#60a5fa',
    height: verticalScale(61),
  },
  podiumRank: {
    color: '#fff',
    fontSize: scale(32),
    fontWeight: 'bold',
    fontFamily: 'MuseoModerno-Bold',
    marginBottom: verticalScale(2),
    marginTop: verticalScale(-10),
  },
  firstPlaceRank: {
    color: '#fff',
    fontSize: scale(44),
    fontWeight: 'bold',
    fontFamily: 'MuseoModerno-Bold',
    marginBottom: verticalScale(2),
    marginTop: verticalScale(-20),
  },
  podiumXP: {
    color: '#fff',
    fontSize: scale(10),
    fontFamily: 'MuseoModerno-Bold',
    marginTop: verticalScale(-10),
  },
  listContainer: {
    paddingHorizontal: scale(20),
    marginTop: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(22),
    padding: 0,
    marginBottom: verticalScale(8),
    height: verticalScale(59),
    width: scale(345),
    alignSelf: 'center',
  },
  rankText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    position: 'absolute',
    left: scale(25),
    color: '#000',
    fontFamily: 'MuseoModerno-SemiBold',
  },
  nameText: {
    fontSize: scale(16),
    marginLeft: scale(19),
    color: '#000',
    fontFamily: 'Lato-Bold',
  },
  xpBadge: {
    backgroundColor: '#7CBDEA',
    width: scale(70),
    height: verticalScale(30),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scale(14),
  },
  xpText: {
    color: '#fff',
    fontSize: scale(14),
    fontFamily: 'MuseoModerno-Bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: verticalScale(15),
    backgroundColor: '#fff',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  navItem: {
    padding: scale(10),
  },
});

export default LeaderboardScreen;