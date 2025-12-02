import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/theme';

const ResultsScreen = ({ route, navigation }) => {
  const { winner, team1Score, team2Score, chipsWon, chipsLost } = route.params;

  const isWinner = winner === 'team1'; // Asumiendo que el jugador está en team1

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <Animatable.View
        animation="bounceIn"
        duration={1000}
        style={styles.content}
      >
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            {isWinner ? (
              <Animatable.View
                animation="tada"
                iterationCount="infinite"
                duration={2000}
              >
                <Ionicons
                  name="trophy"
                  size={100}
                  color={colors.chipGold}
                />
              </Animatable.View>
            ) : (
              <Ionicons
                name="sad-outline"
                size={100}
                color={colors.textSecondary}
              />
            )}

            <Text style={[styles.resultText, isWinner && styles.winnerText]}>
              {isWinner ? '¡Victoria!' : 'Derrota'}
            </Text>

            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Resultado Final</Text>
              <Text style={styles.scoreText}>
                {team1Score} - {team2Score}
              </Text>
            </View>

            <View style={styles.chipsContainer}>
              {isWinner ? (
                <>
                  <Ionicons
                    name="trending-up"
                    size={32}
                    color={colors.success}
                  />
                  <Text style={styles.chipsWonText}>
                    +{chipsWon} fichas
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="trending-down"
                    size={32}
                    color={colors.error}
                  />
                  <Text style={styles.chipsLostText}>
                    -{chipsLost} fichas
                  </Text>
                </>
              )}
            </View>

            <View style={styles.buttonsContainer}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Lobby')}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Volver al Lobby
              </Button>

              <Button
                mode="outlined"
                onPress={() => navigation.navigate('CreateRoom')}
                style={[styles.button, styles.buttonOutlined]}
                contentStyle={styles.buttonContent}
                textColor={colors.primary}
              >
                Crear Nueva Sala
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  cardContent: {
    alignItems: 'center',
    padding: 32,
  },
  resultText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 16,
  },
  winnerText: {
    color: colors.success,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.primary,
  },
  chipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 32,
  },
  chipsWonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.success,
    marginLeft: 12,
  },
  chipsLostText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.error,
    marginLeft: 12,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 12,
  },
  buttonOutlined: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default ResultsScreen;
