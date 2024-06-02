import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import TitleComponent from '../components/TitleComponent';
import SearchBar from '../components/SearchBar';
import { fetchCharacters, API_BASE_URL } from '../api/api';
import { useDispatch } from 'react-redux';
import { loadFavoritesFromStorage } from '../features/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CharactersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(`${API_BASE_URL}/character`);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favoriteCharacters');
      if (storedFavorites) {
        dispatch(loadFavoritesFromStorage(JSON.parse(storedFavorites)));
      }
    };
    loadFavorites();
  }, [dispatch]);

  const loadCharacters = async (url) => {
    if (!url || loading) return;
    setLoading(true);
    try {
      const data = await fetchCharacters(url);
      if (Array.isArray(url)) {
        setCharacters(data.results);
        setNextPage(null); // Stop fetching if it's a one-time URL list
      } else {
        setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
        setNextPage(data.info.next);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(nextPage);
  }, [nextPage]);

  useEffect(() => {
    setCharacters([]);
    // Reset nextPage to initial URL when searchQuery changes
    setNextPage(`${API_BASE_URL}/character`);
    if (searchQuery) {
      loadCharacters(`${API_BASE_URL}/character/?name=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery]);

  const handleEndReached = () => {
    if (!loading && nextPage) {
      loadCharacters(nextPage);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const renderItem = ({ item }) => (
    <CharacterCard character={item} />
  );

  return (
    <View style={styles.container}>
      <TitleComponent title="Characters" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default CharactersScreen;
