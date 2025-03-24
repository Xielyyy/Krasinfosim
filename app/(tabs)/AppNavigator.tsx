import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '@/app/(tabs)/SignInScreen';
import SignUpScreen from '@/app/(tabs)/SignUpScreen'; // Импортируйте экран регистрации
import TabNavigator from '@/app/(tabs)/_layout'; // Импортируем TabNavigator
import NotificationsScreen from '@/app/(tabs)/notifications'; // Импортируем экран уведомлений

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Основные вкладки */}
        <Stack.Screen name="Tabs" component={TabNavigator} />

        {/* Скрытые экраны */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} /> {/* Убедитесь, что этот экран добавлен */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}