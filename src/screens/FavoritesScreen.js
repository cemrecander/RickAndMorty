import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CharacterCard from '../components/CharacterCard';
import TitleComponent from '../components/TitleComponent';
import { removeFromFavorites, loadFavoritesFromStorage } from '../features/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const favoriteCharacters = useSelector(state => state.favorites.favoriteCharacters);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favoriteCharacters');
        if (favorites) {
          dispatch(loadFavoritesFromStorage(JSON.parse(favorites)));
        }
      } catch (error) {
        console.error('Error loading favorites from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <CharacterCard character={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <TitleComponent title="Favorites" />
      <FlatList
        data={favoriteCharacters}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={styles.listContainer}
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
  listContainer: {
    flexGrow: 1,
    marginTop: 20,
  },
});

export default FavoritesScreen;
