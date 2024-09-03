import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginForm = ({ isAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { login } = useAuth()
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formSubmitHandler = async () => {
    const validationErrors = { email: '', password: '' };

    if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://192.168.1.7:5000/login/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, isAdmin }),
      });

      const data = await response.json();

      if (data.success && data.loggedIn) {
        login(data.isAdmin); 
        navigation.navigate('Home');
      } else {
        setErrors({
          email: data.message === 'Email not found' ? 'Email not found' : '',
          password: data.message === 'Incorrect password' ? 'Incorrect password' : '',
        });
      }
    } catch (error) {
      console.error('Error during the login process:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email ? styles.inputError : null]}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        placeholder="Password"
        style={[styles.input, errors.password ? styles.inputError : null]}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      <TouchableOpacity onPress={formSubmitHandler} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: { padding: 20, width: '100%' },
  input: { width: '100%', paddingVertical: 15, paddingHorizontal: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, color: '#333' },
  inputError: { borderColor: 'red' },
  signInButton: { marginTop: 20, paddingVertical: 12, borderRadius: 8, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  signInButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  error: { color: 'red', fontSize: 14, marginTop: 4 },
});

export default LoginForm;
