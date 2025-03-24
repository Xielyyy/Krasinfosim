import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/app/(tabs)/firebaseConfig';
import SignInScreen from '@/app/(tabs)/SignInScreen';

// Тип для иконок
type IconName = 'car-outline' | 'water-outline';

// Данные для событий
const eventsData = [
  {
    id: '1',
    type: 'Записи',
    title: 'Запись на мойку',
    description: 'Запишитесь на мойку автомобиля',
    icon: 'car-outline' as IconName,
  },
  {
    id: '2',
    type: 'Отключения',
    title: 'Отключение воды',
    description: 'Плановое отключение воды 15.10.2023',
    icon: 'water-outline' as IconName,
  },
];

// Данные для новостей
const newsData = [
  {
    id: '1',
    image: require('@/assets/images/park.jpg'),
    title: 'Открытие нового парка',
    description: 'В городе открылся новый парк с зонами для отдыха и детскими площадками.',
    date: '15.10.2023',
  },
  {
    id: '2',
    image: require('@/assets/images/road_repair.jpg'),
    title: 'Ремонт дорог на улице Ленина',
    description: 'С 16 октября начнется ремонт дорожного покрытия. Просьба соблюдать осторожность.',
    date: '14.10.2023',
  },
];

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return <SignInScreen />;
  }

  return <HomeScreen />;
}

function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNotificationsPress = () => {
    navigation.navigate('notifications');
  };

  const handleEventPress = (eventType: string) => {
    switch (eventType) {
      case 'Записи':
        navigation.navigate('carwash');
        break;
      case 'Отключения':
        navigation.navigate('utilities');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Заголовок и иконка уведомлений */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Главная</Text>
        <TouchableOpacity onPress={handleNotificationsPress}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Ближайшие события */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ближайшие события</Text>
        <View style={styles.eventsContainer}>
          {eventsData.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventItem}
              onPress={() => handleEventPress(event.type)}
            >
              <Ionicons name={event.icon} size={32} color="#007AFF" style={styles.eventIcon} />
              <View style={styles.eventTextContainer}>
                <Text style={styles.eventType}>{event.type}</Text>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Лента новостей */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Новости</Text>
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.newsItem}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  eventsContainer: {
    marginBottom: 16,
  },
  eventItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventIcon: {
    marginRight: 16,
  },
  eventTextContainer: {
    flex: 1,
  },
  eventType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});