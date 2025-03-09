import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView, 
  Dimensions,
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Picker } from '@react-native-picker/picker';
import { useFonts, MuseoModerno_700Bold, } from '@expo-google-fonts/museomoderno';
import { MuseoModerno_400Regular, } from "@expo-google-fonts/museomoderno";
import { useNavigation } from '@react-navigation/native';

import Waves2 from '../assets/icons/Waves2.svg';
import BackArrow from '../assets/icons/BackArrow.svg'; 
import { COLORS } from '../constants'; 

const { width } = Dimensions.get('window');

const ProfileSettings = () => {
const [fontsLoaded] = useFonts({
  MuseoModerno_700Bold,
  MuseoModerno_400Regular,
});

const navigation = useNavigation();

const [name, setName] = useState('');
const [preferredName, setPreferredName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [location, setLocation] = useState('');
const [state, setState] = useState('');
const [passionateCause, setPassionateCause] = useState('');

  return (
    <View style={styles.container}>
      {/* Back Button & Title */}
      <View style={styles.header}>

      <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackArrow width={24} height={24} />
        </TouchableOpacity>

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

          {/* Form Fields */}
          <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            style={styles.textInput} 
            value={name} 
            onChangeText={setName} 
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Preferred Name</Text>
          <TextInput 
            style={styles.textInput} 
            value={preferredName} 
            onChangeText={setPreferredName} 
            placeholder="Enter your preferred name"
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            style={styles.textInput} 
            value={email} 
            onChangeText={setEmail} 
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
          />


        
          <Text style={styles.label}>Location</Text>
          <GooglePlacesAutocomplete
            style={styles.textInput} 
            value={location} 
            onChangeText={setLocation} 
            placeholder="Enter your location"
            fetchDetails={true}
            minLength={2}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // e.g. details.formatted_address, details.geometry, etc.
              /*const address = data.description;
              setLocation(address);*/
              setLocation(data.description);
            }}
            query={{
              key: 'AIzaSyCYHJ-55KUnrM4XT8neLkUTPNDRSkiF6V0', // <--- Replace with your key
              language: 'en',
            }}
        
            styles={{
              textInputContainer: {
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                marginTop: 5,
              },
              textInput: {
                ...styles.textInput,
                fontSize: 14,
                color: '#333',
              },
              listView: {
                backgroundColor: '#fff',
              },
            }}
            textInputProps={{
              value: location,
              onChangeText: text => setLocation(text),
              placeholderTextColor: '#999',
            }}
          />

          {/* Passionate Causes Dropdown */}
          <Text style={styles.label}>Passionate Causes</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={passionateCause}
              onValueChange={(itemValue) => setPassionateCause(itemValue)}
            >
              <Picker.Item label="Select a cause" value="" />
              <Picker.Item label="Environment Conservation" value="environment" />
              <Picker.Item label="Animal Welfare" value="animals" />
              <Picker.Item label="Education & Tutoring" value="education" />
              <Picker.Item label="Community Outreach" value="outreach" />
            </Picker>
          </View>


          {/* Delete Account & Save Changes Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>


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

  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
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

  label: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
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

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 5,
    height: 45, // Smaller height
    justifyContent: 'center',
    paddingHorizontal: 10, // Tighter padding
    overflow: 'hidden',
  },
  
  picker: {
    height: 45,
    fontSize: 14, // Smaller font size
    color: '#333', // Darker text color for better visibility
  },
  
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20, // ✅ Separate from dropdown
    zIndex: 1, // ✅ Lower zIndex so dropdown appears above buttons
  },
  
  deleteButton: {
    padding: 10,
  },
  
  deleteText: {
    color: 'red',
    fontSize: 16,
  },
  
  saveButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
  },
  
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
  

});

export default ProfileSettings;