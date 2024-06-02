import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem('favoriteCharacters', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to AsyncStorage:', error);
  }
};

export const loadFavorites = async () => {
  try {
    const storedFavorites = await AsyncStorage.getItem('favoriteCharacters');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites from AsyncStorage:', error);
    return [];
  }
};
