import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { Text, Appbar, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { subscribeToRoom, playCard, makeCall } from '../services/gameService';
import { colors } from '../theme/theme';
import GameTable from '../components/GameTable';
import PlayerHand from '../components/PlayerHand';
import GameActions from '../components/GameActions';
import ChatPanel from '../components/ChatPanel';
import MuestraDisplay from '../components/MuestraDisplay';

const { width, height } = Dimensions.get('window');

const GameScreen = ({ route, navigation }) => {
  const { roomId } = route.params;
  const { user } = useAuth();
  const [gameState, setGameState] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToRoom(roomId, (data) => {
      setGameState(data);
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleCardPress = (card) => {
    setSelectedCard(card);
  };

  const handlePlayCard = async () => {
    if (!selectedCard) {
      Alert.alert('Atención', 'Selecciona una carta para jugar');
      return;
    }

    const result = await playCard(roomId, user.uid, selectedCard);
    if (result.success) {
      setSelectedCard(null);
    }
  };

  const handleCall = async (callType) => {
    const result = await makeCall(roomId, user.uid, callType);
    if (!result.success) {
      Alert.alert('Error', result.error || 'No se pudo realizar el canto');
    }
  };

  const handleLeaveRoom = () => {
    Alert.alert(
      'Salir de la sala',
      '¿Estás seguro que quieres abandonar la partida?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!gameState) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando partida...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color={colors.textLight} onPress={handleLeaveRoom} />
          <Appbar.Content
            title={gameState.roomName || 'Partida'}
            titleStyle={styles.appbarTitle}
          />
          <Appbar.Action
            icon="chat"
            color={colors.textLight}
            onPress={() => setShowChat(!showChat)}
          />
        </Appbar.Header>

        <View style={styles.scoreContainer}>
          <View style={styles.teamScore}>
            <Text style={styles.teamName}>Nosotros</Text>
            <Text style={styles.score}>{gameState.team1Score || 0}</Text>
          </View>
          <Text style={styles.scoreSeparator}>-</Text>
          <View style={styles.teamScore}>
            <Text style={styles.teamName}>Ellos</Text>
            <Text style={styles.score}>{gameState.team2Score || 0}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.gameArea}>
        {/* Mostrar la muestra (carta que determina las piezas) */}
        {gameState.muestra && (
          <MuestraDisplay muestra={gameState.muestra} />
        )}

        <GameTable gameState={gameState} currentUserId={user.uid} />

        <View style={styles.handContainer}>
          <PlayerHand
            cards={gameState.playerCards || []}
            selectedCard={selectedCard}
            onCardPress={handleCardPress}
            canPlay={gameState.currentPlayer === user.uid}
          />
        </View>

        <GameActions
          gameState={gameState}
          currentUserId={user.uid}
          onPlayCard={handlePlayCard}
          onCall={handleCall}
          selectedCard={selectedCard}
        />
      </View>

      {showChat && (
        <ChatPanel
          roomId={roomId}
          userId={user.uid}
          username={user.username}
          onClose={() => setShowChat(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingBottom: 16,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  appbarTitle: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  teamScore: {
    alignItems: 'center',
    minWidth: 100,
  },
  teamName: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.9,
    marginBottom: 4,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  scoreSeparator: {
    fontSize: 28,
    color: colors.textLight,
    marginHorizontal: 16,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  handContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default GameScreen;
