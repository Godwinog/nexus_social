import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { COLORS } from '@constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isDarkMode: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isDarkMode,
  disabled = false,
  loading = false,
  icon,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;
    switch (variant) {
      case 'primary':
        return COLORS.PRIMARY;
      case 'secondary':
        return isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;
      case 'outline':
        return 'transparent';
      default:
        return COLORS.PRIMARY;
    }
  };

  const getTextColor = () => {
    if (variant === 'outline' || variant === 'secondary') {
      return isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
    }
    return '#fff';
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 20 };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER,
          ...getSizeStyles(),
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default Button;
