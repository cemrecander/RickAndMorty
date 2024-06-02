import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppNavigator from './navigation/AppNavigator';
import PushNotification, { Importance } from 'react-native-push-notification';

const App = () => {
  useEffect(() => {
    // Delete existing channel first to avoid conflicts
    PushNotification.deleteChannel('favorites-channel', (deleted) => {
      if (deleted) {
        console.log('Deleted existing channel');
      } else {
        console.log('No existing channel to delete');
      }

      // Create a new channel
      PushNotification.createChannel(
        {
          channelId: 'favorites-channel',
          channelName: 'Favorites Channel',
          channelDescription: 'A channel for favorite character notifications',
          importance: Importance.HIGH,
        },
        (created) => console.log(`createChannel returned '${created}'`)
      );
    });
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
