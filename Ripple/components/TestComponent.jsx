import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const TestComponent =() => {
  const router = useRouter();

  return(
    <View>
      <View>
        <Text>Hello Ripple Consumer</Text>
        <Text>Ready to do good</Text>

        <TextInput
          value='typing...'
          onChange={() => {}}
          placeholder="are you feeling lucky"
        />

        <TouchableOpacity onPress={() => {}}>
          {/* basically buttons */}
          
        </TouchableOpacity>
      </View>

      <View>
        {/* <FlatList 
          data={Types}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        /> //used for lots of data, possible list of opportunities */}
      </View>
    </View>
  )
}

export default TestComponent;