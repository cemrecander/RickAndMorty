import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { fetchCharacterDetails } from '../api/api'; // Adjust the import path according to your project structure

const CharacterDetailScreen = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacterDetails = async () => {
      try {
        const characterData = await fetchCharacterDetails(characterId);
        setCharacter(characterData);
      } catch (error) {
        console.error('Error fetching character details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacterDetails();
  }, [characterId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.text}>Status: {character.status}</Text>
        <Text style={styles.text}>Species: {character.species}</Text>
        <Text style={styles.text}>Gender: {character.gender}</Text>
        <Text style={styles.text}>Origin: {character.origin.name}</Text>
        <Text style={styles.text}>Location: {character.location.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#00BCD4',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
    width: '100%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default CharacterDetailScreen;
