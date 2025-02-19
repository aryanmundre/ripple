import { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { TestComponent, Login, ScreenHeaderBackBtn, OrgCard } from '../../components';
import { COLORS, icons, images, SIZES } from "../../constants";
import styles from '../../styles/test.js';

const OrgPage = () => {
    const route = useRoute();
    const {id, title} = route.params;

    const [loading, setLoading] = useState(true);
    const [org, setOrg] = useState({});

    //get the picture, title, tags, names, contact info, description, location
    useEffect(() => {
        // Simulate fetching data from backend or API
        setTimeout(() => {
        setOrg({
                id: 1,
                title: 'Blood Donation',
                headerImage: 'https://via.placeholder.com/150',
                profile_picture: 'https://example.com/icon1.png',
                name: 'American Red Cross',
                description: 'this org likes to plant trees for everyone!'
            });
            setLoading(false);
        }, 1000); // Simulating a delay for fetching
    }, []);

    return(
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        {/* <Stack.Screen 
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerTransparent: false,
            headerLeft: () => (
              <ScreenHeaderBackBtn handlePress={()=> router.back()}/>
            )
          }}
        /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style = {{flex: 1, padding: SIZES.medium}}>
            {
            loading ? (
                <ActivityIndicator size = "large" color = {COLORS.primary} />
            ) : (
              <View>
                <Image
                  source={{uri: org.headerImage}}
                  resizeMode='cover'
                  style={styles.btnImg}
                />
                <Text style={{ fontSize: 36, fontWeight: 'semi-bold' }}>{id}</Text>
                <Text style={{ fontSize: 20, marginVertical: 10 }}>{title}</Text>

              </View>
                )
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
export default OrgPage;