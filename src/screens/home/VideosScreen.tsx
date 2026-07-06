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
} from 'react-native';
import { COLORS } from '@constants/colors';
import { useUIStore } from '@store/index';

const VideosScreen: React.FC = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const [videos] = useState([
    { id: '1', title: 'React Native Tips', duration: 180, views: 5000 },
    { id: '2', title: 'Firebase Tutorial', duration: 240, views: 3200 },
    { id: '3', title: 'UI Design Guide', duration: 150, views: 2800 },
  ]);

  const bgColor = isDarkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const surfaceColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.header, { backgroundColor: surfaceColor }]}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Videos</Text>
      </View>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.videoCard, { backgroundColor: surfaceColor }]}>
            <View style={styles.videoThumbnail}>
              <Text style={styles.playIcon}>▶️</Text>
              <Text style={styles.duration}>
                {Math.floor(item.duration / 60)}:{String(item.duration % 60).padStart(2, '0')}
              </Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={[styles.videoTitle, { color: textColor }]} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={[styles.videoViews, { color: isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE }]}>
                {item.views.toLocaleString()} views
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  videoCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  videoThumbnail: {
    width: '100%',
    height: 150,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playIcon: {
    fontSize: 32,
    color: COLORS.PRIMARY,
  },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  videoInfo: {
    padding: 8,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  videoViews: {
    fontSize: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});

export default VideosScreen;
