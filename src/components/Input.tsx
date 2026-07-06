import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@constants/colors';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isDarkMode: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  maxLength?: number;
  icon?: string;
  onIconPress?: () => void;
  editable?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  isDarkMode,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  maxLength,
  icon,
  onIconPress,
  editable = true,
}) => {
  const bgColor = isDarkMode ? COLORS.DARK_SURFACE : COLORS.LIGHT_SURFACE;
  const textColor = isDarkMode ? COLORS.DARK_TEXT : COLORS.LIGHT_TEXT;
  const borderColor = isDarkMode ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER;
  const placeholderColor = isDarkMode ? COLORS.DARK_SUBTITLE : COLORS.LIGHT_SUBTITLE;

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      <TextInput
        style={[styles.input, { color: textColor }, multiline && styles.multiline]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        maxLength={maxLength}
        editable={editable}
      />
      {icon && (
        <TouchableOpacity onPress={onIconPress}>
          <Text style={styles.icon}>{icon}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  icon: {
    fontSize: 18,
  },
});

export default Input;
