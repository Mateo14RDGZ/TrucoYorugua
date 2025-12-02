import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/theme';

const { width } = Dimensions.get('window');

// Palos de la baraja española
const suits = {
  espadas: '♠',
  bastos: '♣',
  oros: '♦',
  copas: '♥',
};

const suitColors = {
  espadas: colors.cardBlack,
  bastos: colors.cardBlack,
  oros: colors.cardRed,
  copas: colors.cardRed,
};

const Card = ({ card, size = 'medium' }) => {
  if (!card) return null;

  const { suit, value } = card;
  const displayValue = value === 10 ? 'S' : value === 11 ? 'C' : value === 12 ? 'R' : value;

  const cardWidth = size === 'large' ? 70 : size === 'small' ? 40 : 55;
  const cardHeight = size === 'large' ? 100 : size === 'small' ? 60 : 80;
  const fontSize = size === 'large' ? 24 : size === 'small' ? 14 : 18;

  return (
    <View
      style={[
        styles.card,
        { width: cardWidth, height: cardHeight },
      ]}
    >
      <View style={styles.cardContent}>
        <Text
          style={[
            styles.cardValue,
            { fontSize, color: suitColors[suit] },
          ]}
        >
          {displayValue}
        </Text>
        <Text
          style={[
            styles.cardSuit,
            { fontSize: fontSize * 1.2, color: suitColors[suit] },
          ]}
        >
          {suits[suit]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.textSecondary + '30',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardValue: {
    fontWeight: 'bold',
  },
  cardSuit: {
    fontWeight: 'bold',
  },
});

export default Card;
