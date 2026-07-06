import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '@constants/colors';
import { User } from '@types/index';

interface UserCardProps {
  user: User;
  isDarkMode: boolean;
  onPress: () => void;
  onFollow?: () => void;
  showFollowButton?: boolean;
  isFollowing?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isDarkMode,
  onPress,
  onFollow,
  showFollowButton = false,
  isFollowing = false,
}) => {
  const bgColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const subtleColor = isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={[styles.username, { color: textColor }]} numberOfLines={1}>
          {user.username}
        </Text>
        <Text style={[styles.bio, { color: subtleColor }]} numberOfLines={2}>
          {user.bio || 'No bio'}
        </Text>
        <View style={styles.stats}>
          <Text style={[styles.statText, { color: subtleColor }]}>
            {user.followers} followers
          </Text>
          <Text style={[styles.statText, { color: subtleColor }]}>
            {user.following} following
          </Text>
        </View>
      </View>
      {showFollowButton && (
        <TouchableOpacity
          style={[
            styles.followButton,
            { backgroundColor: isFollowing ? 'transparent' : COLORS.PRIMARY },
          ]}
          onPress={onFollow}
        >
          <Text style={[styles.followText, { color: isFollowing ? COLORS.PRIMARY : '#fff' }]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  bio: {
    fontSize: 13,
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
  },
  statText: {
    fontSize: 12,
    marginRight: 12,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
  },
  followText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default UserCard;
