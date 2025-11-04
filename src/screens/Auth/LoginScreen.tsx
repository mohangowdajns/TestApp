import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  StatusBar
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTranslation } from "react-i18next";
import RNPickerSelect from "react-native-picker-select";
import { useAuthStore } from "../../store/authStore";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("arka");
  const [password, setPassword] = useState("1234");
  const [language, setLanguage] = useState(i18n.language || "en");
  const { login, isLoggedIn } = useAuthStore()
 console.log('isLoggedIn on startup:', isLoggedIn)

  useEffect(() => {
  if (isLoggedIn) {
    navigation.replace('MainDrawer')
  }
}, [isLoggedIn])

const handleLogin = async () => {
  const success = login(username, password);
  if (success) navigation.replace('MainDrawer');
  else Alert.alert('Invalid username or password!');
};

  const changeLang = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.dropdownWrapper}>
        <RNPickerSelect
          value={language}
          onValueChange={(value: string) => changeLang(value)}
          items={[
            { label: "English", value: "en" },
            { label: "हिंदी", value: "hi" },
          ]}
        />
      </View>

      <Text style={styles.title}>{t("login")}</Text>

      <TextInput
        style={styles.input}
        placeholder={t("username") || "Username"}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder={t("password") || "Password"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#3A5FE8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  dropdownWrapper: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
