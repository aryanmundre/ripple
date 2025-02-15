import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();
const Layout = () => {
    const [fontsLoaded] =useFonts({
        //font stuff
    })

    // const onLayoutRootView = useCallback(async () => {
    //     if(fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded])
    if(!fontsLoaded) return null;
    return (
        <Stack initialRouteName="home">
            <Stack.Screen name="home"/>   
            <Stack.Screen name="about" options={{title: 'about us'}}/>
            <Stack.Screen name="explore/explorecards" options={{title: 'explore'}}/>            
            <Stack.Screen name="explore/[id]" options={{title: ''}}/>
        </Stack>
    )
}

export default Layout;