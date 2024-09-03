import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from '../../AuthContext';

const Navbar = () => {
  const navigation = useNavigation();
  const { isLoggedIn, logout } = useAuth(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch('http://192.168.1.7:5000/notifications/getAllNotifications', {
            method: 'GET',
            credentials: 'include',
          });
          const data = await response.json();
          setNotifications(data.notifications);
        } catch (error) {
          setError('Error fetching notifications');
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotifications();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await fetch('http://192.168.1.7:5000/login/logout', {
        method: 'POST',
        credentials: 'include',
      });
      logout(); 
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = () => {
    navigation.navigate('News');
    toggleNotifications(); 
  };

  const handleAboutClick = () => {
    navigation.navigate('About', { scrollTo: 'about' });
    toggleMenu();
  };

  const handleContactClick = () => {
    Linking.openURL('https://www.aun.edu.eg/fci/ar/home-2');
    toggleMenu();
  };

  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
        <Text style={styles.hamburgerText}>{menuOpen ? '✖' : '☰'}</Text>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>FCI</Text>
      </View>
      {isLoggedIn ? (
        <View style={styles.authContainer}>
          <TouchableOpacity onPress={toggleNotifications} style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            {showNotifications && (
              <View style={styles.notificationDropdown}>
                {error ? (
                  <Text style={styles.error}>{error}</Text>
                ) : notifications.length > 0 ? (
                  notifications.map(notification => (
                    <TouchableOpacity 
                      key={notification.id} 
                      style={styles.notificationItem}
                      onPress={handleNotificationClick}
                    >
                      <Text>{notification.title}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.notificationItem}>No notifications</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.buttonSignUp}>
            <Text style={styles.signUpText}>Free Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
      {menuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
              toggleMenu();
            }}
            style={styles.menuItem}
          >
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAboutClick}
            style={styles.menuItem}
          >
            <Text style={styles.linkText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleContactClick}
            style={styles.menuItem}
          >
            <Text style={styles.linkText}>Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    fontSize: 28,
    color: '#333',
  },
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginHorizontal: 10,
    position: 'relative',
  },
  notificationDropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    width: 200,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000,
  },
  notificationItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoutButton: {
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  authLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLogin: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  buttonSignUp: {
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  signUpText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 60,
    left: 10,
    backgroundColor: '#fff',
    width: 150,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'red',
  },
});

export default Navbar;
