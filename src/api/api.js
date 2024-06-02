// api.js
import axios from 'axios';

export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = async (pageUrl, searchQuery) => {
  try {
    const response = await axios.get(`${pageUrl}?name=${encodeURIComponent(searchQuery)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};

export const fetchEpisodeDetails = async (episodeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/episode/${episodeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episode details:', error);
    throw error;
  }
};

export const fetchCharacters = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCharacterDetails = async (characterId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/character/${characterId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching character details:', error);
  }
};
// Fetch characters by URL list
export const fetchCharactersByUrlList = async (urls) => {
  try {
    const characterPromises = urls.map(url => axios.get(url));
    const responses = await Promise.all(characterPromises);
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
// Fetch characters by IDs
export const fetchCharactersByIds = async (characterIds) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character/${characterIds}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
// Fetch character by URL
export const fetchCharacterByUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};