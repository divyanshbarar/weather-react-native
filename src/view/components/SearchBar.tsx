import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useWeatherContext } from '../../context/WeatherContext';
import { DEBOUNCE_DELAY } from '../../utils/constants';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const { theme } = useWeatherContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (debouncedText.trim() && debouncedText.length > 2) {
      onSearch(debouncedText);
    }
  }, [debouncedText, onSearch]);

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <TextInput
        style={[
          styles.input,// Or your loading component
          {
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder="Enter city name..."
        placeholderTextColor={theme.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        editable={!loading}
      />
      <TouchableOpacity
        style={[
          styles.searchButton,
          { backgroundColor: theme.primary },
          loading && styles.buttonDisabled,
        ]}
        onPress={handleSearch}
        disabled={loading || !searchText.trim()}
      >
        <Text style={styles.searchButtonText}>
          {loading ? 'Searching...' : 'Search'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  searchButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default SearchBar;