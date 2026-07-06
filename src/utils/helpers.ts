import uuid from 'react-native-uuid';

export const generateId = () => uuid.v4() as string;

export const formatDate = (date: Date | any): string => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const extractHashtags = (text: string): string[] => {
  const regex = /#\w+/g;
  const matches = text.match(regex);
  return matches ? matches.map(tag => tag.slice(1).toLowerCase()) : [];
};

export const extractMentions = (text: string): string[] => {
  const regex = /@\w+/g;
  const matches = text.match(regex);
  return matches ? matches.map(mention => mention.slice(1).toLowerCase()) : [];
};

export const truncateText = (text: string, limit: number): string => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateUsername = (username: string): boolean => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

export const formatCurrency = (amount: number): string => {
  return `$${(amount / 100).toFixed(2)}`;
};

export const calculateCoins = (price: number, bonus: number = 0): number => {
  return Math.floor(price * 100) + bonus;
};
