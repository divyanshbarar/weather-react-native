import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { WeatherProvider } from '../src/context/WeatherContext';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after app loads
    SplashScreen.hideAsync();
  }, []);

  return (
    <WeatherProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Weather' }} />
      </Stack>
      <StatusBar style="auto" />
    </WeatherProvider>
  );
}