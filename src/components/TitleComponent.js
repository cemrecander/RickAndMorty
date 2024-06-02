// TitleComponent.js
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const TitleComponent = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10, // Add some horizontal padding
    margin: 10, // Add some margin
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Uncomment this line
  },
  title: {
    fontSize: 36, // Increase the font size
    fontWeight: 'bold',
    color: '#333', // Uncomment this line
  },
});

export default TitleComponent;
