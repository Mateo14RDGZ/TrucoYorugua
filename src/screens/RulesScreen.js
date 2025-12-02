import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function RulesScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#0038A8', '#74ACDF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Button
          icon="arrow-left"
          mode="text"
          onPress={() => navigation.goBack()}
          labelStyle={styles.backButton}
        >
          Volver
        </Button>
        <Text style={styles.title}>📖 Reglas del Truco Uruguayo</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        {/* MUESTRA */}
        <RuleCard
          title="🎴 LA MUESTRA"
          icon="star"
          description="La característica principal del Truco Uruguayo"
        >
          <RulePoint text="Se reparten 3 cartas a cada jugador (12 cartas)" />
          <RulePoint text="La carta #13 se da vuelta: es la MUESTRA" />
          <RulePoint text="Las 4 cartas del mismo número son las PIEZAS (cartas más altas)" />
          <RulePoint text="Ejemplo: Si la muestra es 5♥, las piezas son: 5♠ > 5♣ > 5♦ > 5♥" />
          <RulePoint text="El orden del resto cambia comenzando desde el siguiente número" />
        </RuleCard>

        {/* ORDEN DE CARTAS */}
        <RuleCard
          title="🎯 ORDEN DE LAS CARTAS"
          icon="trophy"
          description="El orden depende de la muestra"
        >
          <RulePoint text="Orden base: 1 > 2 > 3 > 12 > 11 > 10 > 7 > 6 > 5 > 4" />
          <RulePoint text="Si muestra = 5: Piezas (5s) > 6 > 7 > 10 > 11 > 12 > 1 > 2 > 3 > 4" />
          <RulePoint text="Si muestra = 1: Piezas (1s) > 2 > 3 > 12 > 11 > 10 > 7 > 6 > 5 > 4" />
          <RulePoint text="Orden de palos: Espadas ♠ > Bastos ♣ > Oros ♦ > Copas ♥" />
        </RuleCard>

        {/* EL TRUCO */}
        <RuleCard
          title="⚡ EL TRUCO"
          icon="flash"
          description="Apostando por ganar las bazas"
        >
          <RulePoint text="TRUCO: Apuesta 2 puntos" />
          <RulePoint text="RE TRUCO: Sube a 3 puntos" />
          <RulePoint text="VALE CUATRO: Sube a 4 puntos" />
          <RulePoint text="Se gana con 2 de 3 bazas" />
          <RulePoint text="Si una baza empata (parda), se continúa" />
          <RulePoint text="Si empatan la primera y segunda baza, gana quien ganó la primera" />
          <RulePoint text="Si todas son parda, gana quien es mano (quien reparte)" />
        </RuleCard>

        {/* EL ENVIDO */}
        <RuleCard
          title="🎲 EL ENVIDO"
          icon="dice"
          description="Sumando cartas del mismo palo"
        >
          <RulePoint text="Se canta ANTES de jugar la primera carta" />
          <RulePoint text="Se suman las 2 cartas mayores del mismo palo + 20" />
          <RulePoint text="Figuras (10, 11, 12) valen 0 para el envido" />
          <RulePoint text="Si solo tienes 1 carta de un palo, ese es tu envido" />
          <RulePoint text="ENVIDO: Vale 2 puntos" />
          <RulePoint text="Ejemplo: 7♠ + 6♠ = 7 + 6 + 20 = 33 puntos" />
          <RulePoint text="Gana quien tenga el envido más alto" />
        </RuleCard>

        {/* LA FLOR */}
        <RuleCard
          title="🌸 LA FLOR"
          icon="flower"
          description="Tres cartas del mismo palo"
        >
          <RulePoint text="Se canta cuando tienes 3 cartas del mismo palo" />
          <RulePoint text="Se canta ANTES de jugar la primera carta" />
          <RulePoint text="Vale 3 puntos para el ganador" />
          <RulePoint text="Se suman las 3 cartas + 20" />
          <RulePoint text="Figuras (10, 11, 12) valen 0" />
          <RulePoint text="Si varios tienen flor, gana la más alta" />
          <RulePoint text="Ejemplo: 7♠ + 6♠ + 4♠ = 7 + 6 + 4 + 20 = 37 puntos" />
        </RuleCard>

        {/* PUNTOS Y VICTORIA */}
        <RuleCard
          title="🏆 PUNTOS Y VICTORIA"
          icon="medal"
          description="Cómo se gana el juego"
        >
          <RulePoint text="El juego se juega a 30 puntos" />
          <RulePoint text="Gana el equipo que llega primero a 30" />
          <RulePoint text="Se juega en equipos de 2 vs 2" />
          <RulePoint text="Los compañeros se sientan enfrentados" />
        </RuleCard>

        {/* ESTRATEGIA */}
        <RuleCard
          title="🧠 CONSEJOS ESTRATÉGICOS"
          icon="bulb"
          description="Tips para jugar mejor"
        >
          <RulePoint text="Observa qué carta es la muestra al inicio" />
          <RulePoint text="Las piezas son oro, úsalas sabiamente" />
          <RulePoint text="El envido se canta antes de jugar cartas" />
          <RulePoint text="Comunícate con tu compañero con señas" />
          <RulePoint text="No siempre es bueno cantar truco enseguida" />
        </RuleCard>

        <View style={styles.finalNote}>
          <Text style={styles.finalNoteText}>
            💡 Recuerda: El Truco Uruguayo es único por su sistema de muestra.
            ¡En cada mano las cartas más fuertes cambian!
          </Text>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

function RuleCard({ title, icon, description, children }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Ionicons name={icon} size={24} color="#0038A8" />
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
        <View style={styles.rulesList}>
          {children}
        </View>
      </Card.Content>
    </Card>
  );
}

function RulePoint({ text }) {
  return (
    <View style={styles.rulePoint}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.ruleText}>{text}</Text>
    </View>
  );
}

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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0038A8',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  rulesList: {
    gap: 8,
  },
  rulePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    fontSize: 20,
    color: '#FF6B35',
    marginTop: -2,
  },
  ruleText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  finalNote: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 12,
    marginTop: 8,
  },
  finalNoteText: {
    fontSize: 15,
    color: '#0038A8',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
  },
});
