import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EpisodeCard = ({ episode, navigation }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('EpisodeDetail', { episodeId: episode.id })}
  >
    <Text style={styles.title}>{episode.name}</Text>
    <Text style={styles.text}>{episode.air_date}</Text>
    <Text style={styles.text}>{episode.episode}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#00BCD4',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  text: {
    fontSize: 14,
    color: '#757575',
  },
});

export default EpisodeCard;
