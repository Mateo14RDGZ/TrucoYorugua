import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { colors } from '../theme/theme';
import Card from './Card';

const PlayerHand = ({ cards, selectedCard, onCardPress, canPlay }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu mano:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {cards.map((card, index) => (
          <Animatable.View
            key={`${card.suit}-${card.value}-${index}`}
            animation="fadeInUp"
            duration={400}
            delay={index * 100}
          >
            <TouchableOpacity
              onPress={() => canPlay && onCardPress(card)}
              disabled={!canPlay}
              style={[
                styles.cardWrapper,
                selectedCard?.suit === card.suit &&
                selectedCard?.value === card.value &&
                styles.cardWrapperSelected,
              ]}
            >
              <Card card={card} size="large" />
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>
      {!canPlay && (
        <Text style={styles.waitText}>Esperando tu turno...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
  },
  cardWrapper: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 4,
  },
  cardWrapperSelected: {
    borderColor: colors.secondary,
    transform: [{ translateY: -10 }],
  },
  waitText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default PlayerHand;
