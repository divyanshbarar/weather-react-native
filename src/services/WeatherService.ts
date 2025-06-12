import { WeatherModel } from '../model/WeatherModel';
import { WeatherApiResponse, WeatherData } from '../types/weather.type';
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from '../utils/constants';

export class WeatherService {
  private static instance: WeatherService;

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  async fetchWeatherData(city: string): Promise<WeatherData> {
    try {
      const url = `${WEATHER_API_BASE_URL}/${encodeURIComponent(city)}?key=${WEATHER_API_KEY}&include=current`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('API key is invalid. Please check your configuration.');
        } else {
          throw new Error(`Weather service error: ${response.status}`);
        }
      }

      const data: WeatherApiResponse = await response.json();
      return WeatherModel.fromApiResponse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch weather data. Please check your internet connection.');
    }
  }
}
