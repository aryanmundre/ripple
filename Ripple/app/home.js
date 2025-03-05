import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { TestComponent, Login, ScreenHeaderBtn } from '../components';
import { COLORS, icons, images, SIZES } from "../constants";

const Home = () => {
  const router = useRouter();
  
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn/>
          )
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium
          }}
        >
          <Login/>
           <Button title="Go to About" onPress={() => router.push('/about')} />            
           <Button title="Go to Explore" onPress={() => router.push('/explore')} />
          <TestComponent/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;