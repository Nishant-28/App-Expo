import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { AppwriteProvider, useAppwrite } from '@/context/AppwriteContext';
import { AuthNavigator } from '@/components/auth/AuthNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// App content component that uses Appwrite context
function AppContent() {
  const { isAuthenticated, isLoading } = useAppwrite();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#667eea' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  // Show main app if authenticated
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AppwriteProvider>
          <AppContent />
        </AppwriteProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}