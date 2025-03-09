// import { useState, useEffect } from 'react';
// import { View, Image, Text, ScrollView, SafeAreaView, Button, ActivityIndicator } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// import { TestComponent, Login, ScreenHeaderBackBtn, OrgCard } from '../../components';
// import { COLORS, icons, images, SIZES } from "../../constants";
// import styles from '../../styles/test.js';

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import SvgBackArrow from '../../assets/icons/BackArrow.svg'; 
import { COLORS } from '../../constants/index.js';

const OrgPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {id, title} = route.params;
    const { organizationId } = route.params; // Get the ID from navigation params
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrganizationDetails();
    }, []);

    const fetchOrganizationDetails = async () => {
        const baseURL = 'https://ripple-z6px.onrender.com/api/'; // Change to local IP if using a physical device
        const apiURL = `${baseURL}actions/feed/?`;
        const params = new URLSearchParams({
          name: 'action-feed'
        })

        try {
            const response = await fetch(`${apiURL}?${params.toString()}`, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            console.log(data);
            setOrganization(data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            
            // ✅ Explicitly setting fallback data
            setOrganization({
                id: 1,
                name: 'Blood Donation',
                xp: 50,
                orgName: 'American Red Cross',
                orgLogo: 'https://example.com/red-cross-logo.png',
                thumbnail: 'https://example.com/blood-donation.jpg',
                description: 'Join us for a blood donation drive and save lives!',
                organizer: 'Aryan Mundre',
                location: 'Los Angeles, CA',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />;
    }

  return (      
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView showsVerticalScrollIndicator={true}>
        {/* Thumbnail Image with Back Button */}
        <View>
          <Image source={{ uri: organization.thumbnail }} style={{...styles.image, backgroundColor: 'pink'}} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <SvgBackArrow width={24} height={24} fill="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {/* header with organization titles */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {organization.name} <Text style={styles.xp}>{organization.xp}XP</Text>
            </Text>
            <TouchableOpacity>
              <FontAwesome name="star-o" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.orgInfo}>
            <Image source={{ uri: organization.orgLogo }} style={styles.orgLogo} />
            <Text style={styles.orgName}>{organization.orgName}</Text>
          </View>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>The Team</Text>
            <View style={styles.organizerRow}>
              <FontAwesome name="user-circle-o" size={24} color="#aaa" />
              <View style={styles.organizerDetails}>
                <Text style={styles.organizerName}>{organization.organizer}</Text>
                  <Text style={styles.organizerFrom}>From: {organization.orgName}</Text>
                </View>
                <TouchableOpacity style={styles.contactButton}>
                  <FontAwesome name="envelope-o" size={16} color={COLORS.primary} />
                  <Text style={styles.contactText}>Contact Organizer</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{organization.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: '5%',
      // backgroundColor: '#fff',
  },
  loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  image: {
      width: '100%',
      height: 200,
  },
  backButton: {
      position: 'absolute',
      margin: 10,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
  },
  title: {
      fontSize: 22,
      fontWeight: 'bold',
  },
  xp: {
      fontSize: 16,
      color: COLORS.primary,
  },
  orgInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
  },
  orgLogo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
  },
  orgName: {
      fontSize: 16,
      fontWeight: 'bold',
  },
  registerButton: {
      backgroundColor: COLORS.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
  },
  registerText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
  section: {
      marginTop: 20,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  organizerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
  },
  organizerDetails: {
      marginLeft: 10,
      flex: 1,
  },
  organizerName: {
      fontSize: 16,
      fontWeight: 'bold',
  },
  organizerFrom: {
      fontSize: 14,
      color: '#666',
  },
  contactButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.5)',
      padding: 8,
      borderRadius: 6,
  },
  contactText: {
      color: COLORS.primary,
      marginLeft: 5,
  },
  description: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
  },
});

export default OrgPage;

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