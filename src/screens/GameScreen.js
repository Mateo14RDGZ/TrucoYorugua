import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Configuración del Truco Uruguayo
const SUITS = ['espadas', 'bastos', 'oros', 'copas'];
const SUIT_SYMBOLS = { espadas: '♠', bastos: '♣', oros: '♦', copas: '♥' };
const SUIT_COLORS = { 
  espadas: '#000000', 
  bastos: '#000000', 
  oros: '#D4AF37', 
  copas: '#DC143C' 
};
const VALUES = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]; // Sin 8 ni 9
const BASE_CARD_ORDER = [1, 2, 3, 12, 11, 10, 7, 6, 5, 4];

const GameScreen = ({ navigation }) => {
  // Estados del juego
  const [muestra, setMuestra] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentBaza, setCurrentBaza] = useState([]);
  const [bazasWon, setBazasWon] = useState({ team1: 0, team2: 0 });
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [roundNumber, setRoundNumber] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Estados de cantos
  const [trucoLevel, setTrucoLevel] = useState(0);
  const [trucoPoints, setTrucoPoints] = useState(1);
  const [envidoCalled, setEnvidoCalled] = useState(false);
  const [florCalled, setFlorCalled] = useState(false);
  const [canCallEnvido, setCanCallEnvido] = useState(true);
  
  // Estados UI
  const [message, setMessage] = useState('');
  const [gamePhase, setGamePhase] = useState('playing');
  const [firstBazaWinner, setFirstBazaWinner] = useState(null);

  useEffect(() => {
    startNewGame();
  }, []);

  // ========== FUNCIONES DE MAZO ==========
  
  const createDeck = () => {
    const deck = [];
    SUITS.forEach(suit => {
      VALUES.forEach(value => {
        deck.push({ suit, value });
      });
    });
    return deck;
  };

  const shuffleDeck = (deck) => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // ========== FUNCIONES DE JUEGO ==========

  const startNewGame = () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    
    // Repartir 3 cartas a cada jugador (12 cartas)
    const newPlayers = [
      { id: 0, name: 'Tú', hand: shuffled.slice(0, 3), team: 1, isHuman: true },
      { id: 1, name: 'Rival 1', hand: shuffled.slice(3, 6), team: 2, isHuman: false },
      { id: 2, name: 'Tu Compañero', hand: shuffled.slice(6, 9), team: 1, isHuman: false },
      { id: 3, name: 'Rival 2', hand: shuffled.slice(9, 12), team: 2, isHuman: false },
    ];

    // Carta 13 = MUESTRA
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
    setEnvidoCalled(false);
    setFlorCalled(false);
    setCanCallEnvido(true);
    setFirstBazaWinner(null);
    setSelectedCard(null);
    
    const humanHasFlor = hasFlor(newPlayers[0].hand);
    setMessage(humanHasFlor ? 
      `🎴 Muestra: ${cardToString(muestraCard)} | ¡Tienes FLOR! 🌸` : 
      `🎴 Muestra: ${cardToString(muestraCard)} | Las piezas son los ${muestraCard.value}s`
    );
  };

  // ========== FUNCIONES DE ENVIDO Y FLOR ==========

  const hasFlor = (hand) => {
    const suitCount = {};
    hand.forEach(card => {
      suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
    });
    return Object.values(suitCount).some(count => count === 3);
  };

  const calculateEnvido = (hand) => {
    const bySuit = {};
    hand.forEach(card => {
      if (!bySuit[card.suit]) bySuit[card.suit] = [];
      const value = [10, 11, 12].includes(card.value) ? 0 : card.value;
      bySuit[card.suit].push(value);
    });

    let maxEnvido = 0;
    Object.values(bySuit).forEach(cards => {
      if (cards.length >= 2) {
        cards.sort((a, b) => b - a);
        maxEnvido = Math.max(maxEnvido, cards[0] + cards[1] + 20);
      } else if (cards.length === 1) {
        maxEnvido = Math.max(maxEnvido, cards[0]);
      }
    });

    return maxEnvido;
  };

  const calculateFlor = (hand) => {
    const bySuit = {};
    hand.forEach(card => {
      if (!bySuit[card.suit]) bySuit[card.suit] = [];
      const value = [10, 11, 12].includes(card.value) ? 0 : card.value;
      bySuit[card.suit].push(value);
    });

    for (const cards of Object.values(bySuit)) {
      if (cards.length === 3) {
        return cards.reduce((sum, val) => sum + val, 0) + 20;
      }
    }
    return 0;
  };

  const handleEnvido = () => {
    if (!canCallEnvido) {
      Alert.alert('⚠️ Envido', 'El envido se canta antes de jugar la primera carta');
      return;
    }
    if (envidoCalled) {
      Alert.alert('⚠️ Envido', 'Ya se cantó envido');
      return;
    }

    const allEnvidos = players.map(p => ({
      id: p.id,
      name: p.name,
      team: p.team,
      points: calculateEnvido(p.hand)
    }));

    const maxEnvido = Math.max(...allEnvidos.map(e => e.points));
    const winner = allEnvidos.find(e => e.points === maxEnvido);
    const winningTeam = winner.team === 1 ? 'team1' : 'team2';

    setEnvidoCalled(true);
    setMessage(`🎲 ENVIDO: ${winner.name} gana con ${maxEnvido} puntos (+2 pts)`);
    
    const newScores = {
      ...scores,
      [winningTeam]: scores[winningTeam] + 2
    };
    setScores(newScores);

    if (newScores.team1 >= 30 || newScores.team2 >= 30) {
      setTimeout(() => {
        setGamePhase('gameEnd');
        setMessage(newScores.team1 >= 30 ? '🏆 ¡TU EQUIPO GANÓ!' : '💔 El rival ganó');
      }, 2000);
    }
  };

  const handleFlor = () => {
    if (!canCallEnvido) {
      Alert.alert('⚠️ Flor', 'La flor se canta antes de jugar la primera carta');
      return;
    }

    const humanPlayer = players.find(p => p.isHuman);
    if (!hasFlor(humanPlayer.hand)) {
      Alert.alert('⚠️ Flor', 'No tienes Flor (necesitas 3 cartas del mismo palo)');
      return;
    }

    if (florCalled) {
      Alert.alert('⚠️ Flor', 'Ya se cantó flor');
      return;
    }

    const allFlores = players
      .filter(p => hasFlor(p.hand))
      .map(p => ({
        id: p.id,
        name: p.name,
        team: p.team,
        points: calculateFlor(p.hand)
      }));

    if (allFlores.length === 0) {
      setMessage('Nadie tiene Flor');
      return;
    }

    const maxFlor = Math.max(...allFlores.map(f => f.points));
    const winner = allFlores.find(f => f.points === maxFlor);
    const winningTeam = winner.team === 1 ? 'team1' : 'team2';

    setFlorCalled(true);
    setMessage(`🌸 FLOR: ${winner.name} gana con ${maxFlor} puntos (+3 pts)`);
    
    const newScores = {
      ...scores,
      [winningTeam]: scores[winningTeam] + 3
    };
    setScores(newScores);

    if (newScores.team1 >= 30 || newScores.team2 >= 30) {
      setTimeout(() => {
        setGamePhase('gameEnd');
        setMessage(newScores.team1 >= 30 ? '🏆 ¡TU EQUIPO GANÓ!' : '💔 El rival ganó');
      }, 2000);
    }
  };

  const handleTruco = () => {
    if (trucoLevel >= 3) {
      Alert.alert('⚠️ Truco', 'Ya estás en Vale 4 (máximo)');
      return;
    }

    const newLevel = trucoLevel + 1;
    const pointsMap = [1, 2, 3, 4];
    
    setTrucoLevel(newLevel);
    setTrucoPoints(pointsMap[newLevel]);
    
    const names = ['Truco', 'Re Truco', 'Vale Cuatro'];
    setMessage(`⚡ ${names[newLevel - 1]}! (${pointsMap[newLevel]} puntos en juego)`);
  };

  // ========== LÓGICA DE CARTAS ==========

  const cardToString = (card) => {
    return `${card.value}${SUIT_SYMBOLS[card.suit]}`;
  };

  const getDynamicCardOrder = () => {
    if (!muestra) return BASE_CARD_ORDER;
    
    const muestraIndex = BASE_CARD_ORDER.indexOf(muestra.value);
    
    // El orden comienza después de la muestra
    const rotated = [
      ...BASE_CARD_ORDER.slice(muestraIndex + 1),
      ...BASE_CARD_ORDER.slice(0, muestraIndex)
    ];
    
    return rotated;
  };

  const compareCards = (card1, card2) => {
    if (!muestra) return 0;

    // PIEZAS (mismo valor que muestra) son las más altas
    const isPieza1 = card1.value === muestra.value;
    const isPieza2 = card2.value === muestra.value;

    if (isPieza1 && !isPieza2) return 1;
    if (!isPieza1 && isPieza2) return -1;
    
    // Entre piezas, por palo: espadas > bastos > oros > copas
    if (isPieza1 && isPieza2) {
      const suitOrder = { espadas: 4, bastos: 3, oros: 2, copas: 1 };
      return suitOrder[card1.suit] - suitOrder[card2.suit];
    }

    // Orden dinámico
    const order = getDynamicCardOrder();
    const index1 = order.indexOf(card1.value);
    const index2 = order.indexOf(card2.value);

    if (index1 !== index2) {
      return index2 - index1; // Menor índice = mayor carta
    }

    // Mismo valor, por palo
    const suitOrder = { espadas: 4, bastos: 3, oros: 2, copas: 1 };
    return suitOrder[card1.suit] - suitOrder[card2.suit];
  };

  // ========== JUEGO DE CARTAS ==========

  const handlePlayCard = () => {
    if (!selectedCard) {
      Alert.alert('⚠️', 'Selecciona una carta para jugar');
      return;
    }

    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.isHuman) return;

    playCardForPlayer(currentPlayer, selectedCard);
    setSelectedCard(null);
  };

  const playCardForPlayer = (player, card) => {
    // Primera carta: cerrar fase de envido
    if (currentBaza.length === 0 && canCallEnvido) {
      setCanCallEnvido(false);
    }

    const newBaza = [...currentBaza, { player: player.id, card }];
    setCurrentBaza(newBaza);

    const updatedPlayers = players.map(p => {
      if (p.id === player.id) {
        return { ...p, hand: p.hand.filter(c => c !== card) };
      }
      return p;
    });
    setPlayers(updatedPlayers);

    setMessage(`${player.name} jugó ${cardToString(card)}`);

    // Baza completa (4 cartas)
    if (newBaza.length === 4) {
      setTimeout(() => evaluateBaza(newBaza, updatedPlayers), 1500);
    } else {
      // Siguiente jugador
      const nextIndex = (currentPlayerIndex + 1) % 4;
      setCurrentPlayerIndex(nextIndex);
      
      // Bot juega
      if (!updatedPlayers[nextIndex].isHuman) {
        setTimeout(() => botPlayCard(updatedPlayers[nextIndex], updatedPlayers), 1000);
      }
    }
  };

  const botPlayCard = (botPlayer, currentPlayers) => {
    const hand = botPlayer.hand;
    if (hand.length === 0) return;

    let cardToPlay;
    
    // Estrategia simple: jugar carta media-baja
    const sortedHand = [...hand].sort((a, b) => compareCards(b, a));
    
    if (currentBaza.length === 0) {
      // Primero: carta media
      cardToPlay = sortedHand[Math.floor(sortedHand.length / 2)];
    } else {
      // Ver si puede ganar
      const highestInBaza = currentBaza.reduce((highest, play) => 
        compareCards(play.card, highest.card) > 0 ? play : highest
      );
      
      const winningCards = hand.filter(card => 
        compareCards(card, highestInBaza.card) > 0
      );
      
      if (winningCards.length > 0 && currentBaza.length <= 2) {
        // Puede ganar, jugar carta más baja ganadora
        cardToPlay = winningCards.reduce((lowest, card) => 
          compareCards(lowest, card) < 0 ? lowest : card
        );
      } else {
        // No puede ganar, jugar carta más baja
        cardToPlay = sortedHand[sortedHand.length - 1];
      }
    }

    playCardForPlayer(botPlayer, cardToPlay);
  };

  const evaluateBaza = (baza, currentPlayers) => {
    // Encontrar ganador
    let winningPlay = baza[0];
    let isParda = false;
    
    baza.forEach(play => {
      const comparison = compareCards(play.card, winningPlay.card);
      if (comparison > 0) {
        winningPlay = play;
        isParda = false;
      } else if (comparison === 0 && play !== winningPlay) {
        isParda = true;
      }
    });

    const winner = currentPlayers.find(p => p.id === winningPlay.player);
    const winningTeam = winner.team === 1 ? 'team1' : 'team2';

    // Guardar ganador de primera baza
    if (roundNumber === 0 && !isParda) {
      setFirstBazaWinner(winningPlay.player);
    }

    if (isParda) {
      setMessage(`Baza PARDA (empate)`);
    } else {
      setMessage(`✅ ${winner.name} gana la baza`);
    }

    // Actualizar bazas ganadas
    const newBazasWon = isParda ? bazasWon : {
      ...bazasWon,
      [winningTeam]: bazasWon[winningTeam] + 1
    };
    setBazasWon(newBazasWon);
    setCurrentBaza([]);

    // Verificar fin de ronda
    const totalBazas = newBazasWon.team1 + newBazasWon.team2;
    
    if (newBazasWon.team1 >= 2 || newBazasWon.team2 >= 2 || totalBazas >= 3) {
      setTimeout(() => endRound(newBazasWon), 2000);
    } else {
      // Siguiente baza
      setTimeout(() => {
        setCurrentPlayerIndex(winner.id);
        setRoundNumber(roundNumber + 1);
        
        if (!winner.isHuman) {
          setTimeout(() => botPlayCard(winner, currentPlayers), 1000);
        }
      }, 2000);
    }
  };

  const endRound = (finalBazas) => {
    let roundWinner;
    
    if (finalBazas.team1 > finalBazas.team2) {
      roundWinner = 'team1';
      setMessage('🎉 ¡Tu equipo ganó la mano!');
    } else if (finalBazas.team2 > finalBazas.team1) {
      roundWinner = 'team2';
      setMessage('❌ El rival ganó la mano');
    } else {
      // Empate: regla de primera baza
      if (firstBazaWinner !== null) {
        const firstWinnerTeam = players.find(p => p.id === firstBazaWinner)?.team;
        roundWinner = firstWinnerTeam === 1 ? 'team1' : 'team2';
        setMessage('⚖️ Empate - Gana quien ganó la primera baza');
      } else {
        roundWinner = 'team1';
        setMessage('⚖️ Todas pardas - Gana la mano');
      }
    }

    // Sumar puntos
    const newScores = {
      ...scores,
      [roundWinner]: scores[roundWinner] + trucoPoints
    };
    setScores(newScores);

    // Verificar fin de juego
    if (newScores.team1 >= 30 || newScores.team2 >= 30) {
      setTimeout(() => {
        setGamePhase('gameEnd');
        setMessage(newScores.team1 >= 30 ? 
          '🏆 ¡GANASTE! Tu equipo llegó a 30 puntos' : 
          '💔 Perdiste. El rival llegó a 30 puntos'
        );
      }, 3000);
    } else {
      setTimeout(() => startNewGame(), 3000);
    }
  };

  // ========== RENDERIZADO ==========

  const renderCard = (card, index, isHuman) => {
    const isPieza = card.value === muestra?.value;
    const isSelected = selectedCard === card;
    
    return (
      <Animatable.View
        key={index}
        animation="fadeIn"
        duration={500}
        delay={index * 100}
      >
        <TouchableOpacity
          onPress={() => isHuman && setSelectedCard(card)}
          disabled={!isHuman}
          style={[
            styles.card,
            isSelected && styles.cardSelected,
            isPieza && styles.cardPieza
          ]}
        >
          <Text style={[styles.cardValue, { color: SUIT_COLORS[card.suit] }]}>
            {card.value}
          </Text>
          <Text style={[styles.cardSuit, { color: SUIT_COLORS[card.suit] }]}>
            {SUIT_SYMBOLS[card.suit]}
          </Text>
          {isPieza && (
            <View style={styles.piezaBadge}>
              <Text style={styles.piezaText}>⭐</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  const renderPlayer = (player, position) => {
    const isActive = currentPlayerIndex === player.id;
    const cardCount = player.hand.length;
    
    return (
      <View style={[styles.playerContainer, styles[`player${position}`]]}>
        <View style={[styles.playerInfo, isActive && styles.playerActive]}>
          <Text style={styles.playerName}>
            {player.name} {player.team === 1 ? '💙' : '❤️'}
          </Text>
          <Text style={styles.playerCards}>{cardCount} cartas</Text>
        </View>
        
        {player.isHuman ? (
          <View style={styles.humanHand}>
            {player.hand.map((card, idx) => renderCard(card, idx, true))}
          </View>
        ) : (
          <View style={styles.botCards}>
            {[...Array(cardCount)].map((_, idx) => (
              <View key={idx} style={styles.cardBack}>
                <Text style={styles.cardBackText}>🃏</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderBaza = () => {
    if (currentBaza.length === 0) return null;

    return (
      <View style={styles.bazaContainer}>
        <Text style={styles.bazaTitle}>Baza Actual</Text>
        <View style={styles.bazaCards}>
          {currentBaza.map((play, idx) => {
            const player = players.find(p => p.id === play.player);
            return (
              <View key={idx} style={styles.bazaCard}>
                <Text style={styles.bazaPlayerName}>{player?.name}</Text>
                <View style={styles.card}>
                  <Text style={[styles.cardValue, { color: SUIT_COLORS[play.card.suit] }]}>
                    {play.card.value}
                  </Text>
                  <Text style={[styles.cardSuit, { color: SUIT_COLORS[play.card.suit] }]}>
                    {SUIT_SYMBOLS[play.card.suit]}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  // ========== RENDER PRINCIPAL ==========

  if (gamePhase === 'gameEnd') {
    return (
      <LinearGradient colors={['#0038A8', '#74ACDF']} style={styles.container}>
        <View style={styles.endGameContainer}>
          <Animatable.View animation="bounceIn" style={styles.endGameCard}>
            <Text style={styles.endGameTitle}>{message}</Text>
            <View style={styles.finalScores}>
              <View style={styles.finalScoreBox}>
                <Text style={styles.finalScoreLabel}>Tu Equipo 💙</Text>
                <Text style={styles.finalScoreValue}>{scores.team1}</Text>
              </View>
              <Text style={styles.finalScoreVs}>VS</Text>
              <View style={styles.finalScoreBox}>
                <Text style={styles.finalScoreLabel}>Rivales ❤️</Text>
                <Text style={styles.finalScoreValue}>{scores.team2}</Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={() => {
                setScores({ team1: 0, team2: 0 });
                startNewGame();
              }}
              style={styles.playAgainButton}
              labelStyle={styles.playAgainButtonText}
            >
              Jugar de Nuevo
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.goBack()}
              labelStyle={styles.backButtonText}
            >
              Volver al Inicio
            </Button>
          </Animatable.View>
        </View>
      </LinearGradient>
    );
  }

  const currentPlayer = players[currentPlayerIndex];
  const humanPlayer = players.find(p => p.isHuman);

  return (
    <LinearGradient colors={['#0E4C2F', '#1B5E38']} style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor="#FFFFFF"
          size={24}
          onPress={() => navigation.goBack()}
        />
        
        {/* Scoreboard */}
        <View style={styles.scoreboard}>
          <View style={styles.scoreTeam}>
            <Text style={styles.scoreLabel}>Tu Equipo 💙</Text>
            <Text style={styles.scoreValue}>{scores.team1}</Text>
          </View>
          <Text style={styles.scoreVs}>VS</Text>
          <View style={styles.scoreTeam}>
            <Text style={styles.scoreLabel}>Rivales ❤️</Text>
            <Text style={styles.scoreValue}>{scores.team2}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.gameArea} contentContainerStyle={styles.gameContent}>
        {/* Muestra */}
        {muestra && (
          <View style={styles.muestraContainer}>
            <Text style={styles.muestraLabel}>MUESTRA</Text>
            <View style={[styles.card, styles.muestraCard]}>
              <Text style={[styles.cardValue, { color: SUIT_COLORS[muestra.suit] }]}>
                {muestra.value}
              </Text>
              <Text style={[styles.cardSuit, { color: SUIT_COLORS[muestra.suit] }]}>
                {SUIT_SYMBOLS[muestra.suit]}
              </Text>
            </View>
          </View>
        )}

        {/* Mensaje */}
        <Animatable.View animation="fadeIn" style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </Animatable.View>

        {/* Bazas ganadas */}
        <View style={styles.bazasInfo}>
          <Text style={styles.bazasText}>
            Bazas: 💙 {bazasWon.team1} - {bazasWon.team2} ❤️
          </Text>
        </View>

        {/* Baza actual */}
        {renderBaza()}

        {/* Mesa de juego */}
        <View style={styles.gameTable}>
          {/* Rival 1 (arriba izquierda) */}
          {players[1] && renderPlayer(players[1], 'TopLeft')}
          
          {/* Rival 2 (arriba derecha) */}
          {players[3] && renderPlayer(players[3], 'TopRight')}
          
          {/* Compañero (centro) */}
          {players[2] && renderPlayer(players[2], 'Center')}
        </View>

        {/* Mano del jugador humano */}
        {humanPlayer && (
          <View style={styles.humanPlayerArea}>
            <Text style={styles.humanPlayerLabel}>TU MANO</Text>
            <View style={styles.humanHand}>
              {humanPlayer.hand.map((card, idx) => renderCard(card, idx, true))}
            </View>
          </View>
        )}

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          {canCallEnvido && !envidoCalled && currentPlayer?.isHuman && (
            <Button
              mode="contained"
              onPress={handleEnvido}
              style={styles.envidoButton}
              labelStyle={styles.buttonLabel}
              icon="cards-diamond"
            >
              Envido
            </Button>
          )}
          
          {canCallEnvido && !florCalled && humanPlayer && hasFlor(humanPlayer.hand) && currentPlayer?.isHuman && (
            <Button
              mode="contained"
              onPress={handleFlor}
              style={styles.florButton}
              labelStyle={styles.buttonLabel}
              icon="flower"
            >
              Flor
            </Button>
          )}
          
          {currentPlayer?.isHuman && (
            <Button
              mode="contained"
              onPress={handleTruco}
              style={styles.trucoButton}
              labelStyle={styles.buttonLabel}
              disabled={trucoLevel >= 3}
              icon="fire"
            >
              {trucoLevel === 0 ? 'Truco' : trucoLevel === 1 ? 'Re Truco' : trucoLevel === 2 ? 'Vale 4' : 'Máximo'}
            </Button>
          )}
          
          {currentPlayer?.isHuman && selectedCard && (
            <Button
              mode="contained"
              onPress={handlePlayCard}
              style={styles.playButton}
              labelStyle={styles.buttonLabel}
              icon="play"
            >
              Jugar Carta
            </Button>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 8,
  },
  scoreTeam: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 120,
  },
  scoreLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreVs: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
  },
  gameContent: {
    padding: 16,
  },
  muestraContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  muestraLabel: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  muestraCard: {
    transform: [{ rotate: '15deg' }],
  },
  messageContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  bazasInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  bazasText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bazaContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  bazaTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  bazaCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  bazaCard: {
    alignItems: 'center',
  },
  bazaPlayerName: {
    color: '#FFFFFF',
    fontSize: 11,
    marginBottom: 4,
  },
  gameTable: {
    minHeight: 200,
    marginBottom: 16,
  },
  playerContainer: {
    marginBottom: 12,
  },
  playerInfo: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  playerActive: {
    backgroundColor: 'rgba(255,215,0,0.3)',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playerCards: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  botCards: {
    flexDirection: 'row',
    gap: 8,
  },
  cardBack: {
    width: 60,
    height: 90,
    backgroundColor: '#8B4513',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#654321',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackText: {
    fontSize: 32,
  },
  humanPlayerArea: {
    marginBottom: 16,
  },
  humanPlayerLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  humanHand: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    width: 80,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardSelected: {
    borderColor: '#FFD700',
    borderWidth: 4,
    transform: [{ translateY: -10 }],
  },
  cardPieza: {
    backgroundColor: '#FFF9E6',
  },
  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  cardSuit: {
    fontSize: 28,
    marginTop: 4,
  },
  piezaBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  piezaText: {
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  },
  envidoButton: {
    backgroundColor: '#4CAF50',
  },
  florButton: {
    backgroundColor: '#9C27B0',
  },
  trucoButton: {
    backgroundColor: '#FF6B35',
  },
  playButton: {
    backgroundColor: '#2196F3',
  },
  buttonLabel: {
    fontSize: 14,
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
  },
  endGameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0038A8',
    marginBottom: 30,
    textAlign: 'center',
  },
  finalScores: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 30,
  },
  finalScoreBox: {
    alignItems: 'center',
  },
  finalScoreLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  finalScoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0038A8',
  },
  finalScoreVs: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  playAgainButton: {
    backgroundColor: '#0038A8',
    paddingHorizontal: 30,
    marginBottom: 12,
  },
  playAgainButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#0038A8',
    fontSize: 14,
  },
  playerTopLeft: {},
  playerTopRight: {},
  playerCenter: {},
});

export default GameScreen;

