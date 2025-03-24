import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/(tabs)/firebaseConfig';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types'; 

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Пользователь вошел:', userCredential.user);
      Alert.alert('Успех', 'Вход выполнен успешно!');
    } catch (error: any) {
      console.error('Ошибка входа:', error.message);
      Alert.alert('Ошибка', error.message);
    }
  };

  
  const handleNavigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>

      {/* Поле для email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Поле для пароля */}
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Кнопка входа */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>

      {/* Кнопка "Зарегистрироваться" */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleNavigateToSignUp}>
        <Text style={styles.signUpButtonText}>Нет аккаунта? Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333', 
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333', 
    backgroundColor: '#f9f9f9', 
  },
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', 
  },
  signUpButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 14,
    color: '#007AFF', 
    textDecorationLine: 'underline', 
  },
});