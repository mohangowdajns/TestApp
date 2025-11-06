// import React from 'react';
// import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


export default function SolarPage() {
    return (
        <WebView
            source={{ uri: "https://app.arka360.com/siteSurveyForm?authToken=b53c8279391e2232ec9119abd6a35f60b343aae4" }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}

            // Enable Zoom + Scroll gestures
            scalesPageToFit={true}
            allowsInlineMediaPlayback={true}
            allowFileAccess={true}

            // For Android Zoom Controls
            androidHardwareAccelerationDisabled={false}
            androidLayerType="hardware"

        // This ensures pinch zoom and movement works
        // injectedJavaScript={`
        //     const meta = document.createElement('meta');
        //     meta.setAttribute('name', 'viewport');
        //     meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        //     document.getElementsByTagName('head')[0].appendChild(meta);
        // `}
        />
    );
}