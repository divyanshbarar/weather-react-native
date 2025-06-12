import { useCallback, useState } from 'react';
import { StorageService } from '../services/StorageService';
import { WeatherService } from '../services/WeatherService';
import { WeatherData } from '../types/weather.type';

export class WeatherViewModel {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = WeatherService.getInstance();
  }

  useWeatherData() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isOffline, setIsOffline] = useState<boolean>(false);

    const fetchWeather = useCallback(async (city: string) => {
      if (!city.trim()) {
        setError('Please enter a city name');
        return;
      }

      setLoading(true);
      setError(null);
      setIsOffline(false);

      try {
        const data = await this.weatherService.fetchWeatherData(city);
        console.log("data-vm",data)
        setWeatherData(data);
        await StorageService.saveWeatherData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);

        // Try to load cached data on error
        const cachedData = await StorageService.getWeatherData();
        if (cachedData) {
          setWeatherData(cachedData);
          setIsOffline(true);
        }
      } finally {
        setLoading(false);
      }
    }, []);

    const loadCachedData = useCallback(async () => {
      const cachedData = await StorageService.getWeatherData();
      if (cachedData) {
        setWeatherData(cachedData);
        setIsOffline(true);
      }
    }, []);

    const clearError = useCallback(() => {
      setError(null);
    }, []);

    return {
      weatherData,
      loading,
      error,
      isOffline,
      fetchWeather,
      loadCachedData,
      clearError,
    };
  }
}
