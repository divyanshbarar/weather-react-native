import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherModel } from '../model/WeatherModel';
import { WeatherData } from '../types/weather.type';

export class StorageService {
  private static readonly WEATHER_DATA_KEY = 'last_weather_data';
  private static readonly THEME_KEY = 'app_theme';

  static async saveWeatherData(data: WeatherData): Promise<void> {
    try {
      await AsyncStorage.setItem(this.WEATHER_DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save weather data:', error);
    }
  }

  static async getWeatherData(): Promise<WeatherData | null> {
    try {
      const data = await AsyncStorage.getItem(this.WEATHER_DATA_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return WeatherModel.validateWeatherData(parsed) ? parsed : null;
      }
      return null;
    } catch (error) {
      console.error('Failed to get weather data:', error);
      return null;
    }
  }

  static async saveTheme(isDark: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(this.THEME_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }

  static async getTheme(): Promise<boolean> {
    try {
      const theme = await AsyncStorage.getItem(this.THEME_KEY);
      return theme ? JSON.parse(theme) : false;
    } catch (error) {
      console.error('Failed to get theme:', error);
      return false;
    }
  }
}
