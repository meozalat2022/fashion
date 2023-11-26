import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import RooteNavigator from './navigation/RooteNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';
import {StatusBar} from 'react-native';
import Colors from './Constants/Colors';
import AppRouter from './navigation/AppRouter';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

let persistor = persistStore(store);
export default function App() {
  useEffect(() => {
    async function onDisplayNotification() {
      // // Request permissions (required for iOS)
      // await notifee.requestPermission();
      // // Create a channel (required for Android)
      // const channelId = await notifee.createChannel({
      //   id: 'default',
      //   name: 'Default Channel',
      // });
      // // Display a notification
      // await notifee.displayNotification({
      //   title: 'Notification Title',
      //   body: 'Main body content of the notification',
      //   android: {
      //     channelId,
      //     // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      //     // pressAction is needed if you want the notification to open the app when pressed
      //     pressAction: {
      //       id: 'default',
      //     },
      //   },
      // });
      // const authStatus = await messaging().requestPermission();
      // const enabled =
      //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      // if (enabled) {
      //   console.log('Authorization status:', authStatus);
      // }

      // notifee.onBackgroundEvent(async ({type, detail}) => {
      //   const {notification, pressAction} = detail;

      //   // Check if the user pressed the "Mark as read" action
      //   if (
      //     type === EventType.ACTION_PRESS &&
      //     pressAction.id === 'mark-as-read'
      //   ) {
      //     // Update external API
      //     await fetch(
      //       `https://my-api.com/chat/${notification.data.chatId}/read`,
      //       {
      //         method: 'POST',
      //       },
      //     );

      //     // Remove the notification
      //     await notifee.cancelNotification(notification.id);
      //   }
      // });

      // Register the device with FCM
      await messaging().registerDeviceForRemoteMessages();

      // Get the token
      const token = await messaging().getToken();

      // Save the token
      await postToApi('/users/1234/tokens', {token});
    }
    onDisplayNotification();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor={Colors.primary} />
        <AppRouter />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
