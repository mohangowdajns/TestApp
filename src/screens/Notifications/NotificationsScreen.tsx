import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import Clipboard from '@react-native-clipboard/clipboard';

// 1. Background/Quit State Handler (MUST be outside component)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(' Message handled in background/quit:', remoteMessage);

  // If your payload has only "data" (no "notification"), show it manually:
  if (remoteMessage.data) {
    await notifee.displayNotification({
      title: String(remoteMessage.notification?.title ?? 'New Notification'),
      body: String(remoteMessage.notification?.body ?? 'You received a message'),
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
      },
    });
  }
});

// Ask for permission + get token
async function requestUserPermission(setToken: (token: string) => void) {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // Android 13+ requires explicit POST_NOTIFICATIONS
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }

  if (enabled) {
    console.log(' Authorization status:', authStatus);
    const token = await messaging().getToken();
    console.log(' Device FCM Token:', token);
    setToken(token); // ✅ Store token to display on screen
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
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    // Request permissions and token
    requestUserPermission(setFcmToken);
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

  const copyToClipboard = () => {
    if (fcmToken) {
      Clipboard.setString(fcmToken);
      Alert.alert('Copied', 'FCM token copied to clipboard!');
    }
  };

  const openFirebaseConsole = () => {
    Linking.openURL('https://console.firebase.google.com/u/0/project/testapp-87ba1/notification/compose');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Firebase Notifications</Text>
      <Text style={styles.text}>Your FCM Token:</Text>

      {fcmToken ? (
        <>
          <View style={styles.tokenBox}>
            <Text selectable style={styles.tokenText}>
              {fcmToken}
            </Text>
          </View>

          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Text style={styles.buttonText}>Copy Token</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.testButton} onPress={openFirebaseConsole}>
            <Text style={styles.buttonText}>Test in Firebase Console</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loading}>Fetching FCM token...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  text: { fontSize: 16, color: '#555', marginBottom: 10 },
  tokenBox: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  tokenText: { fontSize: 12, color: '#333' },
  copyButton: {
    backgroundColor: '#3A5FE8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  testButton: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: { color: '#fff', fontSize: 14, textAlign: 'center' },
  loading: { color: '#777', fontSize: 14, marginTop: 10 },
});
