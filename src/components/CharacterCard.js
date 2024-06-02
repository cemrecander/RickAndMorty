// components/CharacterCard.js

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../features/favoritesSlice';
import Modal from './NotificationModal'; // Import Modal component

const { width } = Dimensions.get('window');

const CharacterCard = React.memo(({ character }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector(state => state.favorites.favoriteCharacters);
  const isFavorite = favoriteCharacters.some((fav) => fav.id === character.id);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      // Show confirmation modal for removal
      setModalMessage(`Remove ${character.name} from favorites?`);
      setShowModal(true);
    } else {
      // Add to favorites directly
      dispatch(addToFavorites(character));
    }
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(character));
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('CharacterDetail', { characterId: character.id })}
    >
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.status}>
          {character.status} - {character.species}
        </Text>
      </View>
      <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteIcon}>
        <Icon name={isFavorite ? 'favorite' : 'favorite-border'} size={25} color={isFavorite ? '#E91E63' : '#757575'} />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        title="Confirmation"
        message={`Are you sure you want to remove ${character.name} from favorites?`}
        onConfirm={handleRemoveFromFavorites}
        onCancel={handleModalClose}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderColor: '#00BCD4', // Updated border color to match theme
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    width: width * 0.9,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Black text for better readability
  },
  status: {
    fontSize: 14,
    color: '#757575', // Gray text for status
  },
  favoriteIcon: {
    position: 'absolute',
    right: 20,
  },
});

export default CharacterCard;
