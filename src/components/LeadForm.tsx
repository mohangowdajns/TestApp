import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AudioRecorderPlayer from "react-native-nitro-sound";
import RNFS from "react-native-fs";

export default function LeadFormScreen() {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  // ---- Permissions ----
  const requestPermission = async (permission: any) => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(permission);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // ---- Audio ----
  const startRecording = async () => {
    const ok = await requestPermission(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    if (!ok) return Alert.alert("Permission denied", "Cannot record without microphone access");

    try {
      const uri = await AudioRecorderPlayer.startRecorder();
      setRecording(true);
      setAudioPath(uri);
    } catch (err) {
      console.error("Recording error:", err);
    }
  };

  const stopRecording = async () => {
    try {
      const tempPath = await AudioRecorderPlayer.stopRecorder();
      setRecording(false);

      // Move to Downloads folder
      const fileName = `lead_audio_${Date.now()}.mp3`;
      const downloadDir =
        Platform.OS === "android"
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath;
      const destPath = `${downloadDir}/${fileName}`;
      await RNFS.moveFile(tempPath, destPath);
      setAudioPath(destPath);

      Alert.alert("Recording saved", `Saved in Downloads\n${destPath}`);
    } catch (err) {
      console.error("Stop recording error:", err);
    }
  };

  const playAudio = async () => {
    if (!audioPath) return;
    try {
      await AudioRecorderPlayer.startPlayer(audioPath);
      setPlaying(true);
    } catch (err) {
      console.error("Play error:", err);
    }
  };

  const stopAudio = async () => {
    try {
      await AudioRecorderPlayer.stopPlayer();
      setPlaying(false);
    } catch (err) {
      console.error("Stop audio error:", err);
    }
  };

  // ---- Camera ----
  const takePhoto = async () => {
    const ok = await requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (!ok) return Alert.alert("Permission denied", "Camera access denied");

    launchCamera(
      { mediaType: "photo", quality: 0.7, includeBase64: true },
      async (res: any) => {
        if (res.assets && res.assets.length > 0) {
          const image = res.assets[0];
          setPhotoUri(image.uri || null);
          if (image.base64) {
            setPhotoBase64(image.base64);
          } else if (image.uri) {
            const base64 = await RNFS.readFile(image.uri, "base64");
            setPhotoBase64(base64);
          }
        }
      }
    );
  };

  // ---- Gallery ----
  const pickPhoto = async () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.7, includeBase64: true },
      async (res: any) => {
        if (res.assets && res.assets.length > 0) {
          const image = res.assets[0];
          setPhotoUri(image.uri || null);
          if (image.base64) {
            setPhotoBase64(image.base64);
          } else if (image.uri) {
            const base64 = await RNFS.readFile(image.uri, "base64");
            setPhotoBase64(base64);
          }
        }
      }
    );
  };

  // ---- Save Lead ----
  const saveLead = async () => {
    const payload = {
      leadId: Math.floor(Math.random() * 10000),
      audioPath: audioPath || "No Audio",
      photoUri: photoUri || "No Photo",
      photoBase64: photoBase64
        ? photoBase64.substring(0, 80) + "..."
        : "No Base64 Image",
    };

    Alert.alert("Lead Saved (POC)", JSON.stringify(payload, null, 2));
  };

  // ---- UI ----
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}> Lead Form</Text>
        <Text style={styles.subheader}>Attach Audio Notes & Photos</Text>

        {/* Audio Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Audio Recording</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={recording ? stopRecording : startRecording}
              style={[
                styles.actionBtn,
                { backgroundColor: recording ? "#ff5252" : "#3A5FE8" },
              ]}
            >
              <Icon name={recording ? "stop" : "mic"} size={28} color="#fff" />
              <Text style={styles.btnText}>
                {recording ? "Stop" : "Record"}
              </Text>
            </TouchableOpacity>

            {audioPath && (
              <TouchableOpacity
                onPress={playing ? stopAudio : playAudio}
                style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}
              >
                <Icon
                  name={playing ? "pause" : "play-arrow"}
                  size={28}
                  color="#fff"
                />
                <Text style={styles.btnText}>
                  {playing ? "Pause" : "Play"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {audioPath && (
            <Text style={styles.path}>🎵 Saved at: {audioPath}</Text>
          )}
        </View>

        {/* Photo Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Photo Attachment</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#3A5FE8" }]}
              onPress={takePhoto}
            >
              <Icon name="photo-camera" size={28} color="#fff" />
              <Text style={styles.btnText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#009688" }]}
              onPress={pickPhoto}
            >
              <Icon name="image" size={28} color="#fff" />
              <Text style={styles.btnText}>Gallery</Text>
            </TouchableOpacity>
          </View>

          {photoUri && (
            <Image
              source={{ uri: photoUri }}
              style={styles.preview}
            />
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={saveLead}>
          <Icon name="save" size={24} color="#fff" />
          <Text style={styles.saveText}>Save Lead</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC" },
  scroll: { padding: 20 },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 5, color: "#333" },
  subheader: { fontSize: 14, color: "gray", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#333" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
    width: 120,
  },
  btnText: { color: "#fff", marginLeft: 6, fontWeight: "600" },
  path: { marginTop: 10, fontSize: 12, color: "#666" },
  preview: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginTop: 10,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A5FE8",
    padding: 14,
    borderRadius: 10,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "700", marginLeft: 8 },
});
