import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Theme } from '../utils/themes';

interface WeatherContextType {
  isDarkMode: boolean;
  theme: Theme;
  toggleTheme: () => void;
  isLoading: boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = '@weather_app_theme';

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDarkMode(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
        // Default to light theme on error
        setIsDarkMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newMode));
    } catch (error) {
      console.error('Failed to save theme preference:', error);
      // Revert state if save fails
      setIsDarkMode(isDarkMode);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <WeatherContext.Provider 
      value={{ 
        isDarkMode, 
        theme, 
        toggleTheme, 
        isLoading 
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};