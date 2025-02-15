import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

const ScreenHeaderBackBtn = ({ iconUrl, dimension, handlePress}) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text>
                &lt; back
            </Text>
            {/* <Image
                source={iconUrl}
                resizeMode='cover'
                style={StyleSheet.btnImg(dimension)}
            /> */}
        </TouchableOpacity>
    )
}

export default ScreenHeaderBackBtn;