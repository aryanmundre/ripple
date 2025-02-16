import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from "../../constants";
import ExploreScreen from '../explore';
import VisualizationScreen from '../visualizationScreen';
import LeaderboardScreen from '../leaderboardScreen';
import ProfileScreen from '../profileScreen';

// Import SVG files directly
import SvgExplore from '../../assets/icons/Compass.svg';
import SvgHeart from '../../assets/icons/Heart.svg';
import SvgGame from '../../assets/icons/Game.svg';
import SvgProfile from '../../assets/icons/Profile.svg';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: COLORS.lightWhite, height: 60 },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false, // Removes text labels from the navbar
                headerShown: false, // Removes the title bar
            }}
        >
            <Tab.Screen name="Explore" component={ExploreScreen} options={{
                headerShown: false,
                tabBarIcon: ({ size }) => (
                    <SvgExplore width={size} height={size} />
                ),
            }} />
            <Tab.Screen name="Visualization" component={VisualizationScreen} options={{
                tabBarIcon: ({ size }) => (
                    <SvgHeart width={size} height={size} />
                ),
            }} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} options={{
                tabBarIcon: ({ size }) => (
                    <SvgGame width={size} height={size} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ size }) => (
                    <SvgProfile width={size} height={size} />
                ),
            }} />
        </Tab.Navigator>
    );
};

export default AppNavigator;
