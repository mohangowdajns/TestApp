import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function SolarPage1() {
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: 'https://gosolar.arka360.com/2653131762412740/2' }}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});