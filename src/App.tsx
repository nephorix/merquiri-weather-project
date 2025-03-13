import { useState, useEffect } from 'react'
import Header from './components/header-widget/Header'
import SearchBar from './components/search-widget/SearchBar';
import WeatherDisplay from './components/weather-display-widget/WeatherDisplay';
import { WeatherApiResponse } from './WeatherApiResponse';

import './App.css'

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [searchHistory, setSearchHistory] = useState<WeatherApiResponse[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // using css variables to enable dark/light mode
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]); 

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Fetch based on location that has been inputted
  const fetchWeather = async (location: string) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=b5933e00142ffe78a2a012a4f6ad5e32`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherApiResponse = await response.json();

      // Remove previous entry of searched location in Search History as will be added again at the top
      const newArr = searchHistory.filter(item => item.name.toLowerCase() !== location.toLowerCase());
      setSearchHistory([data, ...newArr]);

    } catch (error) {
      setSearchError(true);
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (location: string) => {
    fetchWeather(location);
  }

  const handleInput = (newValue: string) => {
    setSearchValue(newValue);

    if (searchError) {
      setSearchError(false);
    }
  }

  const removeLocation = (location: string) => {
    const newArr = searchHistory.filter(item => item.name.toLowerCase() !== location.toLowerCase());
    setSearchHistory(newArr);
  }

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Header isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />

      <main className="main-content">
        <SearchBar 
          value={searchValue} 
          onChange={handleInput} 
          onSearch={handleSearch}
          isError={searchError}
        />

        <WeatherDisplay 
          searchHistory={searchHistory} 
          onRemove={removeLocation}
          onSearch={handleSearch}
        />
      </main>
    </div>
  )
}

export default App
