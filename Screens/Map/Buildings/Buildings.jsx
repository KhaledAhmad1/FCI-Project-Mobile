import React, { useState } from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../../../AuthContext";
import Sidebar from "./Sidebar";
import Map from "./Map";
import Spinner from "../../../components/Spinner/Spinner";

const BuildingScreen = () => {
  const { isLoggedIn } = useAuth();
  const [coordinates, setCoordinates] = useState(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn, navigation]);

  const handleGoToGoogleMaps = (coords) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    Linking.openURL(googleMapsUrl).catch(err => console.error("Failed to open URL:", err));
  };

  const handleLocationSelect = (coords) => {
    setCoordinates(coords);
    handleGoToGoogleMaps(coords);
  };

  if (!isLoggedIn) {
    return <Spinner />;
  }

  return (
    <Sidebar onLocationSelect={handleLocationSelect}>
      <Map coordinates={coordinates} />
      <TouchableOpacity 
        onPress={() => handleGoToGoogleMaps(coordinates)} 
        style={styles.mapButton}
      >
        <Text style={styles.mapButtonText}>View in Google Maps</Text>
      </TouchableOpacity>
    </Sidebar>
  );
};

const styles = StyleSheet.create({
  mapButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginTop: 10,
  },
  mapButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default BuildingScreen;
