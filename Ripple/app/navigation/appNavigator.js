import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { COLORS } from "../../constants";
import ExploreScreen from '../explore';
import VisualizationScreen from '../visualizationScreen';
import LeaderboardScreen from '../leaderboardScreen';
import ProfileScreen from '../profileScreen';

// Import SVG icons for bottom tabs
import SvgExplore from '../../assets/icons/Compass.svg';
import SvgHeart from '../../assets/icons/Heart.svg';
import SvgGame from '../../assets/icons/Game.svg';
import SvgProfile from '../../assets/icons/Profile.svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ✅ Bottom Tab Navigator (Handles Navbar)
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor: COLORS.lightWhite, height: 60 },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
            headerShown: false,
        }}
    >
        <Tab.Screen name="Explore" component={ExploreScreen} options={{
            tabBarIcon: ({ size, color }) => <SvgExplore width={size} height={size} fill={color} />
        }} />
        <Tab.Screen name="Visualization" component={VisualizationScreen} options={{
            tabBarIcon: ({ size, color }) => <SvgHeart width={size} height={size} fill={color} />
        }} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} options={{
            tabBarIcon: ({ size, color }) => <SvgGame width={size} height={size} fill={color} />
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({ size, color }) => <SvgProfile width={size} height={size} fill={color} />
        }} />
    </Tab.Navigator>
);

// ✅ Ensure Fullscreen Layout by Wrapping StackNavigator
const AppNavigator = () => (
    <NavigationContainer>
        <View style={styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={TabNavigator} />
            </Stack.Navigator>
        </View>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    container: {
        flex: 1, // ✅ Ensures full height
        backgroundColor: COLORS.lightWhite, // ✅ Consistent background
    },
});

export default AppNavigator;
