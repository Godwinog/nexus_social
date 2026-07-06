import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PostCard } from '@components/index';
import { COLORS } from '@constants/colors';
import { useFeedStore, useUIStore } from '@store/index';
import { postService } from '@services/postService';

const FeedScreen: React.FC = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const { posts, isLoading, feedType, setPosts, appendPosts, setLoading } = useFeedStore();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  useFocusEffect(
    useCallback(() => {
      loadFeed();
    }, [feedType])
  );

  const loadFeed = async () => {
    setLoading(true);
    try {
      const newPosts = await postService.getFeed(feedType, '', 20);
      setPosts(newPosts);
      setPage(1);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadFeed();
    } finally {
      setRefreshing(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      const morePosts = await postService.getFeed(feedType, '', 20);
      appendPosts(morePosts);
      setPage(page + 1);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            author={{ id: item.authorId, email: '', username: 'user', avatar: '', bio: '', followers: 0, following: 0, createdAt: new Date(), updatedAt: new Date(), isVerified: false, isMonetized: false, blockedUsers: [], mutedUsers: [] }}
            isDarkMode={isDarkMode}
            onPress={() => {}}
            onLike={() => {}}
            onComment={() => {}}
            onRepost={() => {}}
            onShare={() => {}}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={COLORS.PRIMARY} />}
        ListEmptyComponent={
          !isLoading && <Text style={[styles.emptyText, { color: textColor }]}>No posts yet</Text>
        }
        ListHeaderComponent={
          isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={COLORS.PRIMARY} style={styles.loader} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});

export default FeedScreen;
