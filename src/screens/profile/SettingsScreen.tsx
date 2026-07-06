import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { COLORS } from '@constants/colors';
import { useUIStore, useAuthStore } from '@store/index';

const SettingsScreen: React.FC = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const logout = useAuthStore((state) => state.logout);
  const [notifications, setNotifications] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => {
          logout();
        },
        style: 'destructive',
      },
    ]);
  };

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const surfaceColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;
  const borderColor = isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER;

  const SettingItem: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
  }> = ({ icon, title, subtitle, value, onValueChange, onPress }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: surfaceColor, borderColor }]}
      onPress={onPress}
      disabled={onValueChange !== undefined}
    >
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {onValueChange !== undefined && (
        <Switch value={value} onValueChange={onValueChange} thumbColor={COLORS.PRIMARY} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.header, { backgroundColor: surfaceColor, borderBottomColor: borderColor }]}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Display */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>Display</Text>
        <SettingItem
          icon="🌙"
          title="Dark Mode"
          subtitle={isDarkMode ? 'On' : 'Off'}
          value={isDarkMode}
          onValueChange={toggleTheme}
        />

        {/* Notifications */}
        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 20 }]}>Notifications</Text>
        <SettingItem
          icon="🔔"
          title="Push Notifications"
          subtitle={notifications ? 'Enabled' : 'Disabled'}
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingItem
          icon="💬"
          title="Comments & Replies"
          subtitle="Get notified of new comments"
          value={true}
          onValueChange={() => {}}
        />
        <SettingItem
          icon="❤️"
          title="Likes"
          subtitle="Get notified when posts are liked"
          value={true}
          onValueChange={() => {}}
        />

        {/* Data & Privacy */}
        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 20 }]}>Data & Privacy</Text>
        <SettingItem
          icon="📶"
          title="Data Saver"
          subtitle="Lower quality media"
          value={dataSaver}
          onValueChange={setDataSaver}
        />
        <SettingItem
          icon="🔒"
          title="Privacy Policy"
          subtitle="Read our privacy policy"
          onPress={() => {}}
        />
        <SettingItem
          icon="📋"
          title="Terms of Service"
          subtitle="Read our terms"
          onPress={() => {}}
        />

        {/* About */}
        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 20 }]}>About</Text>
        <SettingItem
          icon="ℹ️"
          title="Version"
          subtitle="1.0.0"
        />
        <SettingItem
          icon="🌐"
          title="Website"
          subtitle="nexus.social"
          onPress={() => {}}
        />

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: COLORS.ERROR }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  logoutButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default SettingsScreen;
