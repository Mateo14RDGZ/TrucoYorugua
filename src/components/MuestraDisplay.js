import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { colors } from '../theme/theme';
import Card from './Card';

/**
 * Componente para mostrar la MUESTRA del truco uruguayo
 * La muestra determina cuáles son las "piezas" (cartas más altas)
 */
const MuestraDisplay = ({ muestra }) => {
  if (!muestra) return null;

  const getPiezaName = (value) => {
    const names = {
      1: 'Ases',
      2: 'Doses',
      3: 'Treses',
      4: 'Cuatros',
      5: 'Cincos',
      6: 'Seises',
      7: 'Sietes',
      10: 'Sotas',
      11: 'Caballos',
      12: 'Reyes',
    };
    return names[value] || value.toString();
  };

  return (
    <Animatable.View
      animation="flipInY"
      duration={800}
      style={styles.container}
    >
      <Surface style={styles.surface} elevation={4}>
        <Text style={styles.title}>Muestra</Text>
        
        <View style={styles.cardContainer}>
          <Card card={muestra} size="medium" />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Piezas:</Text>
          <Text style={styles.infoText}>Los {getPiezaName(muestra.value)}</Text>
          <Text style={styles.infoSubtext}>son las cartas más altas</Text>
        </View>

        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>Orden de piezas:</Text>
          <View style={styles.suitOrder}>
            <Text style={styles.suitText}>♠️ {'>'} ♣️ {'>'} ♦️ {'>'} ♥️</Text>
          </View>
        </View>
      </Surface>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  surface: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardContainer: {
    marginBottom: 12,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.textSecondary + '20',
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  infoSubtext: {
    fontSize: 11,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  orderContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  suitOrder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suitText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
});

export default MuestraDisplay;
