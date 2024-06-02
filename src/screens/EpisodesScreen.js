import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground } from 'react-native';
import Pagination from '../components/Pagination';
import TitleComponent from "../components/TitleComponent";
import EpisodeCard from '../components/EpisodeCard';
import SearchBar from '../components/SearchBar';
import { fetchEpisodes, API_BASE_URL } from '../api/api';

const EpisodesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFilteredEpisodes = async (url) => {
    try {
      const episodesData = await fetchEpisodes(url, searchQuery);
      return episodesData;
    } catch (error) {
      console.error('Error fetching episodes:', error);
      return { results: [], info: {} };
    }
  };

  return (
    <View style={styles.container}>
      <TitleComponent title="Episodes" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Pagination 
        key={searchQuery} 
        fetchFunction={fetchFilteredEpisodes}
        renderItem={({ item }) => <EpisodeCard episode={item} navigation={navigation} />}
        keyExtractor={(item, index) => String(index)}
        initialUrl={`${API_BASE_URL}/episode`}
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
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EpisodesScreen;
