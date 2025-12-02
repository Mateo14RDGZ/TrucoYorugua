import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';

const PlayedCard = ({ card }) => {
  return (
    <View style={styles.container}>
      <Card card={card} size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
});

export default PlayedCard;
