import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { TestComponent, Login, ScreenHeaderBtn } from '../components';

const Home = () => {
  const router = useRouter();
  
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: 'blue'},
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn/>
          )
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1
          }}
        >
          <Login/>
           <Button title="Go to About" onPress={() => router.push('/about')} />
          <TestComponent/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;