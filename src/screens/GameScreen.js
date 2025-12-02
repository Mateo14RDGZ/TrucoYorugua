import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Text, Button, Card as PaperCard, Badge } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Configuración del mazo
const SUITS = ['espadas', 'bastos', 'oros', 'copas'];
const SUIT_SYMBOLS = { espadas: '♠', bastos: '♣', oros: '♦', copas: '♥' };
const SUIT_ORDER = { espadas: 4, bastos: 3, oros: 2, copas: 1 };
const VALUES = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]; // Sin 8 ni 9
const BASE_CARD_ORDER = [1, 2, 3, 12, 11, 10, 7, 6, 5, 4];

const GameScreen = ({ navigation }) => {
  const [gamePhase, setGamePhase] = useState('initial'); // initial, playing, roundEnd, gameEnd
  const [muestra, setMuestra] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentBaza, setCurrentBaza] = useState([]);
  const [bazasWon, setBazasWon] = useState({ team1: 0, team2: 0 });
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [selectedCard, setSelectedCard] = useState(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [trucoLevel, setTrucoLevel] = useState(0); // 0: nada, 1: truco, 2: retruco, 3: vale4
  const [trucoPoints, setTrucoPoints] = useState(1);
  const [envidoPhase, setEnvidoPhase] = useState(false);
  const [envidoCalled, setEnvidoCalled] = useState(false);
  const [lastWinner, setLastWinner] = useState(null);
  const [message, setMessage] = useState('');

  // Inicializar juego
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    
    // Repartir 3 cartas a cada jugador
    const newPlayers = [
      { id: 0, name: 'Tú', hand: shuffled.slice(0, 3), team: 1, isHuman: true },
      { id: 1, name: 'Bot 1', hand: shuffled.slice(3, 6), team: 2, isHuman: false },
      { id: 2, name: 'Compañero', hand: shuffled.slice(6, 9), team: 1, isHuman: false },
      { id: 3, name: 'Bot 2', hand: shuffled.slice(9, 12), team: 2, isHuman: false },
    ];

    // La carta 13 es la muestra
    const muestraCard = shuffled[12];
    
    setPlayers(newPlayers);
    setMuestra(muestraCard);
    setCurrentPlayerIndex(0);
    setCurrentBaza([]);
    setBazasWon({ team1: 0, team2: 0 });
    setRoundNumber(0);
    setGamePhase('playing');
    setTrucoLevel(0);
    setTrucoPoints(1);
    setEnvidoPhase(true);
    setEnvidoCalled(false);
    setLastWinner(null);
    setMessage('¡Nueva mano! La muestra es: ' + cardToString(muestraCard));
  };

  // Crear mazo
  const createDeck = () => {
    const deck = [];
    SUITS.forEach(suit => {
      VALUES.forEach(value => {
        deck.push({ suit, value });
      });
    });
    return deck;
  };

  // Barajar
  const shuffleDeck = (deck) => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Convertir carta a string
  const cardToString = (card) => {
    return `${card.value}${SUIT_SYMBOLS[card.suit]}`;
  };

  // Obtener orden dinámico según muestra
  const getDynamicCardOrder = () => {
    if (!muestra) return BASE_CARD_ORDER;
    
    const muestraValue = muestra.value;
    const muestraIndex = BASE_CARD_ORDER.indexOf(muestraValue);
    
    // Rotar el orden: las piezas van primero, luego desde muestra+1
    const rotated = [
      ...BASE_CARD_ORDER.slice(muestraIndex + 1),
      ...BASE_CARD_ORDER.slice(0, muestraIndex)
    ];
    
    return rotated;
  };

  // Comparar dos cartas
  const compareCards = (card1, card2) => {
    if (!muestra) return 0;

    // Las piezas (mismo valor que muestra) son las más altas
    const isPieza1 = card1.value === muestra.value;
    const isPieza2 = card2.value === muestra.value;

    if (isPieza1 && !isPieza2) return 1;
    if (!isPieza1 && isPieza2) return -1;
    
    if (isPieza1 && isPieza2) {
      // Entre piezas, gana por palo
      return SUIT_ORDER[card1.suit] - SUIT_ORDER[card2.suit];
    }

    // Comparar por orden dinámico
    const order = getDynamicCardOrder();
    const index1 = order.indexOf(card1.value);
    const index2 = order.indexOf(card2.value);

    if (index1 !== index2) {
      return index2 - index1; // Menor índice = mayor valor
    }

    // Mismo valor, comparar por palo
    return SUIT_ORDER[card1.suit] - SUIT_ORDER[card2.suit];
  };

  // Jugar carta humano
  const handlePlayCard = () => {
    if (!selectedCard) {
      Alert.alert('Atención', 'Selecciona una carta para jugar');
      return;
    }

    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.isHuman) return;

    playCardForPlayer(currentPlayer, selectedCard);
    setSelectedCard(null);
  };

  // Jugar carta de cualquier jugador
  const playCardForPlayer = (player, card) => {
    // Agregar carta a la baza actual
    const newBaza = [...currentBaza, { player: player.id, card }];
    setCurrentBaza(newBaza);

    // Remover carta de la mano del jugador
    const updatedPlayers = players.map(p => {
      if (p.id === player.id) {
        return { ...p, hand: p.hand.filter(c => c !== card) };
      }
      return p;
    });
    setPlayers(updatedPlayers);

    setMessage(`${player.name} jugó ${cardToString(card)}`);

    // Si completamos la baza (4 cartas), evaluarla
    if (newBaza.length === 4) {
      setTimeout(() => evaluateBaza(newBaza, updatedPlayers), 1500);
    } else {
      // Siguiente jugador
      const nextIndex = (currentPlayerIndex + 1) % 4;
      setCurrentPlayerIndex(nextIndex);
      
      // Si es bot, jugar automáticamente
      setTimeout(() => {
        if (!updatedPlayers[nextIndex].isHuman) {
          botPlayCard(updatedPlayers[nextIndex], updatedPlayers);
        }
      }, 1000);
    }
  };

  // Bot juega carta (estrategia mejorada)
  const botPlayCard = (botPlayer, currentPlayers) => {
    const hand = botPlayer.hand;
    if (hand.length === 0) return;

    let cardToPlay;
    
    if (currentBaza.length === 3) {
      // Es el último, intentar ganar con la carta más baja posible
      const winningCards = hand.filter(card => 
        currentBaza.every(play => compareCards(card, play.card) > 0)
      );
      
      if (winningCards.length > 0) {
        // Ganar con la carta más baja posible
        cardToPlay = winningCards.reduce((lowest, card) => 
          compareCards(lowest, card) < 0 ? lowest : card
        );
      } else {
        // No puede ganar, jugar la carta más baja
        cardToPlay = hand.reduce((lowest, card) => 
          compareCards(lowest, card) < 0 ? lowest : card
        );
      }
    } else if (currentBaza.length === 0) {
      // Es el primero, jugar carta media
      const sortedHand = [...hand].sort((a, b) => compareCards(b, a));
      cardToPlay = sortedHand[Math.floor(sortedHand.length / 2)];
    } else {
      // Es segundo o tercero
      const highestInBaza = currentBaza.reduce((highest, play) => 
        compareCards(play.card, highest.card) > 0 ? play : highest
      );
      
      const canWin = hand.some(card => compareCards(card, highestInBaza.card) > 0);
      
      if (canWin && currentBaza.length === 1) {
        // Puede ganar y es el segundo, intentar ganar
        const winningCards = hand.filter(card => 
          compareCards(card, highestInBaza.card) > 0
        );
        cardToPlay = winningCards.reduce((lowest, card) => 
          compareCards(lowest, card) < 0 ? lowest : card
        );
      } else {
        // No puede ganar o es el tercero, jugar bajo
        cardToPlay = hand.reduce((lowest, card) => 
          compareCards(lowest, card) < 0 ? lowest : card
        );
      }
    }

    playCardForPlayer(botPlayer, cardToPlay);
  };

  // Evaluar baza
  const evaluateBaza = (baza, currentPlayers) => {
    // Encontrar ganador de la baza
    let winningPlay = baza[0];
    
    baza.forEach(play => {
      if (compareCards(play.card, winningPlay.card) > 0) {
        winningPlay = play;
      }
    });

    const winner = currentPlayers.find(p => p.id === winningPlay.player);
    const winningTeam = winner.team === 1 ? 'team1' : 'team2';

    setMessage(`¡${winner.name} gana la baza!`);
    setLastWinner(winner.id);

    // Actualizar bazas ganadas
    const newBazasWon = {
      ...bazasWon,
      [winningTeam]: bazasWon[winningTeam] + 1
    };
    setBazasWon(newBazasWon);
    setCurrentBaza([]);

    // Ver si se termina la ronda (3 bazas jugadas o alguien ganó 2)
    const totalBazas = newBazasWon.team1 + newBazasWon.team2;
    
    if (newBazasWon.team1 >= 2 || newBazasWon.team2 >= 2 || totalBazas >= 3) {
      setTimeout(() => endRound(newBazasWon), 2000);
    } else {
      // Siguiente baza: empieza el ganador
      setTimeout(() => {
        setCurrentPlayerIndex(winner.id);
        setRoundNumber(roundNumber + 1);
        
        // Si es bot, jugar
        if (!winner.isHuman) {
          setTimeout(() => botPlayCard(winner, currentPlayers), 1000);
        }
      }, 2000);
    }
  };

  // Finalizar ronda
  const endRound = (finalBazas) => {
    let roundWinner;
    if (finalBazas.team1 > finalBazas.team2) {
      roundWinner = 'team1';
      setMessage('¡Tu equipo ganó la mano!');
    } else if (finalBazas.team2 > finalBazas.team1) {
      roundWinner = 'team2';
      setMessage('El equipo rival ganó la mano');
    } else {
      // Empate: gana el que ganó la primera baza
      roundWinner = lastWinner % 2 === 0 ? 'team1' : 'team2';
      setMessage('¡Empate! Gana quien ganó la primera baza');
    }

    // Sumar puntos
    const newScores = {
      ...scores,
      [roundWinner]: scores[roundWinner] + trucoPoints
    };
    setScores(newScores);

    // Ver si alguien ganó el juego
    if (newScores.team1 >= 30 || newScores.team2 >= 30) {
      setGamePhase('gameEnd');
    } else {
      setTimeout(() => {
        startNewGame();
      }, 3000);
    }
  };

  // Cantar truco
  const handleTruco = () => {
    if (trucoLevel >= 3) {
      Alert.alert('Ya está en Vale Cuatro');
      return;
    }
    
    const levels = ['Truco', 'Re Truco', 'Vale Cuatro'];
    const points = [2, 3, 4];
    
    setTrucoLevel(trucoLevel + 1);
    setTrucoPoints(points[trucoLevel]);
    setMessage(`¡${levels[trucoLevel]}! Ahora vale ${points[trucoLevel]} puntos`);
  };

  // Cantar envido
  const handleEnvido = () => {
    if (!envidoPhase) {
      Alert.alert('El envido se canta antes de jugar');
      return;
    }
    
    if (envidoCalled) {
      Alert.alert('Ya se cantó envido');
      return;
    }

    setEnvidoCalled(true);
    setMessage('¡Envido! (Funcionalidad completa en desarrollo)');
    
    // Desactivar fase de envido después del primer canto
    setTimeout(() => {
      setEnvidoPhase(false);
    }, 2000);
  };

  // Volver al menú
  const handleBackToMenu = () => {
    Alert.alert(
      'Salir',
      '¿Quieres volver al menú principal?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', onPress: () => navigation.goBack() }
      ]
    );
  };

  // Renderizar carta estilo baraja española
  const renderCard = (card, onPress, isSelected = false) => {
    const suitColors = {
      espadas: '#2C3E50',
      bastos: '#8B4513',
      oros: '#FFD700',
      copas: '#C41E3A'
    };

    const cardBgColors = {
      espadas: '#F8F9FA',
      bastos: '#FFF8DC',
      oros: '#FFFACD',
      copas: '#FFF0F5'
    };

    return (
      <TouchableOpacity
        key={`${card.value}-${card.suit}`}
        onPress={() => onPress && onPress(card)}
        activeOpacity={0.7}
        disabled={!onPress}
      >
        <Animatable.View
          animation={isSelected ? 'pulse' : undefined}
          iterationCount="infinite"
          duration={1000}
        >
          <View
            style={[
              styles.card,
              { backgroundColor: cardBgColors[card.suit] },
              isSelected && styles.cardSelected
            ]}
          >
            <View style={styles.cardBorder}>
              <View style={styles.cardTopCorner}>
                <Text style={[styles.cardValueSmall, { color: suitColors[card.suit] }]}>
                  {card.value}
                </Text>
                <Text style={[styles.cardSuitSmall, { color: suitColors[card.suit] }]}>
                  {SUIT_SYMBOLS[card.suit]}
                </Text>
              </View>
              
              <View style={styles.cardCenter}>
                <Text style={[styles.cardSuitLarge, { color: suitColors[card.suit] }]}>
                  {SUIT_SYMBOLS[card.suit]}
                </Text>
                <Text style={[styles.cardValueLarge, { color: suitColors[card.suit] }]}>
                  {card.value}
                </Text>
              </View>
              
              <View style={styles.cardBottomCorner}>
                <Text style={[styles.cardSuitSmall, { color: suitColors[card.suit] }]}>
                  {SUIT_SYMBOLS[card.suit]}
                </Text>
                <Text style={[styles.cardValueSmall, { color: suitColors[card.suit] }]}>
                  {card.value}
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  const currentPlayer = players[currentPlayerIndex];
  const humanPlayer = players.find(p => p.isHuman);

  return (
    <LinearGradient
      colors={['#0038A8', '#74ACDF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Button
          icon="arrow-left"
          mode="text"
          onPress={handleBackToMenu}
          labelStyle={styles.backButton}
        >
          Menú
        </Button>
        <View style={styles.scoreBoard}>
          <View style={styles.teamScoreBox}>
            <Text style={styles.teamLabel}>Tu Equipo</Text>
            <Text style={styles.scoreText}>{scores.team1}</Text>
          </View>
          <Text style={styles.scoreSeparator}>-</Text>
          <View style={styles.teamScoreBox}>
            <Text style={styles.teamLabel}>Rivales</Text>
            <Text style={styles.scoreText}>{scores.team2}</Text>
          </View>
        </View>
      </View>

      {gamePhase === 'gameEnd' ? (
        <View style={styles.endGameContainer}>
          <Animatable.View animation="bounceIn" style={styles.endGameCard}>
            <Text style={styles.endGameTitle}>
              {scores.team1 >= 30 ? '🎉 ¡GANASTE!' : '😔 PERDISTE'}
            </Text>
            <Text style={styles.endGameScore}>
              {scores.team1} - {scores.team2}
            </Text>
            <Button
              mode="contained"
              onPress={startNewGame}
              style={styles.playAgainButton}
            >
              Jugar de nuevo
            </Button>
            <Button
              mode="outlined"
              onPress={handleBackToMenu}
              style={styles.menuButton}
              labelStyle={styles.menuButtonLabel}
            >
              Volver al menú
            </Button>
          </Animatable.View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.gameContainer}>
          
          {/* Muestra e Información */}
          {muestra && (
            <Animatable.View animation="flipInY" style={styles.muestraContainer}>
              <View style={styles.muestraHeader}>
                <View style={styles.muestraInfo}>
                  <Text style={styles.muestraLabel}>🎴 MUESTRA</Text>
                  <Text style={styles.muestraDescription}>
                    Las piezas son todos los <Text style={styles.highlight}>{muestra.value}</Text>
                  </Text>
                  <Text style={styles.muestraHint}>
                    ♠ → ♣ → ♦ → ♥ (orden de palos)
                  </Text>
                </View>
                <View style={styles.muestraCardContainer}>
                  {renderCard(muestra)}
                </View>
              </View>
            </Animatable.View>
          )}

          {/* Mensaje */}
          {message && (
            <Animatable.View animation="fadeIn" style={styles.messageContainer}>
              <Text style={styles.messageText}>{message}</Text>
            </Animatable.View>
          )}

          {/* Mesa - Baza actual */}
          <View style={styles.table}>
            <Text style={styles.tableLabel}>Mesa</Text>
            <View style={styles.bazaContainer}>
              {currentBaza.length === 0 ? (
                <Text style={styles.emptyTableText}>No hay cartas en la mesa</Text>
              ) : (
                currentBaza.map((play, index) => {
                  const player = players.find(p => p.id === play.player);
                  return (
                    <Animatable.View
                      key={index}
                      animation="zoomIn"
                      style={styles.playedCardContainer}
                    >
                      <Text style={styles.playerLabel}>{player?.name}</Text>
                      {renderCard(play.card)}
                    </Animatable.View>
                  );
                })
              )}
            </View>
          </View>

          {/* Información */}
          <View style={styles.infoRow}>
            <Badge style={styles.badge}>Baza {roundNumber + 1}/3</Badge>
            <Badge style={styles.badge}>
              Bazas: {bazasWon.team1} - {bazasWon.team2}
            </Badge>
            {trucoLevel > 0 && (
              <Badge style={styles.badgeTruco}>
                {['Truco', 'Re Truco', 'Vale 4'][trucoLevel - 1]}
              </Badge>
            )}
          </View>

          {/* Turno actual */}
          <View style={styles.turnIndicator}>
            <Text style={styles.turnText}>
              Turno: <Text style={styles.turnPlayerName}>{currentPlayer?.name}</Text>
            </Text>
          </View>

          {/* Mano del jugador humano */}
          {humanPlayer && (
            <View style={styles.handSection}>
              <View style={styles.handHeader}>
                <Text style={styles.handLabel}>🎴 Tu Mano</Text>
                {currentPlayer?.isHuman && (
                  <Text style={styles.handHint}>👆 Toca una carta para seleccionarla</Text>
                )}
                {!currentPlayer?.isHuman && (
                  <Text style={styles.handHintWait}>⏳ Esperando turno...</Text>
                )}
              </View>
              <View style={styles.handCards}>
                {humanPlayer.hand.length === 0 ? (
                  <Text style={styles.noCardsText}>No te quedan cartas</Text>
                ) : (
                  humanPlayer.hand.map(card => 
                    renderCard(
                      card,
                      currentPlayer?.isHuman ? () => setSelectedCard(card) : null,
                      selectedCard === card
                    )
                  )
                )}
              </View>
            </View>
          )}

          {/* Acciones */}
          <View style={styles.actionsContainer}>
            {currentPlayer?.isHuman && selectedCard && (
              <Animatable.View animation="bounceIn">
                <Button
                  mode="contained"
                  onPress={handlePlayCard}
                  style={styles.playButton}
                  icon="cards-playing-outline"
                  contentStyle={styles.playButtonContent}
                >
                  JUGAR {cardToString(selectedCard)}
                </Button>
              </Animatable.View>
            )}
            
            {currentPlayer?.isHuman && !selectedCard && (
              <View style={styles.instructionBox}>
                <Text style={styles.instructionText}>
                  ℹ️ Selecciona una carta de tu mano para jugarla
                </Text>
              </View>
            )}
            
            <View style={styles.callButtons}>
              {envidoPhase && !envidoCalled && currentPlayer?.isHuman && (
                <Button
                  mode="outlined"
                  onPress={handleEnvido}
                  style={[styles.callButton, styles.envidoButton]}
                  labelStyle={styles.callButtonLabel}
                  icon="cards-diamond"
                >
                  Envido
                </Button>
              )}
              {currentPlayer?.isHuman && (
                <Button
                  mode="outlined"
                  onPress={handleTruco}
                  style={[styles.callButton, styles.trucoButton]}
                  labelStyle={styles.callButtonLabel}
                  disabled={trucoLevel >= 3}
                  icon="fire"
                >
                  {trucoLevel === 0 ? 'Truco!' : trucoLevel === 1 ? 'Re Truco!' : 'Vale 4!'}
                </Button>
              )}
            </View>
          </View>

        </ScrollView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 20,
  },
  teamScoreBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 100,
  },
  teamLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scoreSeparator: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    opacity: 0.6,
  },
  gameContainer: {
    padding: 16,
    gap: 16,
  },
  muestraContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  muestraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  muestraInfo: {
    flex: 1,
  },
  muestraLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0038A8',
    marginBottom: 4,
  },
  muestraDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  muestraHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#FF6B35',
    fontSize: 16,
  },
  muestraCardContainer: {
    transform: [{ scale: 0.9 }],
  },
  messageContainer: {
    backgroundColor: 'rgba(255,107,53,0.95)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    minHeight: 180,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  tableLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  bazaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  emptyTableText: {
    color: '#FFFFFF',
    opacity: 0.6,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  playedCardContainer: {
    alignItems: 'center',
    gap: 8,
  },
  playerLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  badgeTruco: {
    backgroundColor: '#FF6B35',
  },
  turnIndicator: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  turnText: {
    fontSize: 15,
    color: '#333',
  },
  turnPlayerName: {
    fontWeight: 'bold',
    color: '#0038A8',
  },
  handSection: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'rgba(0,56,168,0.3)',
  },
  handHeader: {
    marginBottom: 12,
  },
  handLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0038A8',
    textAlign: 'center',
    marginBottom: 4,
  },
  handHint: {
    fontSize: 13,
    color: '#FF6B35',
    textAlign: 'center',
    fontWeight: '600',
  },
  handHintWait: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  handCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
    minHeight: 130,
    alignItems: 'center',
  },
  noCardsText: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
  },
  card: {
    width: 85,
    height: 120,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  cardSelected: {
    borderWidth: 4,
    borderColor: '#FF6B35',
    elevation: 10,
    transform: [{ translateY: -15 }, { scale: 1.05 }],
  },
  cardBorder: {
    flex: 1,
    padding: 6,
    justifyContent: 'space-between',
  },
  cardTopCorner: {
    alignItems: 'flex-start',
  },
  cardCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardBottomCorner: {
    alignItems: 'flex-end',
    transform: [{ rotate: '180deg' }],
  },
  cardValueSmall: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSuitSmall: {
    fontSize: 16,
  },
  cardValueLarge: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  cardSuitLarge: {
    fontSize: 40,
  },
  actionsContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  playButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
  },
  playButtonContent: {
    height: 50,
  },
  instructionBox: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#0038A8',
  },
  instructionText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  callButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  callButton: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
  },
  envidoButton: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76,175,80,0.1)',
  },
  trucoButton: {
    borderColor: '#FF6B35',
    backgroundColor: 'rgba(255,107,53,0.1)',
  },
  callButtonLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  endGameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  endGameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    elevation: 10,
  },
  endGameTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0038A8',
    marginBottom: 20,
  },
  endGameScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 30,
  },
  playAgainButton: {
    backgroundColor: '#FF6B35',
    marginBottom: 12,
    width: '100%',
  },
  menuButton: {
    borderColor: '#0038A8',
    width: '100%',
  },
  menuButtonLabel: {
    color: '#0038A8',
  },
});

export default GameScreen;

