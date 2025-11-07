import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Button } from 'react-native';



export default function HomeScreen({ navigation }: any) {

   useEffect(() => {
    const handleDeepLink = (event: any) => {
      const { url } = event;
      console.log('UPI Response URL:', url);

      const query = url.split('?')[1];
      if (!query) {
        Alert.alert('Payment Cancelled or No Response');
        return;
      }

      const params = Object.fromEntries(new URLSearchParams(query));
      console.log('Parsed UPI response:', params);

      const status = params.Status?.toLowerCase?.();
      const responseCode = params.responseCode?.toUpperCase?.();

      if (status === 'success') {
        Alert.alert(
          'Payment Successful',
          `Transaction ID: ${params.txnId || params.txnRef || '-'}`
        );
      } else if (responseCode === 'U09' || status === 'failure') {
        Alert.alert('Payment Cancelled', 'You cancelled the payment.');
      } else if (status === 'pending' || status === 'submitted') {
        Alert.alert('Payment Pending', 'The transaction is still processing.');
      } else {
        Alert.alert(
          'Payment Failed or Unknown',
          'We could not verify the transaction.'
        );
      }
    };

    // Add listener
    const sub = Linking.addEventListener('url', handleDeepLink);

    // Handle if app opens via deep link initially
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => sub.remove();
  }, []);

  // ---------------------------------
  //  UPI Payment Function
  // ---------------------------------
  const payWithUPI = async () => {
    const upiUrl =
      'upi://pay?pa=merchant@upi' +
      '&pn=MerchantName' +
      '&am=1.00' +
      '&cu=INR' +
      '&tn=TestPayment' +
      '&tr=TXN' +
      Date.now() +
      '&url=myapp://upiresponse';

    let paymentReturned = false;

    const listener = (event: any) => {
      paymentReturned = true;
      const { url } = event;
      const query = url.split('?')[1];
      const params = Object.fromEntries(new URLSearchParams(query || ''));
      const status = params.Status?.toLowerCase?.();
      const responseCode = params.responseCode?.toUpperCase?.();

      if (status === 'success') {
        Alert.alert(
          'Payment Successful',
          `Transaction ID: ${params.txnId || params.txnRef || '-'}`
        );
      } else if (responseCode === 'U09' || status === 'failure') {
        Alert.alert('Payment Cancelled', 'You cancelled the payment.');
      } else if (status === 'pending' || status === 'submitted') {
        Alert.alert('Payment Pending', 'The transaction is still processing.');
      } else {
        Alert.alert(
          'Payment Failed or Unknown',
          'We could not verify the transaction.'
        );
      }
    };

    const sub = Linking.addEventListener('url', listener);

    try {
      const supported = await Linking.canOpenURL(upiUrl);
      if (supported) {
        await Linking.openURL(upiUrl);

        // Fallback timeout (user never returns)
        setTimeout(() => {
          if (!paymentReturned) {
            Alert.alert(
              'No Response',
              'You left the payment screen before completing the transaction.'
            );
          }
          sub.remove();
        }, 20000); // 20s timeout
      } else {
        Alert.alert(
          'No UPI App',
          'Please install a UPI app like GPay, PhonePe, or Paytm.'
        );
        sub.remove();
      }
    } catch (err) {
      console.error('UPI Error:', err);
      Alert.alert('Error', 'Unable to start UPI payment.');
      sub.remove();
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pages</Text>
      <Button title="Pay ₹1" onPress={payWithUPI} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#3A5FE8' }]} // blue
        onPress={() => navigation.navigate('SolarPage')}
      >
        <Text style={styles.buttonText}>Site-Survey Form</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28A745' }]} // green
        onPress={() => navigation.navigate('SolarPage1')}
      >
        <Text style={styles.buttonText}>Go Solar Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF9800' }]} // orange
        onPress={() => navigation.navigate('SolarPage2')}
      >
        <Text style={styles.buttonText}>Document Proposal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff0084ff' }]} // orange
        onPress={() => navigation.navigate('SolarPage3')}
      >
        <Text style={styles.buttonText}>Marketing Portal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 25,
    color: '#222',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3, // for Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
