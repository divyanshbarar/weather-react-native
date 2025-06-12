import React, { useCallback, useEffect } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWeatherContext } from '../src/context/WeatherContext';
import LoadingSpinner from '../src/view/components/LoadingSpinner';
import SearchBar from '../src/view/components/SearchBar';
import WeatherCard from '../src/view/components/WeatherCrad';
import { WeatherViewModel } from '../src/viewmodel/WeatherViewModel';

export default function WeatherScreen() {
  const { theme, isDarkMode, toggleTheme } = useWeatherContext();
  const viewModel = new WeatherViewModel();
  const {
    weatherData,
    loading,
    error,
    isOffline,
    fetchWeather,
    loadCachedData,
    clearError,
  } = viewModel.useWeatherData();

  useEffect(() => {
    loadCachedData();
  }, [loadCachedData]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        { text: 'OK', onPress: clearError },
      ]);
    }
  }, [error, clearError]);

  const handleSearch = useCallback((city: string) => {
    fetchWeather(city);
  }, [fetchWeather]);

  const handleRefresh = useCallback(() => {
    if (weatherData) {
      fetchWeather(weatherData.location);
    }
  }, [weatherData, fetchWeather]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Weather App</Text>
        <TouchableOpacity
          style={[styles.themeButton, { backgroundColor: theme.primary }]}
          onPress={toggleTheme}
        >
          <Text style={styles.themeButtonText}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && !weatherData && (
          <LoadingSpinner message="Fetching weather data..." />
        )}

        {weatherData && (
          <WeatherCard
            data={weatherData}
            isOffline={isOffline}
            onRefresh={handleRefresh}
            refreshing={loading}
          />
        )}

        {!weatherData && !loading && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              Search for a city to see weather information
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 100,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
