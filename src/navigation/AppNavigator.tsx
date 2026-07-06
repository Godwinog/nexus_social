import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { FeedScreen, ExploreScreen, VideosScreen } from '@screens/home';
import { ProfileScreen, SettingsScreen, NotificationsScreen } from '@screens/profile';
import { CreatePostScreen } from '@screens/create/CreatePostScreen';
import { CoinShopScreen, CreatorMonetizationScreen } from '@screens/monetization';
import { COLORS } from '@constants/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FeedScreen" component={FeedScreen} />
  </Stack.Navigator>
);

const ExploreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
  </Stack.Navigator>
);

const VideosStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="VideosScreen" component={VideosScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
  </Stack.Navigator>
);

const TabIcon: React.FC<{ name: string; focused: boolean; isDarkMode: boolean }> = ({
  name,
  focused,
  isDarkMode,
}) => {
  const icons: { [key: string]: string } = {
    Home: '🏠',
    Explore: '🔍',
    Create: '➕',
    Videos: '🎬',
    Profile: '👤',
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
      <Text style={{ fontSize: 20 }}>{icons[name]}</Text>
      <Text
        style={{
          fontSize: 10,
          color: focused ? COLORS.PRIMARY : isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE,
          fontWeight: focused ? '700' : '500',
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export const AppNavigator: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
        {() => (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_BG,
                borderTopColor: isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER,
                borderTopWidth: 1,
              },
              tabBarIcon: ({ focused }) => (
                <TabIcon name={route.name} focused={focused} isDarkMode={isDarkMode} />
              ),
              tabBarLabel: () => null,
            })}
          >
            <Tab.Screen name="Home" component={FeedStack} />
            <Tab.Screen name="Explore" component={ExploreStack} />
            <Tab.Screen
              name="Create"
              component={CreatePostScreen}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  navigation.navigate('CreatePost');
                },
              })}
            />
            <Tab.Screen name="Videos" component={VideosStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        )}
      </Stack.Screen>
    </Stack.Group>

    {/* Modal Screens */}
    <Stack.Group
      screenOptions={{
        presentation: 'modal',
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="CoinShop" component={CoinShopScreen} />
      <Stack.Screen name="CreatorMonetization" component={CreatorMonetizationScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Group>
  </Stack.Navigator>
);
