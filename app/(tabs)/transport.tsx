import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

// Тип для маршрута
type Route = {
  id: number;
  type: string;
  number: string;
  route: string;
  arrivalTime: string;
};

// Пример данных о маршрутах
const initialRoutes: Route[] = [
  { id: 1, type: 'Автобус', number: '25', route: 'Центр - Южный район', arrivalTime: '10 минут' },
  { id: 2, type: 'Трамвай', number: '3', route: 'Северный район - Вокзал', arrivalTime: '15 минут' },
];

// Контекст для управления состоянием маршрутов
type TransportContextType = {
  routes: Route[];
  addRoute: (route: Omit<Route, 'id'>) => void;
  deleteRoute: (id: number) => void;
  updateArrivalTimes: () => void;
};

const TransportContext = createContext<TransportContextType | undefined>(undefined);

export const useTransport = () => {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error('useTransport must be used within a TransportProvider');
  }
  return context;
};

export const TransportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);

  const addRoute = (newRoute: Omit<Route, 'id'>) => {
    const route: Route = { id: routes.length + 1, ...newRoute };
    setRoutes((prevRoutes) => [...prevRoutes, route]);
  };

  const deleteRoute = (id: number) => {
    setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== id));
  };

  const updateArrivalTimes = () => {
    const updatedRoutes = routes.map(route => ({
      ...route,
      arrivalTime: `${Math.floor(Math.random() * 20) + 1} минут`,
    }));
    setRoutes(updatedRoutes);
  };

  return (
    <TransportContext.Provider value={{ routes, addRoute, deleteRoute, updateArrivalTimes }}>
      {children}
    </TransportContext.Provider>
  );
};

// Компонент для отображения списка маршрутов
const RouteItem: React.FC<{ route: Route; onDelete: (id: number) => void }> = React.memo(({ route, onDelete }) => (
  <View style={styles.route}>
    <Text style={styles.routeText}>
      {route.type} №{route.number}: {route.route}
    </Text>
    <Text style={styles.routeText}>Время прибытия: {route.arrivalTime}</Text>
    <TouchableOpacity onPress={() => onDelete(route.id)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Удалить</Text>
    </TouchableOpacity>
  </View>
));

const RouteList: React.FC<{ routes: Route[] }> = React.memo(({ routes }) => {
  const { deleteRoute } = useTransport();

  return (
    <>
      {routes.map((route) => (
        <RouteItem key={route.id} route={route} onDelete={deleteRoute} />
      ))}
    </>
  );
});

// Компонент для добавления нового маршрута
const AddRouteForm: React.FC = () => {
  const [newRoute, setNewRoute] = useState<Omit<Route, 'id'>>({ type: '', number: '', route: '', arrivalTime: '' });
  const { addRoute } = useTransport();

  const handleAddRoute = () => {
    if (newRoute.type && newRoute.number && newRoute.route && newRoute.arrivalTime) {
      addRoute(newRoute);
      setNewRoute({ type: '', number: '', route: '', arrivalTime: '' });
    }
  };

  return (
    <View style={styles.addRouteContainer}>
      <TextInput
        style={styles.input}
        placeholder="Тип транспорта (например, Автобус)"
        value={newRoute.type}
        onChangeText={(text) => setNewRoute((prev) => ({ ...prev, type: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Номер маршрута (например, 25)"
        value={newRoute.number}
        onChangeText={(text) => setNewRoute((prev) => ({ ...prev, number: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Маршрут (например, Центр - Южный район)"
        value={newRoute.route}
        onChangeText={(text) => setNewRoute((prev) => ({ ...prev, route: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Время прибытия (например, 10 минут)"
        value={newRoute.arrivalTime}
        onChangeText={(text) => setNewRoute((prev) => ({ ...prev, arrivalTime: text }))}
      />
      <Button title="Добавить маршрут" onPress={handleAddRoute} />
    </View>
  );
};

// Основной компонент
export const TransportScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { routes, updateArrivalTimes } = useTransport();

  useEffect(() => {
    const interval = setInterval(updateArrivalTimes, 60000);
    return () => clearInterval(interval);
  }, [updateArrivalTimes]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const filteredRoutes = useMemo(() => {
    return filter === 'all'
      ? routes
      : routes.filter((route) => route.type.toLowerCase() === filter);
  }, [routes, filter]);

  const sortedRoutes = useMemo(() => {
    return filteredRoutes.sort((a, b) => {
      const timeA = parseInt(a.arrivalTime);
      const timeB = parseInt(b.arrivalTime);
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }, [filteredRoutes, sortOrder]);

  return (
    <TransportProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Общественный транспорт</Text>
        <Text style={styles.subHeader}>Маршруты:</Text>

        <View style={styles.filterContainer}>
          <Button title="Все" onPress={() => setFilter('all')} />
          <Button title="Автобусы" onPress={() => setFilter('автобус')} />
          <Button title="Трамваи" onPress={() => setFilter('трамвай')} />
        </View>

        <View style={styles.sortContainer}>
          <Button title="Сортировать по времени (по возрастанию)" onPress={() => setSortOrder('asc')} />
          <Button title="Сортировать по времени (по убыванию)" onPress={() => setSortOrder('desc')} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <RouteList routes={sortedRoutes} />
        )}

        <AddRouteForm />

        <Button title="Обновить время прибытия" onPress={updateArrivalTimes} />
        <Button title="Загрузить данные" onPress={fetchData} />
      </ScrollView>
    </TransportProvider>
  );
};

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 16,
    color: '#666',
  },
  route: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addRouteContainer: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  sortContainer: {
    marginBottom: 16,
  },
});