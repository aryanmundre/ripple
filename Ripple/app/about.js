import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const About = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>About Us!</Text>
      <Button title="Go to Home" onPress={() => router.push('/')} />
    </View>
  );
};

export default About;