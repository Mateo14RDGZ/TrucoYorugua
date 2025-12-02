import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  RadioButton,
  Appbar,
  HelperText,
  Card,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { createRoom } from '../services/roomService';
import { colors } from '../theme/theme';

const CreateRoomScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [roomName, setRoomName] = useState('');
  const [maxPoints, setMaxPoints] = useState('30');
  const [bet, setBet] = useState('50');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pointsOptions = [
    { label: '10 puntos', value: '10' },
    { label: '20 puntos', value: '20' },
    { label: '30 puntos', value: '30' },
    { label: '40 puntos', value: '40' },
    { label: '50 puntos', value: '50' },
  ];

  const betOptions = [
    { label: '10 fichas', value: '10' },
    { label: '50 fichas', value: '50' },
    { label: '100 fichas', value: '100' },
    { label: '250 fichas', value: '250' },
    { label: '500 fichas', value: '500' },
  ];

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError('Por favor ingresa un nombre para la sala');
      return;
    }

    if (parseInt(bet) > user.chips) {
      setError('No tienes suficientes fichas para esta apuesta');
      return;
    }

    setLoading(true);
    setError('');

    const roomData = {
      name: roomName,
      maxPoints: parseInt(maxPoints),
      bet: parseInt(bet),
      createdBy: user.uid,
      createdAt: new Date().toISOString(),
    };

    const result = await createRoom(roomData);

    if (result.success) {
      navigation.navigate('Game', { roomId: result.roomId });
    } else {
      setError('Error al crear la sala');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color={colors.textLight} onPress={() => navigation.goBack()} />
          <Appbar.Content title="Crear Sala" titleStyle={styles.appbarTitle} />
        </Appbar.Header>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Configuración de la Sala</Text>

              <TextInput
                label="Nombre de la sala"
                value={roomName}
                onChangeText={setRoomName}
                mode="outlined"
                style={styles.input}
                placeholder="Ej: Sala de Juan"
                maxLength={30}
                theme={{ colors: { primary: colors.primary } }}
              />

              <Text style={styles.label}>Puntos para ganar:</Text>
              <RadioButton.Group
                onValueChange={setMaxPoints}
                value={maxPoints}
              >
                {pointsOptions.map((option) => (
                  <View key={option.value} style={styles.radioItem}>
                    <RadioButton.Android
                      value={option.value}
                      color={colors.primary}
                    />
                    <Text style={styles.radioLabel}>{option.label}</Text>
                  </View>
                ))}
              </RadioButton.Group>

              <Text style={styles.label}>Apuesta:</Text>
              <RadioButton.Group onValueChange={setBet} value={bet}>
                {betOptions.map((option) => (
                  <View key={option.value} style={styles.radioItem}>
                    <RadioButton.Android
                      value={option.value}
                      color={colors.primary}
                    />
                    <Text style={styles.radioLabel}>{option.label}</Text>
                  </View>
                ))}
              </RadioButton.Group>

              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  Tus fichas actuales: {user?.chips || 0}
                </Text>
              </View>

              {error ? (
                <HelperText type="error" visible={!!error}>
                  {error}
                </HelperText>
              ) : null}

              <Button
                mode="contained"
                onPress={handleCreateRoom}
                loading={loading}
                disabled={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Crear Sala
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  input: {
    marginBottom: 24,
    backgroundColor: colors.surface,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: colors.text,
  },
  infoContainer: {
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  button: {
    marginTop: 16,
    backgroundColor: colors.primary,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default CreateRoomScreen;
