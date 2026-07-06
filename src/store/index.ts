import { create } from 'zustand';
import { Post, Comment } from '@types/index';

interface FeedState {
  posts: Post[];
  isLoading: boolean;
  hasMore: boolean;
  feedType: 'foryou' | 'following';
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  removePost: (postId: string) => void;
  updatePost: (post: Post) => void;
  appendPosts: (posts: Post[]) => void;
  setLoading: (loading: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
  setFeedType: (type: 'foryou' | 'following') => void;
  resetFeed: () => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  isLoading: false,
  hasMore: true,
  feedType: 'foryou',
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  removePost: (postId) => set((state) => ({
    posts: state.posts.filter((p) => p.id !== postId),
  })),
  updatePost: (post) => set((state) => ({
    posts: state.posts.map((p) => (p.id === post.id ? post : p)),
  })),
  appendPosts: (posts) => set((state) => ({ posts: [...state.posts, ...posts] })),
  setLoading: (isLoading) => set({ isLoading }),
  setHasMore: (hasMore) => set({ hasMore }),
  setFeedType: (feedType) => set({ feedType, posts: [], hasMore: true }),
  resetFeed: () => set({ posts: [], hasMore: true, isLoading: false }),
}));

interface UIState {
  isDarkMode: boolean;
  isDataSaver: boolean;
  toggleTheme: () => void;
  setDataSaver: (enabled: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: true,
  isDataSaver: false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setDataSaver: (enabled) => set({ isDataSaver: enabled }),
}));

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnread: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
}));
