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
import LogInSignUp from '../signin';
import SignupScreen from '../signup';
import LoginScreen from '../login';
import AccountSetup from '../AccountSetup';
import LocationSetup from '../LocationSetup';
import CauseSelection from '../CauseSelection';

const Tab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

const ExploreNavigator = () => (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
        <ExploreStack.Screen name="ExploreHome" component={ExploreScreen} />
        <ExploreStack.Screen name="OrganizationDetails" component={OrganizationDetails} />
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
        <Tab.Screen name="Explore" component={ExploreNavigator} />
        <Tab.Screen name="Visualization" component={VisualizationScreen} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
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
