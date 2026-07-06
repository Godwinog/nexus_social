import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@components/index';
import { COLORS } from '@constants/colors';
import { useUIStore } from '@store/index';

type Props = NativeStackScreenProps<any, 'CreatorMonetization'>;

const CreatorMonetizationScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const surfaceColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;
  const borderColor = isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.header, { backgroundColor: surfaceColor, borderBottomColor: borderColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Creator Monetization</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Coming Soon Badge */}
        <View style={[styles.comingSoonBanner, { backgroundColor: COLORS.PRIMARY }]}>
          <Text style={styles.comingSoonIcon}>🚀</Text>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
          <Text style={styles.comingSoonSubtext}>We're building powerful monetization tools for creators</Text>
        </View>

        {/* Feature Cards */}
        <View style={[styles.featureCard, { backgroundColor: surfaceColor, borderColor }]}>
          <Text style={styles.featureIcon}>💰</Text>
          <Text style={[styles.featureTitle, { color: textColor }]}>Coin Earnings</Text>
          <Text style={[styles.featureDescription, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            Earn 70% when viewers send you coins
          </Text>
        </View>

        <View style={[styles.featureCard, { backgroundColor: surfaceColor, borderColor }]}>
          <Text style={styles.featureIcon}>🔒</Text>
          <Text style={[styles.featureTitle, { color: textColor }]}>Exclusive Subscriptions</Text>
          <Text style={[styles.featureDescription, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            Create subscriber-only content and earn recurring revenue
          </Text>
        </View>

        <View style={[styles.featureCard, { backgroundColor: surfaceColor, borderColor }]}>
          <Text style={styles.featureIcon}>💡</Text>
          <Text style={[styles.featureTitle, { color: textColor }]}>Tipping</Text>
          <Text style={[styles.featureDescription, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            Allow fans to tip your posts and videos directly
          </Text>
        </View>

        <View style={[styles.featureCard, { backgroundColor: surfaceColor, borderColor }]}>
          <Text style={styles.featureIcon}>📊</Text>
          <Text style={[styles.featureTitle, { color: textColor }]}>Ad Revenue Sharing</Text>
          <Text style={[styles.featureDescription, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            Earn a share of ad revenue from your content
          </Text>
        </View>

        {/* Info Section */}
        <View style={[styles.infoSection, { backgroundColor: surfaceColor }]}>
          <Text style={[styles.infoTitle, { color: textColor }]}>How It Works</Text>
          <Text style={[styles.infoStep, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            1. Create amazing content
          </Text>
          <Text style={[styles.infoStep, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            2. Build your audience
          </Text>
          <Text style={[styles.infoStep, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            3. Enable monetization
          </Text>
          <Text style={[styles.infoStep, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            4. Start earning
          </Text>
        </View>

        {/* Earnings Estimate (Placeholder) */}
        <View style={[styles.earningsBox, { backgroundColor: COLORS.PRIMARY }]}>
          <Text style={styles.earningsLabel}>Estimated Monthly Earnings</Text>
          <Text style={styles.earningsAmount}>$0</Text>
          <Text style={styles.earningsSubtext}>Activate monetization to see estimates</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backIcon: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  comingSoonBanner: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  comingSoonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  comingSoonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    textAlign: 'center',
  },
  featureCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  infoSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  infoStep: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 4,
  },
  earningsBox: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  earningsLabel: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 4,
  },
  earningsAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  earningsSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default CreatorMonetizationScreen;
