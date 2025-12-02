import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#0038A8', '#74ACDF', '#FFFFFF']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo y Título */}
        <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
          <Text style={styles.title}>🎴</Text>
          <Text style={styles.appName}>TRUCO YORUGUA</Text>
          <Text style={styles.subtitle}>El auténtico juego uruguayo</Text>
        </Animatable.View>

        {/* Instrucciones rápidas */}
        <Animatable.View animation="fadeIn" delay={300} duration={1000} style={styles.quickGuide}>
          <Text style={styles.guideTitle}>¿Cómo funciona?</Text>
          <Text style={styles.guideText}>• 3 cartas por jugador</Text>
          <Text style={styles.guideText}>• Carta #13 = <Text style={styles.bold}>MUESTRA</Text></Text>
          <Text style={styles.guideText}>• Las 4 cartas iguales = <Text style={styles.bold}>PIEZAS</Text> (más altas)</Text>
          <Text style={styles.guideText}>• Llega a <Text style={styles.bold}>30 puntos</Text> para ganar</Text>
        </Animatable.View>

        {/* Botones principales */}
        <Animatable.View animation="fadeInUp" delay={600} duration={1000} style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Game')}
            style={styles.primaryButton}
            labelStyle={styles.primaryButtonText}
            contentStyle={styles.buttonContent}
            icon="cards-playing-outline"
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
            📖 VER REGLAS COMPLETAS
          </Button>
        </Animatable.View>

        {/* Características */}
        <Animatable.View animation="fadeIn" delay={900} duration={1000} style={styles.features}>
          <FeatureItem icon="🎯" text="Muestra Real del Truco Uruguayo" />
          <FeatureItem icon="👥" text="Juega contra 3 Bots" />
          <FeatureItem icon="🔥" text="Envido, Truco y Vale 4" />
        </Animatable.View>

        {/* Footer */}
        <Animatable.View animation="fadeIn" delay={1200} duration={1000} style={styles.footer}>
          <Text style={styles.footerText}>🇺🇾 Hecho en Uruguay</Text>
          <Text style={styles.version}>v1.4.0</Text>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
}

function FeatureItem({ icon, text }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  title: {
    fontSize: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
    opacity: 0.9,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    elevation: 4,
  },
  secondaryButton: {
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonContent: {
    height: 56,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quickGuide: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0038A8',
    marginBottom: 12,
    textAlign: 'center',
  },
  guideText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  features: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  version: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.6,
  },
});
