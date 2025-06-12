export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
  timestamp: number;
}

export interface WeatherApiResponse {
  resolvedAddress: string;
  currentConditions: {
    temp: number;
    humidity: number;
    windspeed: number;
    conditions: string;
    icon: string;
  };
  description: string;
}

export interface WeatherError {
  message: string;
  code?: string;
}
