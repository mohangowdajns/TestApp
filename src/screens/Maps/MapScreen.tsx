// import Geolocation from "@react-native-community/geolocation";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Platform,
//   PermissionsAndroid,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import {
//   GooglePlacesAutocomplete,
//   GooglePlacesAutocompleteRef,
// } from "react-native-google-places-autocomplete";
// import MapView, { Marker, Region } from "react-native-maps";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { GOOGLE_PLACES_API_KEY } from "../../constants/Config";

// interface LocationData {
//   latitude: number;
//   longitude: number;
// }

// const MapScreen = () => {
//   const [region, setRegion] = useState<Region | null>(null);
//   const [marker, setMarker] = useState<LocationData | null>(null);

//   //  Correct ref typing
//   const searchRef = useRef<GooglePlacesAutocompleteRef>(null);

//   const requestLocationPermission = async (): Promise<boolean> => {
//     if (Platform.OS === "ios") return true;
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch {
//       return false;
//     }
//   };

//   const getCurrentLocation = async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) return;

//     Geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         const reg: Region = {
//           latitude,
//           longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         };
//         setRegion(reg);
//         setMarker({ latitude, longitude });
//       },
//       (err) => console.warn("Location error:", err),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
//     );
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {region && (
//         <MapView
//           style={{ flex: 1 }}
//           region={region}
//           onRegionChangeComplete={setRegion}
//         >
//           {marker && <Marker coordinate={marker} title="Selected Place" />}
//         </MapView>
//       )}

  
//       <View style={styles.searchContainer}>
//         <GooglePlacesAutocomplete
//           ref={searchRef} 
//           placeholder="Search for a place"
//           fetchDetails={true}
//           predefinedPlaces={[]}
//           query={{
//             key: GOOGLE_PLACES_API_KEY,
//             language: "en",
//           }}
//           onPress={(data, details = null) => {
//             if (!details?.geometry?.location) return;
//             const { lat, lng } = details.geometry.location;
//             const newRegion: Region = {
//               latitude: lat,
//               longitude: lng,
//               latitudeDelta: 0.01,
//               longitudeDelta: 0.01,
//             };
//             setRegion(newRegion);
//             setMarker({ latitude: lat, longitude: lng });
//           }}
//           textInputProps={{
//             onFocus: () => console.log("Focused!"),
//             onBlur: () => console.log("Blurred!"),
//           }}
//           styles={{
//             textInputContainer: {
//               flexDirection: "row",
//               alignItems: "center",
//               borderWidth: 1,
//               borderColor: "#ccc",
//               borderRadius: 8,
//               backgroundColor: "#fff",
//             },
//             textInput: {
//               flex: 1,
//               height: 44,
//               fontSize: 16,
//               paddingLeft: 12,
//               paddingRight: 40,
//             },
//             listView: {
//               backgroundColor: "white",
//               zIndex: 999,
//               elevation: 5,
//             },
//           }}
//           renderRightButton={() => (
//             <Icon
//               name="search"
//               size={24}
//               color="#333"
//               style={{ marginRight: 10 }}
//               onPress={() => {
//                 const currentText = searchRef.current?.getAddressText?.();
//                 console.log("Manual search clicked for:", currentText);

//                 if (currentText) {
//                   // Use Google Geocoding API to resolve text
//                   fetch(
//                     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//                       currentText
//                     )}&key=${GOOGLE_PLACES_API_KEY}`
//                   )
//                     .then((res) => res.json())
//                     .then((resJson) => {
//                       if (resJson.results.length > 0) {
//                         const { lat, lng } =
//                           resJson.results[0].geometry.location;
//                         const newRegion: Region = {
//                           latitude: lat,
//                           longitude: lng,
//                           latitudeDelta: 0.01,
//                           longitudeDelta: 0.01,
//                         };
//                         setRegion(newRegion);
//                         setMarker({ latitude: lat, longitude: lng });
//                       }
//                     })
//                     .catch((err) => console.error("Geocoding error:", err));
//                 }
//               }}
//             />
//           )}
//         />
//       </View>

//       {/* Current Location Button */}
//       <TouchableOpacity
//         style={styles.locationButton}
//         onPress={getCurrentLocation}
//       >
//         <Icon name="my-location" size={24} color="#333" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   searchContainer: {
//     position: "absolute",
//     top: 40,
//     left: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   locationButton: {
//     position: "absolute",
//     bottom: 40,
//     right: 20,
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     zIndex: 1,
//   },
// });

// export default MapScreen;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, PermissionsAndroid, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 20.5937, // Default to India
    longitude: 78.9629,
    latitudeDelta: 10, // Zoomed out for whole India
    longitudeDelta: 10,
  });
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const fetchCurrentLocation = () => {
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
        Geolocation.clearWatch(watchId);
      },
      (error) => {
        console.log("Geolocation Error:", error.code, error.message);
        if (error.code === error.PERMISSION_DENIED) {
          Alert.alert('Location Error', 'Location permission was denied.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          Alert.alert('Location Error', 'Your device\'s location is currently unavailable.');
        }
        // Ignore TIMEOUT alert spam
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonPositive: "OK"
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
          return true;
        } else {
          setHasLocationPermission(false);
          Alert.alert('Permission Required', 'Location access is needed to use the map features.');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      setHasLocationPermission(true);
      return true;
    }
  };

  useEffect(() => {
    const init = async () => {
      const isGranted = await requestLocationPermission();
      if (isGranted) {
        fetchCurrentLocation();
      }
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={hasLocationPermission}
        showsMyLocationButton={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;

