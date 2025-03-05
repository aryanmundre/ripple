import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { COLORS } from "../../constants";
import ExploreCards from '../explore/explorecards';
import OrgDetails from '../explore/orgDetails'
import VisualizationScreen from '../visualizationScreen';
import LeaderboardScreen from '../leaderboardScreen';
import ProfileScreen from '../profileScreen';
import OrganizationDetails from '../organizationDetails';
import LogInSignUp from '../signin';
import SignupScreen from '../signup';
import LoginScreen from '../login';

// Import SVG icons for bottom tabs
import SvgExplore from '../../assets/icons/Compass.svg';
import SvgHeart from '../../assets/icons/Heart.svg';
import SvgGame from '../../assets/icons/Game.svg';
import SvgProfile from '../../assets/icons/Profile.svg';

const Tab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const AuthStack = createStackNavigator();

const ExploreNavigator = () => (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
        <ExploreStack.Screen name="ExploreHome" component={ExploreCards} />
        <ExploreStack.Screen name="OrgDetails" component={OrgDetails} />
    </ExploreStack.Navigator>
);

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
        <Tab.Screen name="Explore" component={ExploreNavigator} options={{
            tabBarIcon: ({ size, color }) => <SvgExplore width={size} height={size} fill={color} />
        }}/>
        <Tab.Screen name="Visualization" component={VisualizationScreen}  options={{
            tabBarIcon: ({ size, color }) => <SvgHeart width={size} height={size} fill={color} />
        }}/>
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen}  options={{
            tabBarIcon: ({ size, color }) => <SvgGame width={size} height={size} fill={color} />
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({ size, color }) => <SvgProfile width={size} height={size} fill={color} />
        }}/>
    </Tab.Navigator>
);

const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Signin" component={LogInSignUp} />
        <AuthStack.Screen name="Signup" component={SignupScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        
        <AuthStack.Screen name="AppNavigator" component={TabNavigator} />
    </AuthStack.Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator/>
        {/* <AuthNavigator /> */}
    </NavigationContainer>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
});

export default AppNavigator;
