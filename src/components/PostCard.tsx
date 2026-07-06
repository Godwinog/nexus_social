import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENT } from '@constants/colors';
import { formatDate, formatNumber } from '@utils/helpers';
import { Post, User } from '@types/index';

interface PostCardProps {
  post: Post;
  author: User;
  isDarkMode: boolean;
  onPress: () => void;
  onLike: () => void;
  onComment: () => void;
  onRepost: () => void;
  onShare: () => void;
  liked?: boolean;
}

const { width } = Dimensions.get('window');

const PostCard: React.FC<PostCardProps> = ({
  post,
  author,
  isDarkMode,
  onPress,
  onLike,
  onComment,
  onRepost,
  onShare,
  liked = false,
}) => {
  const bgColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const subtleColor = isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: bgColor, borderColor: isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: author.avatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={[styles.name, { color: textColor }]} numberOfLines={1}>
            {author.username}
          </Text>
          <Text style={[styles.timestamp, { color: subtleColor }]}>{formatDate(post.createdAt)}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {post.type === 'text' && (
          <Text style={[styles.text, { color: textColor }]} numberOfLines={4}>
            {post.content}
          </Text>
        )}

        {(post.type === 'image' || post.type === 'article') && post.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {post.type === 'video' && post.video && (
          <View style={styles.videoContainer}>
            <Image source={{ uri: post.videoThumb }} style={styles.video} resizeMode="cover" />
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
            {post.duration && (
              <Text style={styles.duration}>{Math.floor(post.duration / 60)}:{String(post.duration % 60).padStart(2, '0')}</Text>
            )}
          </View>
        )}
      </View>

      {/* Stats */}
      <View style={[styles.stats, { borderTopColor: isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER }]}>
        <Text style={[styles.statText, { color: subtleColor }]}>
          {formatNumber(post.comments)} comments
        </Text>
        <Text style={[styles.statText, { color: subtleColor }]}>
          {formatNumber(post.reposts)} reposts
        </Text>
        <Text style={[styles.statText, { color: subtleColor }]}>
          {formatNumber(post.likes)} likes
        </Text>
      </View>

      {/* Actions */}
      <View style={[styles.actions, { borderTopColor: isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER }]}>
        <TouchableOpacity style={styles.action} onPress={onComment}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={[styles.actionText, { color: subtleColor }]}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onRepost}>
          <Text style={styles.actionIcon}>🔄</Text>
          <Text style={[styles.actionText, { color: subtleColor }]}>Repost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onLike}>
          <Text style={[styles.actionIcon, { opacity: liked ? 1 : 0.6 }]}>{liked ? '❤️' : '🤍'}</Text>
          <Text style={[styles.actionText, { color: liked ? COLORS.ERROR : subtleColor }]}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onShare}>
          <Text style={styles.actionIcon}>↗️</Text>
          <Text style={[styles.actionText, { color: subtleColor }]}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 13,
  },
  content: {
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginTop: 8,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: '#fff',
  },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  stats: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderTopWidth: 1,
    justifyContent: 'space-around',
  },
  statText: {
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderTopWidth: 1,
    justifyContent: 'space-around',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default PostCard;
