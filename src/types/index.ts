export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isMonetized: boolean;
  blockedUsers: string[];
  mutedUsers: string[];
}

export interface Post {
  id: string;
  authorId: string;
  type: 'text' | 'image' | 'video' | 'article';
  content: string;
  title?: string;
  image?: string;
  video?: string;
  videoThumb?: string;
  duration?: number;
  richText?: any;
  coverImage?: string;
  hashtags: string[];
  mentions: string[];
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  isDeleted: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  parentCommentId?: string;
  likes: number;
  replies: number;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  isDeleted: boolean;
}

export interface Engagement {
  id: string;
  userId: string;
  postId: string;
  type: 'like' | 'comment' | 'repost' | 'share' | 'bookmark';
  createdAt: Date;
}

export interface NexusCoin {
  id: string;
  senderId: string;
  recipientId: string;
  amount: number;
  postId: string;
  message?: string;
  createdAt: Date;
}

export interface CoinPack {
  id: string;
  coins: number;
  price: number; // in USD cents
  bonus: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'coin' | 'reply' | 'mention';
  senderId: string;
  postId?: string;
  commentId?: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface Trending {
  id: string;
  hashtag?: string;
  postId?: string;
  userId?: string;
  type: 'hashtag' | 'post' | 'user';
  count: number;
  rank: number;
  createdAt: Date;
}

export interface AdminRevenue {
  id: string;
  type: 'coin_sale' | 'creator_payout' | 'stripe_fee' | 'data_revenue';
  amount: number;
  transactionId: string;
  createdAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'owner' | 'moderator';
  createdAt: Date;
}
