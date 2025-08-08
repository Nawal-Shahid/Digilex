import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigation from './navigation/appNavigation';
import { themeColors } from './theme';

// Prevent native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      // Simulate loading resources (fonts, data, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAppReady(true);
      await SplashScreen.hideAsync(); // Hide native splash
    };

    prepareApp();
  }, []);

  // Custom splash screen UI
  if (!appReady) {
    return (
      <View style={[styles.splashContainer, { backgroundColor: themeColors.bg }]}>
        <Image
          source={require('./assets/splash-image.png')}
          style={styles.splashImage}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Main App
  return <AppNavigation />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 250,
    height: 250,
  },
});
