import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView, 
  Dimensions,
} from 'react-native';

//import { useFonts, MuseoModerno_400Regular } from '@expo-google-fonts/museomoderno';
//import { useNavigation } from '@react-navigation/native';

//import SvgWave from '../assets/icons/Wave.svg';
//import BackArrow from '../assets/icons/BackArrow.svg'; 
import { COLORS } from '../constants'; 

const { width, height } = Dimensions.get('window');

const ProfileSettings = () => {
    return (
      <ScrollView style={styles.container}>
        {/* Header / Banner */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/profile-placeholder.png')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Angel Wang</Text>
        </View>
  
        {/* Example fields (not fully styled) */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.label}>Preferred Name</Text>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.label}>Location</Text>
        </View>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite || '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 130,
    paddingBottom: 20,
    backgroundColor: '#B8E1EB', //placeholder
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    padding: 20,
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