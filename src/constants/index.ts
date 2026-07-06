export * from './colors';
export * from './theme';

export const COIN_PACKS = [
  { coins: 50, price: 0.99 },
  { coins: 250, price: 4.99, bonus: 25 },
  { coins: 500, price: 9.99, bonus: 75 },
  { coins: 2500, price: 49.99, bonus: 500 },
];

export const CREATOR_PAYOUT_RATE = 0.7; // 70%
export const ADMIN_DATA_REVENUE_RATE = 0.1; // 10%

export const POST_CHAR_LIMIT = 300;
export const BIO_CHAR_LIMIT = 160;
export const VIDEO_DURATION_LIMIT = 180; // 3 minutes in seconds
export const ARTICLE_MIN_WORDS = 100;

export const THEME_OPTIONS = {
  light: 'light',
  dark: 'dark',
  auto: 'auto',
};

export const NOTIFICATION_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  FOLLOW: 'follow',
  COIN: 'coin',
  REPLY: 'reply',
  MENTION: 'mention',
};

export const POST_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  ARTICLE: 'article',
};
