import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type StudyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Study'>;
export type HotelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Hotel'>;