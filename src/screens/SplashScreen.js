import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/theme';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <Animatable.View
        animation="fadeInDown"
        duration={1500}
        style={styles.logoContainer}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        delay={500}
        style={styles.textContainer}
      >
        <Text style={styles.title}>Truco Yorugua</Text>
        <Text style={styles.subtitle}>El auténtico truco uruguayo</Text>
      </Animatable.View>

      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={2000}
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>Cargando...</Text>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 250,
    height: 250,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textLight,
    opacity: 0.9,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textLight,
    opacity: 0.8,
  },
});

export default SplashScreen;
