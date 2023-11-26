/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

// // Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

// //Register kill state
// messaging().getInitialNotification(async remoteMessage => {
//   console.log('Message handled in the Kill state!', remoteMessage);
// });

function onMessageReceived(message) {
  notifee.displayNotification(JSON.parse(message.data.notifee));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
