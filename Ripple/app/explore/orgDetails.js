// import { useState, useEffect } from 'react';
// import { View, Image, Text, ScrollView, SafeAreaView, Button, ActivityIndicator } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';


// import { TestComponent, Login, ScreenHeaderBackBtn, OrgCard } from '../../components';
// import { COLORS, icons, images, SIZES } from "../../constants";
// import styles from '../../styles/test.js';


import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';


import BackArrow from '../../assets/icons/BackArrow.svg';
import Star from '../../assets/icons/Star.svg';
import LocationPin from '../../assets/icons/Location.svg';
import { COLORS } from '../../constants/index.js';


const OrgDetails = () => {
   const navigation = useNavigation();
   const route = useRoute();
   const { id, title } = route.params;
   const [action, setAction] = useState(null);
   const [loading, setLoading] = useState(true);
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [isStarred, setIsStarred] = useState(false);


   const loadFonts = async () => {
       await Font.loadAsync({
           'WorkSans-Regular': require('../../assets/fonts/WorkSans-Regular.ttf'),
       });
       setFontsLoaded(true);
   };


   const fetchActionDetails = async () => {
       try {
           const response = await fetch(`https://ripple-z6px.onrender.com/api/actions/${id}/`);
           const data = await response.json();
           setAction(data);
       } catch (error) {
           console.error("Error fetching action details:", error.message);
       } finally {
           setLoading(false);
       }
   };

   useEffect(() => {
       loadFonts();
       fetchActionDetails();
   }, [id]);

   const handleStarPress = () => {
       setIsStarred(!isStarred);
   };


   if (loading || !fontsLoaded || !action) {
       return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />;
   }


   return (     
       <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
           <View style={styles.imageContainer}>
               <Image
                   source={{ uri: action.thumbnail }}
                   style={styles.headerImage}
                   resizeMode="cover"
               />
               <View style={styles.locationContainer}>
                   <LocationPin width={16} height={16} fill="#fff" />
                   <Text style={styles.locationText}>{action.location || 'Location not specified'}</Text>
               </View>
               <TouchableOpacity
                   style={styles.backButton}
                   onPress={() => navigation.goBack()}
               >
                   <BackArrow width={24} height={24} fill="#000000" stroke="#000000" strokeWidth={1.5} />
               </TouchableOpacity>
           </View>


           <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
               <View style={styles.content}>
                   {/* Title Section */}
                   <View style={styles.header}>
                       <Text style={styles.title}>
                           {action.name} <Text style={styles.xp}>{action.xp || 50}XP</Text>
                       </Text>
                       <TouchableOpacity 
                            onPress={handleStarPress}
                            style={styles.starButton}
                        >
                            <FontAwesome 
                                name={isStarred ? "star" : "star-o"} 
                                size={28} 
                                color={isStarred ? "#FFD700" : "#000000"}
                            />
                        </TouchableOpacity>
                   </View>


                   {/* Organization Info */}
                   <View style={styles.orgInfo}>
                       <Image
                           source={{ uri: action.organization_logo || 'https://ripple-z6px.onrender.com/default_thumbnail.png' }}
                           style={styles.orgLogo}
                       />
                       <Text style={styles.orgName}>{action.organization}</Text>
                   </View>


                   {/* Tags */}
                   <View style={styles.tagsContainer}>
                       <View style={styles.tag}>
                           <Text style={styles.tagText}>{action.category}</Text>
                       </View>
                       <View style={styles.tag}>
                           <Text style={styles.tagText}>{action.action_type}</Text>
                       </View>
                   </View>


                   {/* Register Button */}
                   <TouchableOpacity style={styles.registerButton}>
                       <Text style={styles.registerText}>Register</Text>
                   </TouchableOpacity>


                   {/* Team Section */}
                   <View style={styles.section}>
                       <Text style={styles.sectionTitle}>The Team</Text>
                       <View style={styles.organizerRow}>
                           <Image
                               source={require('../../assets/profile-placeholder.png')}
                               style={styles.organizerAvatar}
                           />
                           <View style={styles.organizerDetails}>
                               <Text style={styles.organizerName}>Organizer: {action.organizer || 'Team Lead'}</Text>
                               <Text style={styles.organizerFrom}>From: {action.organization}</Text>
                           </View>
                           <TouchableOpacity style={styles.contactButton}>
                               <FontAwesome name="envelope-o" size={16} color={COLORS.primary} />
                               <Text style={styles.contactText}>Contact Organizer</Text>
                           </TouchableOpacity>
                       </View>
                   </View>


                   {/* Description Section */}
                   <View style={styles.section}>
                       <Text style={styles.sectionTitle}>Description</Text>
                       <Text style={styles.description}>{action.description || 'No description available.'}</Text>
                   </View>
               </View>
           </ScrollView>
       </SafeAreaView>
   );
};


