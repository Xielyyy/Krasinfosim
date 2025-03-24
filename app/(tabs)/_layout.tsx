import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Импортируем иконки
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Прозрачный фон для iOS
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {/* Главная */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />

      {/* Услуги */}
      <Tabs.Screen
        name="utilities"
        options={{
          title: 'Услуги',
          tabBarIcon: ({ color }) => <Ionicons name="build" size={24} color={color} />,
        }}
      />

      {/* Автомойка */}
      <Tabs.Screen
        name="carwash"
        options={{
          title: 'Автомойка',
          tabBarIcon: ({ color }) => <Ionicons name="car" size={24} color={color} />,
        }}
      />

      {/* Транспорт */}
      <Tabs.Screen
        name="transport"
        options={{
          title: 'Транспорт',
          tabBarIcon: ({ color }) => <Ionicons name="bus" size={24} color={color} />,
        }}
      />

      {/* Профиль */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}