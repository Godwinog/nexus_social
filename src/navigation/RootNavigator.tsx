import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator, AppNavigator } from '@navigation/index';
import { useAuthStore, useUIStore } from '@store/index';
import { useInitializeApp } from '@hooks/useApp';

const RootNavigator: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const { initialized } = useInitializeApp();

  if (!initialized) {
    return null; // Show splash screen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator isDarkMode={isDarkMode} /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
