import { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Stack, useRouter } from 'expo-router';
import styles from '../../styles/test.js';

//based on design: each org card will have a picture, title, profile picture, name, and tags
const OrgCard = ({ organization }) => {
  //lets say organization is currently an object with a title, header pic, icon, link, organizer, contact info, desciption, and loc coords
  // const router = useRouter();
  const {id, title, profile_picture, name, headerImage, icon, description} = organization
  const navigation = useNavigation();
  console.log(id, title)
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('OrgDetails', { id, title })}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardDescription}>pfp: </Text>
        <Text style={styles.cardDescription}>{name}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text>tags</Text>
      </View>
      
      {/* header image */}
      <Image
        source={{uri: organization.headerImage}}
        resizeMode='cover'
        style={styles.btnImg}
      />
      {/* icon image */}
      <Image
        source={{uri: organization.icon}}
        resizeMode='cover'
        style={styles.btnImg}
      />

    </TouchableOpacity>
  )
}

export default OrgCard;