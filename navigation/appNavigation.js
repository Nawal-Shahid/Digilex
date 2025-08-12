import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import useAuth from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useAuth();

  useEffect(() => {
    if (user && !user.emailVerified) {
      Alert.alert(
        'Email Not Verified',
        'Please verify your email before logging in.'
      );
      signOut(auth);
    }
  }, [user]);

  if (user && user.emailVerified) {
    // Verified user → send to Home
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // No user OR unverified → send to Welcome/Login/SignUp
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
