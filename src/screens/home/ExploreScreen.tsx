import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS } from '@constants/colors';
import { useUIStore } from '@store/index';
import { useDebounce } from '@hooks/useFeed';

const ExploreScreen: React.FC = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'trending' | 'users' | 'articles'>('trending');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const surfaceColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;
  const borderColor = isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER;

  const trendingHashtags = [
    { id: '1', hashtag: '#WebDevelopment', count: 45000 },
    { id: '2', hashtag: '#ReactNative', count: 32000 },
    { id: '3', hashtag: '#Firebase', count: 28000 },
    { id: '4', hashtag: '#MobileApp', count: 25000 },
  ];

  const trendingPosts = [
    { id: '1', title: 'Building Apps with React Native', likes: 5000 },
    { id: '2', title: 'Firebase Best Practices', likes: 4200 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: surfaceColor, borderColor }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search users, posts, articles"
          placeholderTextColor={isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, { color: textColor }]}
        />
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { borderBottomColor: borderColor }]}>
        {['trending', 'users', 'articles'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && {
                borderBottomColor: COLORS.PRIMARY,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setSelectedTab(tab as any)}
          >
            <Text style={[styles.tabText, { color: selectedTab === tab ? COLORS.PRIMARY : textColor }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedTab === 'trending' && (
          <View style={styles.content}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Trending Hashtags</Text>
            {trendingHashtags.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.hashtagItem, { backgroundColor: surfaceColor }]}>
                <Text style={[styles.hashtagName, { color: COLORS.PRIMARY }]}>{item.hashtag}</Text>
                <Text style={[styles.hashtagCount, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
                  {(item.count / 1000).toFixed(0)}K posts
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionTitle, { color: textColor, marginTop: 24 }]}>Trending Posts</Text>
            {trendingPosts.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.postItem, { backgroundColor: surfaceColor }]}>
                <Text style={[styles.postTitle, { color: textColor }]}>{item.title}</Text>
                <Text style={[styles.postLikes, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
                  {item.likes.toLocaleString()} likes
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  hashtagItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  hashtagName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  hashtagCount: {
    fontSize: 13,
  },
  postItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  postLikes: {
    fontSize: 13,
  },
});

export default ExploreScreen;
