import { useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import styles from '../../styles/test.js';

import Star from '../../assets/icons/Star.svg';

//based on design: each org card will have a picture, title, profile picture, name, and tags
const OrgCard = ({ width, height, organization }) => {
  //lets say organization is currently an object with a title, header pic, icon, link, organizer, contact info, desciption, and loc coords
  // const router = useRouter();
  const {id, title, profile_picture, name, headerImage, icon, description} = organization
  const navigation = useNavigation();
  const cardWidth = width < height ? width*0.46 : width*0.28; 
  const cardMargin = width < height ? width*0.02 : width*0.01 
  return (
    <TouchableOpacity style={{...styles.card, width: cardWidth, margin: cardMargin}} onPress={() => navigation.navigate('OrgDetails', { id, title })}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <TouchableOpacity style={{position: 'absolute', right: 0, zIndex: 2}}>
          <Star/>
        </TouchableOpacity>
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

const styles = StyleSheet.create({ 
  cardList: {
    alignItems:'center',
    width: '100%'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: '2%',
    padding: '2.5%', 
    height: 100
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
  cardDescription: {
    fontSize: 10,
    color: 'gray',
  },
  btnImg: {
    width: 50,
    height: 100,
    resizeMode: 'contain',
  },
})

export default OrgCard;