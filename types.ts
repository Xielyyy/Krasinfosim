import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  index: undefined; // Главная страница
  utilities: undefined; // Услуги
  carwash: undefined; // Автомойка
  transport: undefined; // Транспорт
  profile: undefined; // Профиль
  notifications: undefined; // Уведомления
  SignIn: undefined;
  SignUpScreen: undefined; 
};

export type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'index'>;

