import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#0038A8', '#74ACDF', '#FFFFFF']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo y Título */}
        <Animatable.View animation="bounceIn" duration={1500} style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.cardEmoji}>🃏</Text>
            <Text style={styles.cardEmoji2}>♠️</Text>
            <Text style={styles.cardEmoji3}>♥️</Text>
          </View>
          <Text style={styles.appName}>TRUCO YORUGUA</Text>
          <Text style={styles.subtitle}>El auténtico juego uruguayo</Text>
        </Animatable.View>

        {/* Tarjeta explicativa */}
        <Animatable.View animation="fadeInUp" delay={400} duration={1000} style={styles.mainCard}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🎴 La Muestra y las Piezas</Text>
              <Text style={styles.cardText}>
                La <Text style={styles.highlight}>MUESTRA</Text> es la carta #13. Las 4 cartas del mismo valor son las{' '}
                <Text style={styles.highlight}>PIEZAS</Text> (las más altas).
              </Text>
              <Text style={styles.cardText}>
                Ejemplo: Si la muestra es 5♥, las piezas son: 5♠ {'>'} 5♣ {'>'} 5♦ {'>'} 5♥
              </Text>
            </Card.Content>
          </Card>
        </Animatable.View>

        {/* Botones principales */}
        <Animatable.View animation="pulse" delay={800} duration={1500} style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Game')}
            style={styles.primaryButton}
            labelStyle={styles.primaryButtonText}
            contentStyle={styles.buttonContent}
            icon="play"
          >
            🎮 JUGAR AHORA
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Rules')}
            style={styles.secondaryButton}
            labelStyle={styles.secondaryButtonText}
            contentStyle={styles.buttonContent}
            icon="book-open-variant"
          >
            📖 REGLAS COMPLETAS
          </Button>
        </Animatable.View>

        {/* Características en grid */}
        <Animatable.View animation="fadeInUp" delay={1000} duration={1000} style={styles.features}>
          <View style={styles.featureRow}>
            <View style={styles.featureBox}>
              <Text style={styles.featureEmoji}>⚡</Text>
              <Text style={styles.featureTitle}>Truco Completo</Text>
              <Text style={styles.featureDesc}>Truco, Re Truco y Vale 4</Text>
            </View>
            <View style={styles.featureBox}>
              <Text style={styles.featureEmoji}>🎲</Text>
              <Text style={styles.featureTitle}>Envido y Flor</Text>
              <Text style={styles.featureDesc}>Todas las reglas oficiales</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureBox}>
              <Text style={styles.featureEmoji}>🎯</Text>
              <Text style={styles.featureTitle}>Muestra Real</Text>
              <Text style={styles.featureDesc}>Sistema auténtico uruguayo</Text>
            </View>
            <View style={styles.featureBox}>
              <Text style={styles.featureEmoji}>👥</Text>
              <Text style={styles.featureTitle}>4 Jugadores</Text>
              <Text style={styles.featureDesc}>Tú y 3 bots inteligentes</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Footer */}
        <Animatable.View animation="fadeIn" delay={1200} duration={1000} style={styles.footer}>
          <Text style={styles.footerText}>🇺🇾 Hecho con ❤️ en Uruguay</Text>
          <Text style={styles.version}>Versión 1.4.0</Text>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardEmoji: {
    fontSize: 60,
    marginHorizontal: 5,
  },
  cardEmoji2: {
    fontSize: 50,
    marginTop: -10,
  },
  cardEmoji3: {
    fontSize: 50,
    marginTop: 10,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
    opacity: 0.95,
    fontWeight: '600',
  },
  mainCard: {
    width: '100%',
    marginBottom: 25,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    elevation: 8,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0038A8',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#FF6B35',
    fontSize: 16,
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 25,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    elevation: 8,
  },
  secondaryButton: {
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonContent: {
    height: 60,
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  features: {
    width: '100%',
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  featureBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
  },
  featureEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0038A8',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  version: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
  },
});
