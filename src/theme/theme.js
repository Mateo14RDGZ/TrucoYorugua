import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// Colores inspirados en Uruguay 🇺🇾
export const colors = {
  // Colores principales
  primary: '#0038A8', // Azul Uruguay
  secondary: '#FCD116', // Amarillo Sol de Mayo
  accent: '#9B9B9B', // Gris
  
  // Colores del juego
  background: '#F5F5F5',
  surface: '#FFFFFF',
  cardBackground: '#E8F4F8',
  
  // Estados
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Texto
  text: '#212121',
  textSecondary: '#757575',
  textLight: '#FFFFFF',
  
  // Fichas
  chipGold: '#FFD700',
  chipSilver: '#C0C0C0',
  chipBronze: '#CD7F32',
  
  // Cartas
  cardRed: '#D32F2F',
  cardBlack: '#212121',
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    error: colors.error,
  },
  roundness: 12,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
  },
};

export default theme;
