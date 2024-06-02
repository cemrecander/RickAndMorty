// favoritesSlice.js

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

const initialState = {
  favoriteCharacters: [],
};

const MAX_FAVORITES = 10;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (state.favoriteCharacters.length >= MAX_FAVORITES) {
        showMaxFavoritesNotification();
        return;
      }

      // Check if the character is already in favorites
      const existingCharacter = state.favoriteCharacters.find(char => char.id === action.payload.id);
      if (!existingCharacter) {
        state.favoriteCharacters.push(action.payload);
        saveFavoritesToStorage(state.favoriteCharacters);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        (character) => character.id !== action.payload.id
      );
      saveFavoritesToStorage(state.favoriteCharacters);
    },
    loadFavoritesFromStorage: (state, action) => {
      state.favoriteCharacters = action.payload;
    },
  },
});

const saveFavoritesToStorage = async (favorites) => {
  try {
    await AsyncStorage.setItem('favoriteCharacters', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to AsyncStorage:', error);
  }
};

const showMaxFavoritesNotification = () => {
  PushNotification.localNotification({
    title: 'Maximum Favorites Reached',
    message: 'You cannot add more than 10 characters to favorites.',
  });
};

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  requestPermissions: Platform.OS === 'ios',
  popInitialNotification: true,
});

export const { addToFavorites, removeFromFavorites, loadFavoritesFromStorage } = favoritesSlice.actions;

export default favoritesSlice.reducer;
