import { WeatherApiResponse, WeatherData } from '../types/weather.type';

export class WeatherModel {
  static fromApiResponse(response: WeatherApiResponse): WeatherData {
    return {
      location: response.resolvedAddress,
      temperature: Math.round(response.currentConditions.temp),
      humidity: response.currentConditions.humidity,
      windSpeed: Math.round(response.currentConditions.windspeed),
      condition: response.currentConditions.conditions,
      description: response.description,
      icon: response.currentConditions.icon,
      timestamp: Date.now(),
    };
  }

  static validateWeatherData(data: any): data is WeatherData {
    return (
      data &&
      typeof data.location === 'string' &&
      typeof data.temperature === 'number' &&
      typeof data.humidity === 'number' &&
      typeof data.windSpeed === 'number' &&
      typeof data.condition === 'string' &&
      typeof data.timestamp === 'number'
    );
  }
}
