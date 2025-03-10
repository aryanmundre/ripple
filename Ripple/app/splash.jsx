import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import Logo from '../assets/icons/logo.svg';
import Wave from '../assets/icons/reverseWave.svg';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Signin');
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo width={100} height={100} style={styles.logo} />
        <Text style={styles.title}>Ripple</Text>
        <Text style={styles.description}>
          Small waves or undulations,{'\n'}
          often on water, or a spreading{'\n'}
          effect from a small initial{'\n'}
          action.
        </Text>
      </View>
      <View style={styles.waveContainer}>
        <Wave width={width} height={200} preserveAspectRatio="none" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  description: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    lineHeight: 24,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default SplashScreen; 