import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useWeatherContext } from '../../context/WeatherContext';
import { WeatherData } from '../../types/weather.type';

interface WeatherCardProps {
  data: WeatherData;
  isOffline: boolean;
  onRefresh: () => void;
  refreshing: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  isOffline,
  onRefresh,
  refreshing,
}) => {
  const { theme } = useWeatherContext();

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 80) return '#FF6B6B';
    if (temp > 60) return '#FFD93D';
    if (temp > 40) return '#6BCF7F';
    return '#74C0FC';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {isOffline && (
        <View style={[styles.offlineIndicator, { backgroundColor: theme.warning }]}>
          <Text style={styles.offlineText}>Offline - Showing cached data</Text>
        </View>
      )}

      <View style={styles.header}>
        <Text style={[styles.location, { color: theme.text }]}>{data.location}</Text>
        <TouchableOpacity
          style={[styles.refreshButton, { backgroundColor: theme.primary }]}
          onPress={onRefresh}
          disabled={refreshing}
        >
          <Text style={styles.refreshButtonText}>
            {refreshing ? '↻' : '↻'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainInfo}>
        <Text
          style={[
            styles.temperature,
            { color: getTemperatureColor(data.temperature) }
          ]}
        >
          {data.temperature}°F
        </Text>
        <Text style={[styles.condition, { color: theme.text }]}>
          {data.condition}
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
            Humidity
          </Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            {data.humidity}%
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
            Wind Speed
          </Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            {data.windSpeed} mph
          </Text>
        </View>
      </View>

      <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
        Last updated: {formatTimestamp(data.timestamp)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  offlineIndicator: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  offlineText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WeatherCard;