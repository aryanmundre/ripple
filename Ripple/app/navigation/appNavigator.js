import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { COLORS } from "../../constants";
import ExploreCards from '../explore/explorecards.js';
import OrgDetails from '../explore/orgDetails'
import VisualizationScreen from '../visualizationScreen';
import LeaderboardScreen from '../leaderboardScreen';
import ProfileScreen from '../profileScreen';
import ProfileSettings from '../profileSettings';
import LogInSignUp from '../signin';
import SignupScreen from '../signup';
import LoginScreen from '../login';
import AccountSetup from '../AccountSetup';
import LocationSetup from '../LocationSetup';
import CauseSelection from '../CauseSelection';
import SkillSelection from '../SkillSelection';

import SvgExplore from '../../assets/icons/Compass.svg';
import SvgHeart from '../../assets/icons/Heart.svg';
import SvgGame from '../../assets/icons/Game.svg';
import SvgProfile from '../../assets/icons/Profile.svg';

const Tab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const ExploreNavigator = () => (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
        <ExploreStack.Screen name="ExploreHome" component={ExploreCards} />
        <ExploreStack.Screen name="OrgDetails" component={OrgDetails} />
    </ExploreStack.Navigator>
);

const ProfileNavigator = () => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
        <ProfileStack.Screen name="ProfileSettings" component={ProfileSettings} />
    </ProfileStack.Navigator>
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
        <Tab.Screen name="Profile" component={ProfileNavigator} options={{
            tabBarIcon: ({ size, color }) => <SvgProfile width={size} height={size} fill={color} />
        }}/>
    </Tab.Navigator>
);

const AuthNavigator = () => {
    console.log('Setting up AuthNavigator');
    return (
        <AuthStack.Navigator 
            screenOptions={{ 
                headerShown: false,
                gestureEnabled: true,
            }}
        >
            <AuthStack.Screen 
                name="Signin" 
                component={LogInSignUp}
                options={{ gestureEnabled: false }}
            />
            <AuthStack.Screen 
                name="Signup" 
                component={SignupScreen}
                options={{ gestureEnabled: true }}
            />
            <AuthStack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{ gestureEnabled: true }}
            />
            <AuthStack.Screen 
                name="AccountSetup" 
                component={AccountSetup}
                options={{
                    gestureEnabled: true,
                    animationEnabled: true,
                }}
            />
            <AuthStack.Screen 
                name="LocationSetup" 
                component={LocationSetup}
                options={{
                    gestureEnabled: true,
                    animationEnabled: true,
                }}
            />
            <AuthStack.Screen 
                name="CauseSelection" 
                component={CauseSelection}
                options={{
                    gestureEnabled: true,
                    animationEnabled: true,
                }}
            />
            <AuthStack.Screen 
                name="SkillSelection" 
                component={SkillSelection}
                options={{
                    gestureEnabled: true,
                    animationEnabled: true,
                }}
            />
            <AuthStack.Screen 
                name="Main" 
                component={TabNavigator}
                options={{
                    gestureEnabled: false,
                }}
            />
        </AuthStack.Navigator>
    );
};

const AppNavigator = () => (
    <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Auth" component={AuthNavigator} />
            <RootStack.Screen name="Main" component={TabNavigator} />
        </RootStack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
});

export default AppNavigator;
