import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress}) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text>
            </Text>
            {/* <Image
                source={iconUrl}
                resizeMode='cover'
                style={StyleSheet.btnImg(dimension)}
            /> */}
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn;