import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView, 
  Dimensions,
} from 'react-native';

import { useFonts, MuseoModerno_700Bold, } from '@expo-google-fonts/museomoderno';
import { MuseoModerno_400Regular, } from "@expo-google-fonts/museomoderno";
//import { useNavigation } from '@react-navigation/native';

//import SvgWave from '../assets/icons/Wave.svg';
//import BackArrow from '../asseits/icons/BackArrow.svg'; 

import Waves2 from '../assets/icons/Waves2.svg';
import { COLORS } from '../constants'; 

const { width, height } = Dimensions.get('window');

const ProfileSettings = () => {
const [fontsLoaded] = useFonts({
  MuseoModerno_700Bold,
  MuseoModerno_400Regular,
});


  return (
    <View style={styles.container}>
      {/* Back Button & Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile Setting</Text>
      </View>

      {/* Wave Background */}
      <View style={styles.waveContainer}>
        <Waves2 width={width} height={390} style={{ position: 'absolute', top: 0 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header / Banner */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/profile-placeholder.png')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Angel Wang</Text>
        </View>

        {/* Example fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.label}>Preferred Name</Text>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.label}>Location</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  header: {
    position: 'absolute',
    top: 50, // Adjust for status bar
    left: 20,
    right: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontFamily: 'MuseoModerno_700Bold',
    color: '#000',
    textAlign: 'center',
  },

  formContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40,

  },

  waveContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    width: '100%',
    height: 500, // Adjust to fit your wave size
   //zIndex: -1, // Ensure it stays behind other content
  },

  scrollContainer: {
    paddingBottom: 50, // Prevent overlap with the wave
  },

  headerContainer: {
    alignItems: 'center',
    paddingTop: 110,
    paddingBottom: 20,
    backgroundColor: 'transparent', 
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom:10,
  },
  name: {
    fontSize: 22,
    //fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  
  label: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
  textInput: {
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default ProfileSettings;