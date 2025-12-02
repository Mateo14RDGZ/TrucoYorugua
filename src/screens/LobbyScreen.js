import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  FAB,
  Card,
  Avatar,
  Chip,
  IconButton,
  Appbar,
  Menu,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../context/AuthContext';
import { getRooms, joinRoom } from '../services/roomService';
import { colors } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

const LobbyScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setLoading(true);
    const roomsData = await getRooms();
    setRooms(roomsData);
    setLoading(false);
  };

  const handleJoinRoom = async (roomId) => {
    const result = await joinRoom(roomId, user.uid);
    if (result.success) {
      navigation.navigate('Game', { roomId });
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const renderRoomItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={600}
      delay={index * 100}
    >
      <Card style={styles.roomCard} mode="elevated">
        <Card.Content>
          <View style={styles.roomHeader}>
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{item.name}</Text>
              <View style={styles.roomDetails}>
                <Chip
                  icon="account-multiple"
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  {item.players.length}/4
                </Chip>
                <Chip
                  icon="trophy"
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  {item.maxPoints} pts
                </Chip>
                <Chip
                  icon="poker-chip"
                  style={[styles.chip, styles.chipBet]}
                  textStyle={styles.chipTextBet}
                >
                  {item.bet} fichas
                </Chip>
              </View>
            </View>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => handleJoinRoom(item.id)}
              disabled={item.players.length >= 4}
            >
              <Ionicons
                name={item.players.length >= 4 ? 'lock-closed' : 'enter'}
                size={24}
                color={item.players.length >= 4 ? colors.textSecondary : colors.primary}
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Salas de Truco" titleStyle={styles.appbarTitle} />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Appbar.Action
                icon="menu"
                color={colors.textLight}
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item
              leadingIcon="account"
              onPress={() => {}}
              title={user?.username || 'Usuario'}
            />
            <Menu.Item
              leadingIcon="poker-chip"
              onPress={() => {}}
              title={`${user?.chips || 0} fichas`}
            />
            <Divider />
            <Menu.Item
              leadingIcon="logout"
              onPress={handleLogout}
              title="Cerrar sesión"
            />
          </Menu>
        </Appbar.Header>

        <View style={styles.userInfo}>
          <Avatar.Icon
            size={64}
            icon="account"
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{user?.username}</Text>
            <View style={styles.chipsContainer}>
              <Ionicons name="trophy" size={20} color={colors.chipGold} />
              <Text style={styles.chipsText}>{user?.chips || 0} fichas</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Salas Disponibles</Text>
        {rooms.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No hay salas disponibles</Text>
            <Text style={styles.emptySubtext}>Crea una nueva sala para empezar</Text>
          </View>
        ) : (
          <FlatList
            data={rooms}
            renderItem={renderRoomItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={loadRooms} />
            }
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateRoom')}
        label="Crear Sala"
        color={colors.textLight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingBottom: 24,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  appbarTitle: {
    color: colors.textLight,
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  avatar: {
    backgroundColor: colors.textLight,
  },
  userDetails: {
    marginLeft: 16,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  chipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipsText: {
    fontSize: 16,
    color: colors.textLight,
    marginLeft: 6,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
  roomCard: {
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  roomDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: colors.cardBackground,
  },
  chipText: {
    fontSize: 12,
    color: colors.text,
  },
  chipBet: {
    backgroundColor: colors.chipGold,
  },
  chipTextBet: {
    fontSize: 12,
    color: colors.text,
    fontWeight: 'bold',
  },
  joinButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default LobbyScreen;
