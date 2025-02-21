import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { COLORS } from "../../constants";
import ExploreScreen from '../explore';
import VisualizationScreen from '../visualizationScreen';
import LeaderboardScreen from '../leaderboardScreen';
import ProfileScreen from '../profileScreen';
import OrganizationDetails from '../organizationDetails';
import SigninScreen from '../signin';

const Tab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const AuthStack = createStackNavigator();

// Stack Navigator inside the "Explore" tab
const ExploreNavigator = () => (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
        <ExploreStack.Screen name="ExploreHome" component={ExploreScreen} />
        <ExploreStack.Screen name="OrganizationDetails" component={OrganizationDetails} />
    </ExploreStack.Navigator>
);

// Bottom Tab Navigator
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
        <Tab.Screen name="Explore" component={ExploreNavigator} />
        <Tab.Screen name="Visualization" component={VisualizationScreen} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);

// Auth Stack Navigator for Signin
const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Define screens using Screen component */}
        <AuthStack.Screen name="Signin" component={SigninScreen} />
        <AuthStack.Screen name="AppNavigator" component={TabNavigator} />
    </AuthStack.Navigator>
);

// App Navigator
const AppNavigator = () => (
    <NavigationContainer>
        {/* Root Navigation Container */}
        <AuthNavigator />
    </NavigationContainer>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
});

export default AppNavigator;
