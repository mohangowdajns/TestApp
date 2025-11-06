import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProps } from '../../types/NavigationProps';
import { custom_styles } from '../../css/CustomCss';
import { Text } from 'react-native-paper';
import CustomButton from '../../components/CustonButton';

export default function ConfirmOtp({ navigation }: NavigationProps) {
  const handleBackClick = () => {
    navigation.replace('Login');
  };

  const handleSuccessfulOtp = () => {
    navigation.replace('MainDrawer');
  };
  return (
    <SafeAreaView style={custom_styles.centered_container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleBackClick}>
          <Image
            source={require('../../assets/images/arrow-right.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>

        <View style={styles.textWrapper}>
          <Text style={styles.headerText}>Please verify it's you</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <Text style={styles.label}>Enter the OTP sent to:</Text>
      <Text style={styles.phone}>+91 80125 60876</Text>

      <OtpInput
        numberOfDigits={4}
        onTextChange={text => console.log(text)}
        theme={{ pinCodeTextStyle: styles.otpDigit }}
      />

      <Text style={styles.info}>
        You will be receiving an OTP on SMS shortly
      </Text>
      <Text style={styles.resend}>Resend OTP</Text>

      {/* Login Button */}
      <CustomButton title="Login" handlePress={handleSuccessfulOtp} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  arrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  spacer: {
    width: 24, // balances the arrow width
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  otpDigit: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    color: '#666',
    marginTop: 16,
  },
  resend: {
    fontSize: 14,
    color: '#007BFF',
    marginVertical: 8,
  },
});
