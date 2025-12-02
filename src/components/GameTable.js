import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { colors } from '../theme/theme';
import PlayedCard from './PlayedCard';

const { width } = Dimensions.get('window');

const GameTable = ({ gameState, currentUserId }) => {
  const { players = [], playedCards = [], currentPlayer } = gameState;

  // Organizar jugadores (tú abajo, compañero arriba, oponentes a los lados)
  const positions = {
    bottom: null,
    top: null,
    left: null,
    right: null,
  };

  // Encontrar tu posición y asignar
  const currentPlayerIndex = players.findIndex((p) => p.id === currentUserId);
  if (currentPlayerIndex !== -1) {
    positions.bottom = players[currentPlayerIndex];
    positions.top = players[(currentPlayerIndex + 2) % 4];
    positions.left = players[(currentPlayerIndex + 3) % 4];
    positions.right = players[(currentPlayerIndex + 1) % 4];
  }

  const renderPlayer = (player, position) => {
    if (!player) return null;

    const isCurrentPlayer = currentPlayer === player.id;

    return (
      <View style={[styles.playerContainer, styles[`player${position}`]]}>
        <Animatable.View
          animation={isCurrentPlayer ? 'pulse' : undefined}
          iterationCount="infinite"
          duration={1500}
        >
          <Avatar.Text
            size={50}
            label={player.username?.substring(0, 2).toUpperCase() || '??'}
            style={[
              styles.avatar,
              isCurrentPlayer && styles.avatarActive,
            ]}
          />
        </Animatable.View>
        <Text style={styles.playerName}>{player.username || 'Jugador'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Jugador superior (compañero) */}
      {renderPlayer(positions.top, 'Top')}

      {/* Jugador izquierdo (oponente) */}
      {renderPlayer(positions.left, 'Left')}

      {/* Jugador derecho (oponente) */}
      {renderPlayer(positions.right, 'Right')}

      {/* Centro de la mesa con cartas jugadas */}
      <View style={styles.tableCenter}>
        <View style={styles.cardsPlayed}>
          {playedCards.map((card, index) => (
            <Animatable.View
              key={index}
              animation="zoomIn"
              duration={400}
            >
              <PlayedCard card={card} />
            </Animatable.View>
          ))}
        </View>
        {playedCards.length === 0 && (
          <Text style={styles.waitingText}>Esperando jugadas...</Text>
        )}
      </View>

      {/* Jugador inferior (tú) */}
      {renderPlayer(positions.bottom, 'Bottom')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0D5E3B', // Verde mesa de truco
    margin: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playerContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  playerTop: {
    top: 20,
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  playerBottom: {
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  playerLeft: {
    left: 20,
    top: '50%',
    transform: [{ translateY: -25 }],
  },
  playerRight: {
    right: 20,
    top: '50%',
    transform: [{ translateY: -25 }],
  },
  avatar: {
    backgroundColor: colors.textSecondary,
  },
  avatarActive: {
    backgroundColor: colors.secondary,
  },
  playerName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tableCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: -50 }],
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsPlayed: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  waitingText: {
    fontSize: 12,
    color: colors.textLight,
    opacity: 0.6,
    textAlign: 'center',
  },
});

export default GameTable;
