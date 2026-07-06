import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input } from '@components/index';
import { COLORS } from '@constants/colors';
import { useUIStore } from '@store/index';
import * as ImagePicker from 'expo-image-picker';

type Props = NativeStackScreenProps<any, 'Onboarding'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.cancelled && result.assets && result.assets[0]) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleComplete = async () => {
    if (!username || !avatar) {
      return;
    }

    setLoading(true);
    try {
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const surfaceColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: textColor }]}>Complete Your Profile</Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
          Add your details to get started
        </Text>

        <TouchableOpacity style={[styles.avatarContainer, { backgroundColor: surfaceColor }]} onPress={pickImage}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarPlaceholder}>📷</Text>
          )}
        </TouchableOpacity>

        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          isDarkMode={isDarkMode}
          maxLength={20}
        />

        <Input
          placeholder="Bio (optional)"
          value={bio}
          onChangeText={setBio}
          isDarkMode={isDarkMode}
          maxLength={160}
          multiline
        />

        <Button
          title="Complete Setup"
          onPress={handleComplete}
          isDarkMode={isDarkMode}
          loading={loading}
          size="large"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 32,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  avatarPlaceholder: {
    fontSize: 48,
  },
});

export default OnboardingScreen;
