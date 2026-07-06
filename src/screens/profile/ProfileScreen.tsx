import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@components/index';
import { COLORS } from '@constants/colors';
import { useUIStore, useAuthStore } from '@store/index';
import { postService } from '@services/postService';
import { Post } from '@types/index';

const ProfileScreen: React.FC = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const user = useAuthStore((state) => state.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'media'>('posts');

  useFocusEffect(
    useCallback(() => {
      loadUserPosts();
    }, [])
  );

  const loadUserPosts = async () => {
    if (user) {
      const userPosts = await postService.getPostsByAuthor(user.id);
      setPosts(userPosts);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadUserPosts();
    setRefreshing(false);
  };

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const surfaceColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;
  const borderColor = isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER;

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.loadingText, { color: textColor }]}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {/* Header Background */}
            <View style={[styles.headerBg, { backgroundColor: COLORS.PRIMARY }]} />

            {/* Profile Info */}
            <View style={[styles.profileSection, { backgroundColor: surfaceColor }]}>
              <Image source={{ uri: user.avatar }} style={styles.profileImage} />
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={[styles.name, { color: textColor }]}>{user.username}</Text>
                  {user.isVerified && <Text style={styles.verifiedBadge}>✓</Text>}
                </View>
                <Text style={[styles.bio, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
                  {user.bio || 'No bio'}
                </Text>
              </View>
            </View>

            {/* Stats */}
            <View style={[styles.statsContainer, { backgroundColor: surfaceColor, borderColor }]}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: COLORS.PRIMARY }]}>{posts.length}</Text>
                <Text style={[styles.statLabel, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
                  Posts
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: COLORS.PRIMARY }]}>{user.followers}</Text>
                <Text style={[styles.statLabel, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
                  Followers
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: COLORS.PRIMARY }]}>{user.following}</Text>
                <Text style={[styles.statLabel, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
                  Following
                </Text>
              </View>
            </View>

            {/* Tabs */}
            <View style={[styles.tabContainer, { borderBottomColor: borderColor }]}>
              {(['posts', 'likes', 'media'] as const).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    activeTab === tab && { borderBottomColor: COLORS.PRIMARY, borderBottomWidth: 2 },
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      { color: activeTab === tab ? COLORS.PRIMARY : textColor },
                    ]}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        renderItem={() => null}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  headerBg: {
    height: 100,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: -50,
    borderRadius: 12,
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
    borderWidth: 4,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    paddingTop: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  verifiedBadge: {
    fontSize: 16,
    color: COLORS.PRIMARY,
  },
  bio: {
    fontSize: 13,
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.LIGHT_BORDER,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
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
});

export default ProfileScreen;