const styles = StyleSheet.create({
   container: {
       flex: 1,
   },
   scrollView: {
       flex: 1,
       backgroundColor: '#fff',
   },
   imageContainer: {
       position: 'relative',
       height: 300,
       backgroundColor: '#000',
   },
   headerImage: {
       width: '100%',
       height: '100%',
   },
   locationContainer: {
       position: 'absolute',
       bottom: 16,
       right: 16,
       flexDirection: 'row',
       alignItems: 'center',
   },
   locationText: {
       color: '#fff',
       marginLeft: 6,
       fontSize: 14,
       fontWeight: '500',
       textShadowColor: 'rgba(0, 0, 0, 0.75)',
       textShadowOffset: { width: 0, height: 1 },
       textShadowRadius: 2,
       fontFamily: 'WorkSans-Regular',
   },
   backButton: {
       position: 'absolute',
       top: 32,
       left: 16,
       padding: 8,
       zIndex: 10,
   },
   content: {
       padding: 16,
   },
   header: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginBottom: 12,
   },
   title: {
       fontSize: 24,
       fontWeight: 'bold',
       color: '#000',
       fontFamily: 'WorkSans-Regular',
   },
   xp: {
       fontSize: 16,
       color: COLORS.primary,
   },
   orgInfo: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 12,
   },
   orgLogo: {
       width: 24,
       height: 24,
       borderRadius: 12,
       marginRight: 8,
   },
   orgName: {
       fontSize: 16,
       color: '#666',
       fontFamily: 'WorkSans-Regular',
   },
   tagsContainer: {
       flexDirection: 'row',
       flexWrap: 'wrap',
       gap: 8,
       marginBottom: 16,
   },
   tag: {
       backgroundColor: '#F5F5F5',
       paddingHorizontal: 12,
       paddingVertical: 6,
       borderRadius: 16,
   },
   tagText: {
       fontSize: 14,
       color: '#666',
       fontFamily: 'WorkSans-Regular',
   },
   registerButton: {
       backgroundColor: COLORS.primary,
       paddingVertical: 12,
       borderRadius: 8,
       alignItems: 'center',
       marginBottom: 24,
   },
   registerText: {
       color: '#fff',
       fontSize: 16,
       fontWeight: '600',
       fontFamily: 'WorkSans-Regular',
   },
   section: {
       marginBottom: 24,
   },
   sectionTitle: {
       fontSize: 18,
       fontWeight: '600',
       marginBottom: 12,
       fontFamily: 'WorkSans-Regular',
   },
   organizerRow: {
       flexDirection: 'row',
       alignItems: 'center',
       backgroundColor: '#F5F5F5',
       padding: 12,
       borderRadius: 8,
   },
   organizerAvatar: {
       width: 40,
       height: 40,
       borderRadius: 20,
       marginRight: 12,
   },
   organizerDetails: {
       flex: 1,
   },
   organizerName: {
       fontSize: 14,
       fontWeight: '500',
       fontFamily: 'WorkSans-Regular',
   },
   organizerFrom: {
       fontSize: 12,
       color: '#666',
       fontFamily: 'WorkSans-Regular',
   },
   contactButton: {
       flexDirection: 'row',
       alignItems: 'center',
       backgroundColor: '#fff',
       paddingHorizontal: 12,
       paddingVertical: 6,
       borderRadius: 16,
       gap: 6,
   },
   contactText: {
       fontSize: 12,
       color: COLORS.primary,
       fontFamily: 'WorkSans-Regular',
   },
   description: {
       fontSize: 14,
       lineHeight: 24,
       color: '#444',
       fontFamily: 'WorkSans-Regular',
   },
   loader: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   },
});


export default OrgDetails;


// const OrgPage = () => {
//     const route = useRoute();
//     const {id, title} = route.params;


//     const [loading, setLoading] = useState(true);
//     const [org, setOrg] = useState({});


//     //get the picture, title, tags, names, contact info, description, location
//     useEffect(() => {
//         // Simulate fetching data from backend or API
//         setTimeout(() => {
//         setOrg({
//                 id: 1,
//                 title: 'Blood Donation',
//                 headerImage: 'https://via.placeholder.com/150',
//                 profile_picture: 'https://example.com/icon1.png',
//                 name: 'American Red Cross',
//                 description: 'this org likes to plant trees for everyone!'
//             });
//             setLoading(false);
//         }, 1000); // Simulating a delay for fetching
//     }, []);


//     return(
//       <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
//         {/* <Stack.Screen
//           options={{
//             headerStyle: { backgroundColor: COLORS.lightWhite},
//             headerShadowVisible: false,
//             headerTransparent: false,
//             headerLeft: () => (
//               <ScreenHeaderBackBtn handlePress={()=> router.back()}/>
//             )
//           }}
//         /> */}
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View style = {{flex: 1, padding: SIZES.medium}}>
//             {
//             loading ? (
//                 <ActivityIndicator size = "large" color = {COLORS.primary} />
//             ) : (
//               <View>
//                 <Image
//                   source={{uri: org.headerImage}}
//                   resizeMode='cover'
//                   style={styles.btnImg}
//                 />
//                 <Text style={{ fontSize: 36, fontWeight: 'semi-bold' }}>{id}</Text>
//                 <Text style={{ fontSize: 20, marginVertical: 10 }}>{title}</Text>


//               </View>
//                 )
//             }
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     )
//   }
 // export default OrgPage;