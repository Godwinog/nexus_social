import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '@constants/colors';
import { useUIStore, useNotificationStore } from '@store/index';
import { Notification } from '@types/index';

const NotificationsScreen: React.FC = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const { unreadCount, setUnreadCount } = useNotificationStore();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: 'user1',
      type: 'like',
      senderId: 'sender1',
      postId: 'post1',
      message: 'liked your post',
      read: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      userId: 'user1',
      type: 'follow',
      senderId: 'sender2',
      message: 'started following you',
      read: false,
      createdAt: new Date(),
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Mark all as read
      setUnreadCount(0);
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    // Load notifications from Firebase
    setTimeout(() => setRefreshing(false), 500);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'follow':
        return '👥';
      case 'coin':
        return '💰';
      case 'reply':
        return '↩️';
      case 'mention':
        return '@';
      default:
        return '📢';
    }
  };

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const surfaceColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;
  const borderColor = isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.header, { backgroundColor: surfaceColor, borderBottomColor: borderColor }]}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.notificationItem,
              {
                backgroundColor: item.read ? 'transparent' : surfaceColor,
                borderBottomColor: borderColor,
              },
            ]}
          >
            <Text style={styles.notificationIcon}>{getNotificationIcon(item.type)}</Text>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationMessage, { color: textColor }]} numberOfLines={2}>
                Someone {item.message}
              </Text>
              <Text style={[styles.notificationTime, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
                2 hours ago
              </Text>
            </View>
            {!item.read && <View style={[styles.unreadDot, { backgroundColor: COLORS.PRIMARY }]} />}
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={[styles.emptyText, { color: textColor }]}>No notifications yet</Text>
          </View>
        }
        contentContainerStyle={notifications.length === 0 ? styles.emptyList : undefined}
      />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: COLORS.ERROR,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  notificationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default NotificationsScreen;
