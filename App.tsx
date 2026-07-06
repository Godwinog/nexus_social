import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from '@navigation/RootNavigator';
import { useUIStore } from '@store/index';
import { COLORS } from '@constants/colors';

export default function App() {
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </>
  );
}
