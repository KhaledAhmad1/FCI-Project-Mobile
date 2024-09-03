import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useAuth } from "../AuthContext"
import { useNavigation } from '@react-navigation/native';

const NotificationPopup = () => {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://192.168.1.7:5000/notifications/getNewNotifications", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
          if (data.notifications.length > 0) {
            setVisible(true);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }).start();

            const hideTimer = setTimeout(() => {
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start(() => setVisible(false));
            }, 5000);

            return () => {
              clearTimeout(hideTimer);
            };
          }
        } else {
          throw new Error("Server did not return a valid notifications array");
        }
      } else {
        throw new Error("Server did not return JSON");
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn]);

  const handlePress = () => {
    navigation.navigate('News');
  };

  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.popup, { opacity: fadeAnim }]}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          notifications.map((notification) => (
            <Text key={notification.id} style={styles.notificationText}>
              {notification.title}
            </Text>
          ))
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
    maxWidth: 250,
  },
  notificationText: {
    color: "#fff",
    marginBottom: 5,
  },
  error: {
    color: "red",
  },
});

export default NotificationPopup;
