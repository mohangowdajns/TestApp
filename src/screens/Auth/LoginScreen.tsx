import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import LanguageModal from '../../modals/LanguageModal';
import CustomButton from '../../components/CustonButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLogin = () => {
    navigation.replace('ConfirmOtp');
  };

  const setMobilePhone = (phone: string) => {
    const numericText = phone.replace(/[^0-9]/g, '');
    setUsername(numericText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image_container}>
        <Image source={require('../../assets/images/screen_logo.png')} />
      </View>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('Opening modal');
            setModalVisible(true);
          }}
          style={styles.innerDropDownContainer}
        >
          <Text>{selectedLanguage}</Text>

          <Image source={require('../../assets/images/chevron-down.png')} />
        </TouchableOpacity>
      </View>

      <TextInput
        label="Mobile"
        placeholder="Enter Your Mobile No."
        inputMode="numeric"
        value={username}
        mode="outlined"
        onChangeText={setMobilePhone}
        keyboardType="phone-pad"
      />

      <CustomButton title="Request OTP" handlePress={handleLogin} />

      {/* <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          By clicking verify, I agree with the Terms & Conditions and Privacy
          Policy​
        </Text>
      </View> */}

      <LanguageModal
        visible={modalVisible}
        selected={selectedLanguage}
        onSelect={lang => {
          setSelectedLanguage(lang);
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 24 },
  dropdownContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },
  innerDropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e0f0ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 180,
  },

  image_container: {
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
  },

  disclaimer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
