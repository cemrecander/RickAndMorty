// Pagination.js
import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';

const Pagination = ({ fetchFunction, renderItem, keyExtractor, initialUrl }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(initialUrl);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    if (!nextPage || loading) return;
    setLoading(true);
    try {
      let data;
      if (Array.isArray(nextPage)) {
        data = await fetchFunction(nextPage);
        setItems(data.results);
        setNextPage(null); // Stop fetching if it's a one-time URL list
      } else {
        data = await fetchFunction(nextPage);
        setItems((prevItems) => [...prevItems, ...data.results]);
        setNextPage(data.info.next);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    setLoading(false);
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadItems}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
    />
  );
};

export default Pagination;
