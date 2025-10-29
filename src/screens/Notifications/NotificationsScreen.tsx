import React, { useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

// 1. Background/Quit State Handler (MUST be outside component)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(' Message handled in background/quit:', remoteMessage);

  // If your payload has only "data" (no "notification"), show it manually:
  if (remoteMessage.data) {
await notifee.displayNotification({
  title: String(remoteMessage.notification?.title ?? "New Notification"),
  body: String(remoteMessage.notification?.body ?? "You received a message"),
  android: {
    channelId: "default",
    importance: AndroidImportance.HIGH,
  },
});

  }
});

// Ask for permission + get token
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // Android 13+ requires explicit POST_NOTIFICATIONS
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  if (enabled) {
    console.log(' Authorization status:', authStatus);
    const token = await messaging().getToken();
    console.log(' Device FCM Token:', token);
    // TODO: Send this token to your backend server
  }
}

// Create default Android channel for Notifee
async function createDefaultChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}

export default function NotificationsScreen() {
  useEffect(() => {
    // Request permissions and token
    requestUserPermission();
    createDefaultChannel();

    // 2. Foreground message listener
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log(' Foreground message:', remoteMessage);

      // FCM does not show tray notification in foreground → use Notifee
      if (remoteMessage.notification) {
        await notifee.displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
          },
        });
      }
    });

    // 3. Notification tapped from background
    const unsubscribeOnOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(' Notification opened app from background:', remoteMessage);
      // TODO: handle navigation if needed (remoteMessage.data)
    });

    // 4. Notification tapped from quit (cold start)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(' Notification opened app from quit:', remoteMessage);
          // TODO: handle navigation if needed (remoteMessage.data)
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnOpened();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Notifications</Text>
      <Text style={styles.text}>Check Metro logs for your FCM Token</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  text: { fontSize: 16, color: '#555' },
});
