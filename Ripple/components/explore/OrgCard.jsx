import { useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, icons, images, SIZES } from "../../constants";
// import styles from '../../styles/test.js';

import Placeholder from '../../assets/icons/placeholder.svg';
import Placeholder2 from '../../assets/icons/placeholder2.svg';
import Star from '../../assets/icons/Star.svg';

//based on design: each org card will have a picture, title, profile picture, name, and tags
const OrgCard = ({ width, organization }) => {
  //lets say organization is currently an object with a title, header pic, icon, link, organizer, contact info, desciption, and loc coords
  // const router = useRouter();
  const {id, title, profile_picture, name, headerImage, icon, description} = organization
  const navigation = useNavigation();
  const cardWidth = width*0.46 
  const cardMargin = width*0.02 
  return (
    <TouchableOpacity style={{...styles.card, padding: cardWidth*0.05, paddingTop: 0,}} onPress={() => navigation.navigate('OrgDetails', { id, title })}> 
        <Placeholder width={cardWidth* 0.9} styles={{margin: 0}}/>
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

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({ 
  cardList: {
    alignItems:'center',
    width: '100%'
  },
  card: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: '2%',
    padding: '2.5%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
    flex: 1
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