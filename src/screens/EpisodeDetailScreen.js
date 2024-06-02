import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { fetchEpisodeDetails, fetchCharactersByUrlList } from '../api/api';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';

const EpisodeDetailScreen = ({ route }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    const loadEpisodeDetails = async () => {
      try {
        const episodeData = await fetchEpisodeDetails(episodeId);
        setEpisode(episodeData);

        if (episodeData.characters && episodeData.characters.length > 0) {
          const characterData = await fetchCharactersByUrlList(episodeData.characters);
          setCharacters(characterData);
          setFilteredCharacters(characterData); // Initialize filtered characters with all characters
        }
      } catch (error) {
        console.error('Error fetching episode details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodeDetails();
  }, [episodeId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      {episode ? (
        <>
          <Text style={styles.title}>{episode.name}</Text>
          <Text style={styles.text}>Air Date: {episode.air_date}</Text>
          <Text style={styles.text}>Episode: {episode.episode}</Text>
          <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
          <Text style={styles.subtitle}>Characters:</Text>
          <FlatList
            data={filteredCharacters}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => <CharacterCard character={item} />}
            contentContainerStyle={styles.flatListContent}
          />
        </>
      ) : (
        <Text style={styles.error}>Error loading episode details.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: 'black',
  },
  flatListContent: {
    flexGrow: 1, // Take up the entire space
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default EpisodeDetailScreen;
