import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input } from '@components/index';
import { COLORS } from '@constants/colors';
import { useUIStore } from '@store/index';
import { POST_CHAR_LIMIT } from '@constants/index';
import * as ImagePicker from 'expo-image-picker';

type Props = NativeStackScreenProps<any, 'CreatePost'>;

const CreatePostScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const [postType, setPostType] = useState<'text' | 'image' | 'video' | 'article'>('text');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.cancelled && result.assets && result.assets[0]) {
      setImage(result.assets[0].uri);
      setPostType('image');
    }
  };

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('Empty Post', 'Please add content to your post');
      return;
    }

    setLoading(true);
    try {
      // Create post with Firebase
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
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
          <Text style={[styles.cancelButton, { color: COLORS.PRIMARY }]}>✕</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Create Post</Text>
        <Button
          title="Post"
          onPress={handlePost}
          isDarkMode={isDarkMode}
          loading={loading}
          size="small"
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Post Type Selection */}
        <View style={styles.typeSelector}>
          {(['text', 'image', 'video', 'article'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                {
                  backgroundColor: postType === type ? COLORS.PRIMARY : surfaceColor,
                  borderColor,
                },
              ]}
              onPress={() => setPostType(type)}
            >
              <Text
                style={[
                  styles.typeText,
                  { color: postType === type ? '#fff' : textColor },
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Input */}
        <View style={[styles.inputContainer, { backgroundColor: surfaceColor, borderColor }]}>
          <TextInput
            placeholder={`What's on your mind? (${content.length}/${POST_CHAR_LIMIT})`}
            placeholderTextColor={isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE}
            value={content}
            onChangeText={setContent}
            maxLength={POST_CHAR_LIMIT}
            multiline
            style={[styles.input, { color: textColor }]}
          />
        </View>

        {/* Image Preview */}
        {image && postType === 'image' && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image }} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setImage(null)}
            >
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Media Upload */}
        {(postType === 'image' || postType === 'video') && !image && (
          <TouchableOpacity
            style={[styles.uploadArea, { backgroundColor: surfaceColor, borderColor }]}
            onPress={pickImage}
          >
            <Text style={styles.uploadIcon}>🖼️</Text>
            <Text style={[styles.uploadText, { color: textColor }]}>
              Tap to upload {postType}
            </Text>
          </TouchableOpacity>
        )}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  cancelButton: {
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    minHeight: 120,
  },
  input: {
    fontSize: 15,
    lineHeight: 20,
  },
  imagePreview: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 300,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default CreatePostScreen;
