import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { colors } from '../theme/theme';

const avatars = [
  { id: 'avatar1', emoji: '🧉' },
  { id: 'avatar2', emoji: '⚽' },
  { id: 'avatar3', emoji: '🎸' },
  { id: 'avatar4', emoji: '🏖️' },
  { id: 'avatar5', emoji: '🎭' },
  { id: 'avatar6', emoji: '🌞' },
  { id: 'avatar7', emoji: '🎪' },
  { id: 'avatar8', emoji: '🎨' },
];

const AvatarSelector = ({ selectedAvatar, onSelectAvatar }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarsGrid}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarButton,
              selectedAvatar === avatar.id && styles.avatarButtonSelected,
            ]}
            onPress={() => onSelectAvatar(avatar.id)}
          >
            <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  avatarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarButton: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  avatarEmoji: {
    fontSize: 32,
  },
});

export default AvatarSelector;
