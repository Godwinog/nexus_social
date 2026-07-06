import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Input } from '@components/index';
import { COLORS, GRADIENT } from '@constants/colors';
import { useUIStore } from '@store/index';
import { validateEmail } from '@utils/helpers';

type Props = NativeStackScreenProps<any, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Firebase signup will be implemented here
      navigation.navigate('Onboarding');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <LinearGradient colors={GRADIENT.PURPLE} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <Text style={styles.logo}>Nexus</Text>
        <Text style={styles.tagline}>Connect. Create. Monetize.</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: textColor }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
          Join Nexus and start creating content
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Input
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          isDarkMode={isDarkMode}
          keyboardType="email-address"
          icon="📧"
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          isDarkMode={isDarkMode}
          secureTextEntry
          icon="🔒"
        />

        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isDarkMode={isDarkMode}
          secureTextEntry
          icon="🔒"
        />

        <Button
          title="Sign Up"
          onPress={handleSignUp}
          isDarkMode={isDarkMode}
          loading={loading}
          size="large"
        />

        <TouchableOpacity style={styles.divider}>
          <Text style={[styles.dividerText, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            or continue with
          </Text>
        </TouchableOpacity>

        <Button
          title="Google Sign Up"
          onPress={() => {}}
          isDarkMode={isDarkMode}
          variant="secondary"
          size="large"
          icon="🔍"
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.footerLink, { color: COLORS.PRIMARY }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
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
    marginBottom: 24,
  },
  error: {
    backgroundColor: COLORS.ERROR,
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
    overflow: 'hidden',
  },
  divider: {
    marginVertical: 24,
    alignItems: 'center',
  },
  dividerText: {
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpScreen;
