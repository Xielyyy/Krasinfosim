import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/(tabs)/firebaseConfig';


export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');

  const handleSignUp = async () => {
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Пользователь зарегистрирован:', userCredential.user);

      // Здесь можно сохранить дополнительные данные (имя, телефон, район) в Firebase Firestore или Realtime Database
      Alert.alert('Успех', 'Регистрация прошла успешно!');
    } catch (error: any) {
      console.error('Ошибка регистрации:', error.message);
      Alert.alert('Ошибка', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      {/* Поле для имени */}
      <TextInput
        style={styles.input}
        placeholder="Имя"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

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

      {/* Поле для номера телефона */}
      <TextInput
        style={styles.input}
        placeholder="Номер телефона"
        placeholderTextColor="#999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Поле для района проживания */}
      <TextInput
        style={styles.input}
        placeholder="Район проживания"
        placeholderTextColor="#999"
        value={district}
        onChangeText={setDistrict}
      />

      {/* Кнопка регистрации */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
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
});