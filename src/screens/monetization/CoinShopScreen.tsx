import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@components/index';
import { COLORS } from '@constants/colors';
import { useUIStore, useAuthStore } from '@store/index';
import { COIN_PACKS } from '@constants/index';

type Props = NativeStackScreenProps<any, 'CoinShop'>;

const CoinShopScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const user = useAuthStore((state) => state.user);
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (packIndex: number) => {
    setLoading(true);
    try {
      // Stripe payment integration
      console.log('Processing payment for pack:', packIndex);
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={[styles.headerTitle, { color: textColor }]}>Nexus Coins</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Balance */}
        <View style={[styles.balanceCard, { backgroundColor: COLORS.PRIMARY }]}>
          <Text style={styles.balanceLabel}>Your Coins</Text>
          <Text style={styles.balanceAmount}>0</Text>
          <Text style={styles.balanceSubtext}>💰 Earn coins by creating content</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Choose a Coin Pack</Text>

        {/* Coin Packs */}
        <FlatList
          data={COIN_PACKS}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.packCard,
                {
                  backgroundColor: surfaceColor,
                  borderColor: selectedPack === index ? COLORS.PRIMARY : borderColor,
                  borderWidth: selectedPack === index ? 2 : 1,
                },
              ]}
              onPress={() => setSelectedPack(index)}
            >
              <View style={styles.packInfo}>
                <Text style={[styles.coinAmount, { color: COLORS.PRIMARY }]}>
                  {item.coins}
                </Text>
                <Text style={[styles.coinLabel, { color: textColor }]}>coins</Text>
                {item.bonus > 0 && (
                  <Text style={[styles.bonusLabel, { color: COLORS.SUCCESS }]}>
                    +{item.bonus} bonus ✨
                  </Text>
                )}
              </View>
              <View style={styles.packPrice}>
                <Text style={[styles.price, { color: textColor }]}>${(item.price / 100).toFixed(2)}</Text>
                {item.bonus > 0 && (
                  <Text style={[styles.packSaving, { color: COLORS.SUCCESS }]}>Best Value</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.packsList}
        />

        {/* Purchase Button */}
        {selectedPack !== null && (
          <Button
            title="Purchase Coins"
            onPress={() => handlePurchase(selectedPack)}
            isDarkMode={isDarkMode}
            loading={loading}
            size="large"
          />
        )}

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, { color: textColor }]}>How Coins Work</Text>
          <Text style={[styles.infoText, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            • Send coins to creators you love
          </Text>
          <Text style={[styles.infoText, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            • Creators earn 70% of coin value
          </Text>
          <Text style={[styles.infoText, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
            • View beautiful coin animations
          </Text>
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
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 4,
  },
  balanceSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  packsList: {
    marginBottom: 20,
  },
  packCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  packInfo: {
    flex: 1,
  },
  coinAmount: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 2,
  },
  coinLabel: {
    fontSize: 12,
  },
  bonusLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  packPrice: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
  },
  packSaving: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 20,
  },
});

export default CoinShopScreen;
