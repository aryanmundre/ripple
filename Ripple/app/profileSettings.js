import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, ScrollView, FlatList, Alert, Animated, Platform, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { 
  MuseoModerno_700Bold,
  MuseoModerno_400Regular,
} from "@expo-google-fonts/museomoderno";
import {
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import Waves2 from '../assets/icons/Waves2.svg';
import BackArrow from '../assets/icons/BackArrow.svg'; 
import { COLORS } from '../constants'; 

const { width } = Dimensions.get('window');

const ProfileSettings = ({ navigation }) => {
const [fontsLoaded] = useFonts({
  MuseoModerno_700Bold,
  MuseoModerno_400Regular,
  Lato_400Regular,
});

const [name, setName] = useState('');
const [preferredName, setPreferredName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [location, setLocation] = useState('');
const [state, setState] = useState('');
const [passionateCause, setPassionateCause] = useState('');
const [streetAddress, setStreetAddress] = useState('');
const [zipCode, setZipCode] = useState('');
const [secondaryCause, setSecondaryCause] = useState('');
const [additionalCause, setAdditionalCause] = useState('');
const [scrollY] = useState(new Animated.Value(0));
const headerOpacity = scrollY.interpolate({
  inputRange: [0, 50],
  outputRange: [1, 0],
  extrapolate: 'clamp',
});

const [showPassword, setShowPassword] = useState(false);
const [city, setCity] = useState('');

  // Load saved profile data when component mounts
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setName(profileData.name || '');
        setPreferredName(profileData.preferredName || '');
        setEmail(profileData.email || '');
        setStreetAddress(profileData.streetAddress || '');
        setCity(profileData.city || '');
        setZipCode(profileData.zipCode || '');
        setState(profileData.state || '');
        setPassionateCause(profileData.passionateCause || '');
        setSecondaryCause(profileData.secondaryCause || '');
        setAdditionalCause(profileData.additionalCause || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const profileData = {
        name,
        preferredName,
        email,
        streetAddress,
        city,
        zipCode,
        state,
        passionateCause,
        secondaryCause,
        additionalCause,
      };

      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      
      Alert.alert(
        'Success',
        'Your profile has been updated successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to save profile changes. Please try again.',
        [{ text: 'OK' }]
      );
      console.error('Error saving profile:', error);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you would like to delete your account?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            // Future implementation for account deletion
            console.log('Account deletion to be implemented');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderLocationInput = useCallback(() => (
    <View style={styles.locationContainer}>
    </View>
  ), []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <BackArrow width={24} height={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Profile Setting</Text>
      </Animated.View>

      {/* Wave Background */}
      <View style={styles.waveContainer}>
        <Waves2 width={width} height={390} style={{ position: 'absolute', top: 0 }} />
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header / Banner */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/profile-placeholder.png')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{name || 'Enter your name'}</Text>
        </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.textInput} 
              value={name} 
              onChangeText={setName} 
              placeholder="Enter your name"
              placeholderTextColor="#A9A9A9"
            />
            <FontAwesome name="pencil" size={16} color="#A9A9A9" style={styles.editIcon} />
          </View>

          <Text style={styles.label}>Preferred Name</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.textInput} 
              value={preferredName} 
              onChangeText={setPreferredName} 
              placeholder="Enter your preferred name"
              placeholderTextColor="#A9A9A9"
            />
            <FontAwesome name="pencil" size={16} color="#A9A9A9" style={styles.editIcon} />
          </View>

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.textInput} 
              value={email} 
              onChangeText={setEmail} 
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#A9A9A9"
            />
            <FontAwesome name="pencil" size={16} color="#A9A9A9" style={styles.editIcon} />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
              <FontAwesome 
                name={showPassword ? "eye" : "eye-slash"} 
                size={16} 
                color="#A9A9A9" 
                style={styles.editIcon} 
              />
            </TouchableOpacity>
          </View>
        
          <Text style={styles.label}>Location</Text>
          <View style={styles.locationRowContainer}>
            <View style={[styles.inputContainer, styles.streetAddressContainer]}>
              <TextInput 
                style={styles.textInput}
                value={streetAddress}
                onChangeText={setStreetAddress}
                placeholder="Street Address"
                placeholderTextColor="#A9A9A9"
              />
              <FontAwesome name="pencil" size={16} color="#A9A9A9" style={styles.editIcon} />
            </View>
          </View>

          <View style={[styles.locationRowContainer, { marginTop: 10 }]}>
            <View style={[styles.inputContainer, styles.cityContainer]}>
              <TextInput 
                style={styles.textInput}
                value={city}
                onChangeText={setCity}
                placeholder="City"
                placeholderTextColor="#A9A9A9"
              />
              <FontAwesome name="pencil" size={16} color="#A9A9A9" style={styles.editIcon} />
            </View>
            <View style={[styles.inputContainer, styles.zipCodeContainer]}>
              <TextInput 
                style={styles.textInput}
                value={zipCode}
                onChangeText={setZipCode}
                placeholder="Zip code"
                placeholderTextColor="#A9A9A9"
                keyboardType="numeric"
              />
              <FontAwesome name="pencil" size={16} color="#A9A9A9" style={styles.editIcon} />
            </View>
          </View>

          <View style={styles.statePickerContainer}>
            <Picker
              selectedValue={state}
              onValueChange={(itemValue) => setState(itemValue)}
              style={[styles.picker, Platform.OS === 'ios' && styles.pickerIOS]}
              itemStyle={Platform.OS === 'ios' ? styles.pickerItemIOS : {}}
              dropdownIconColor="#333"
              mode="dropdown"
            >
              <Picker.Item label="State" value="" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Alabama" value="AL" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Alaska" value="AK" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Arizona" value="AZ" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Arkansas" value="AR" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="California" value="CA" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Colorado" value="CO" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Connecticut" value="CT" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Delaware" value="DE" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Florida" value="FL" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Georgia" value="GA" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Hawaii" value="HI" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Idaho" value="ID" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Illinois" value="IL" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Indiana" value="IN" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Iowa" value="IA" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Kansas" value="KS" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Kentucky" value="KY" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Louisiana" value="LA" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Maine" value="ME" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Maryland" value="MD" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Massachusetts" value="MA" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Michigan" value="MI" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Minnesota" value="MN" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Mississippi" value="MS" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Missouri" value="MO" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Montana" value="MT" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Nebraska" value="NE" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Nevada" value="NV" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="New Hampshire" value="NH" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="New Jersey" value="NJ" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="New Mexico" value="NM" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="New York" value="NY" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="North Carolina" value="NC" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="North Dakota" value="ND" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Ohio" value="OH" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Oklahoma" value="OK" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Oregon" value="OR" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Pennsylvania" value="PA" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Rhode Island" value="RI" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="South Carolina" value="SC" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="South Dakota" value="SD" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Tennessee" value="TN" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Texas" value="TX" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Utah" value="UT" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Vermont" value="VT" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Virginia" value="VA" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Washington" value="WA" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="West Virginia" value="WV" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Wisconsin" value="WI" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Wyoming" value="WY" color="#333" fontFamily="Lato_400Regular" />
            </Picker>
          </View>

          {/* Add spacing */}
          <View style={styles.pickerSpacing} />

          {/* Passionate Causes Dropdown */}
          <Text style={styles.label}>Passionate Causes</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={passionateCause}
              onValueChange={(itemValue) => setPassionateCause(itemValue)}
              style={[styles.picker, Platform.OS === 'ios' && styles.pickerIOS]}
              itemStyle={Platform.OS === 'ios' ? styles.pickerItemIOS : {}}
              dropdownIconColor="#333"
              mode="dropdown"
            >
              <Picker.Item label="Select a cause" value="" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Environment Conservation" value="environment" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Animal Welfare" value="animals" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Education & Tutoring" value="education" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Community Outreach" value="outreach" color="#333" fontFamily="Lato_400Regular" />
            </Picker>
          </View>

          {/* Second Picker */}
          <View style={[styles.pickerContainer, { marginTop: 15 }]}>
            <Picker
              selectedValue={secondaryCause}
              onValueChange={(itemValue) => setSecondaryCause(itemValue)}
              style={[styles.picker, Platform.OS === 'ios' && styles.pickerIOS]}
              itemStyle={Platform.OS === 'ios' ? styles.pickerItemIOS : {}}
              dropdownIconColor="#333"
              mode="dropdown"
            >
              <Picker.Item label="Select a cause" value="" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Environment Conservation" value="environment" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Animal Welfare" value="animals" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Education & Tutoring" value="education" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Community Outreach" value="outreach" color="#333" fontFamily="Lato_400Regular" />
            </Picker>
          </View>

          {/* Third Picker */}
          <View style={[styles.pickerContainer, { marginTop: 15 }]}>
            <Picker
              selectedValue={additionalCause}
              onValueChange={(itemValue) => setAdditionalCause(itemValue)}
              style={[styles.picker, Platform.OS === 'ios' && styles.pickerIOS]}
              itemStyle={Platform.OS === 'ios' ? styles.pickerItemIOS : {}}
              dropdownIconColor="#333"
              mode="dropdown"
            >
              <Picker.Item label="Select a cause" value="" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Environment Conservation" value="environment" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Animal Welfare" value="animals" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Education & Tutoring" value="education" color="#333" fontFamily="Lato_400Regular" />
              <Picker.Item label="Community Outreach" value="outreach" color="#333" fontFamily="Lato_400Regular" />
            </Picker>
          </View>

          {/* Delete Account & Save Changes Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
    zIndex: 101,
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
    zIndex: 1,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Lato_400Regular',
  },
  waveContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    width: '100%',
    height: 500,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
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
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Lato_400Regular',
  },
  textInput: {
    flex: 1,
    padding: 15,
    color: '#000',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingRight: 10,
    height: 50,
  },
  editIcon: {
    padding: 5,
    marginRight: 5,
  },
  pickerContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
    backgroundColor: 'transparent',
    fontFamily: 'Lato_400Regular',
  },
  pickerIOS: {
    backgroundColor: 'transparent',
    fontFamily: 'Lato_400Regular',
  },
  pickerItemIOS: {
    height: 50,
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    transform: [{ scaleY: 0.9 }],
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: 'Lato_400Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    zIndex: 1,
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  saveButton: {
    backgroundColor: '#7CBEEA',
    padding: 8,
    borderRadius: 25,
    paddingHorizontal: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
  },
  locationContainer: {
    marginTop: 5,
    marginBottom: 20,
  },
  locationRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  streetAddressContainer: {
    flex: 1,
  },
  cityContainer: {
    flex: 2,
    marginRight: 10,
  },
  zipCodeContainer: {
    flex: 1,
  },
  statePickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  pickerSpacing: {
    height: 20,
  },
});

export default ProfileSettings;