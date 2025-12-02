import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { colors } from '../theme/theme';

const GameActions = ({ gameState, currentUserId, onPlayCard, onCall, selectedCard }) => {
  const { currentPlayer, canCall = {} } = gameState;
  const isMyTurn = currentPlayer === currentUserId;

  const callOptions = [
    { type: 'envido', label: 'Envido', enabled: canCall.envido },
    { type: 'realEnvido', label: 'Real Envido', enabled: canCall.realEnvido },
    { type: 'faltaEnvido', label: 'Falta Envido', enabled: canCall.faltaEnvido },
    { type: 'truco', label: 'Truco', enabled: canCall.truco },
    { type: 'retruco', label: 'Retruco', enabled: canCall.retruco },
    { type: 'valeCuatro', label: 'Vale Cuatro', enabled: canCall.valeCuatro },
    { type: 'flor', label: 'Flor', enabled: canCall.flor },
    { type: 'mazo', label: 'Me voy al mazo', enabled: isMyTurn },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsScroll}
      >
        {isMyTurn && selectedCard && (
          <Button
            mode="contained"
            onPress={onPlayCard}
            style={[styles.actionButton, styles.playButton]}
            labelStyle={styles.actionButtonLabel}
          >
            Jugar Carta
          </Button>
        )}

        {callOptions.map((option) => (
          option.enabled && (
            <Button
              key={option.type}
              mode="outlined"
              onPress={() => onCall(option.type)}
              style={[
                styles.actionButton,
                option.type === 'mazo' && styles.mazoButton,
              ]}
              labelStyle={styles.actionButtonLabel}
              textColor={option.type === 'mazo' ? colors.error : colors.primary}
            >
              {option.label}
            </Button>
          )
        ))}
      </ScrollView>

      {gameState.currentCall && (
        <View style={styles.currentCallContainer}>
          <Chip
            icon="bullhorn"
            style={styles.currentCallChip}
            textStyle={styles.currentCallText}
          >
            {gameState.currentCall}
          </Chip>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.textSecondary + '20',
  },
  actionsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  actionButton: {
    marginHorizontal: 4,
    borderRadius: 20,
  },
  playButton: {
    backgroundColor: colors.primary,
  },
  mazoButton: {
    borderColor: colors.error,
  },
  actionButtonLabel: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  currentCallContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  currentCallChip: {
    backgroundColor: colors.secondary,
  },
  currentCallText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default GameActions;
