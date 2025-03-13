import SearchHistory from './SearchHistory';
import { formatDate } from '../../helper';
import { WeatherApiResponse } from '../../WeatherApiResponse';
import sunImage from '../../assets/sun.png';

import "./WeatherDisplay.css"

type WeatherDisplayProps = {
    searchHistory: WeatherApiResponse[];
    onSearch: (location: string) => void;
    onRemove: (locationToRemove: string) => void;
};

const WeatherDisplay = ({ searchHistory, onSearch, onRemove }: WeatherDisplayProps) => {
  const currentWeather = searchHistory[0];

  return (
    <section className="weather-container">
      <div className="weather-icon">
        <img src={sunImage} alt="Cloud with Sun" />
      </div>

      <div className="weather-display">
        <div className='todays-weather'>Today's Weather</div>
        {searchHistory.length > 0 ? (
          <div className="weather-info">
            <div className='temperature'>
              {Math.round(currentWeather.main.temp - 273.15)}°
            </div>

            <p className='high-low'>
              H: {Math.round(currentWeather.main.temp_max - 273.15)}°C L:{' '}
              {Math.round(currentWeather.main.temp_min - 273.15)}°C
            </p>
           
            <div className="weather-details">
              <p className='location'>{`${currentWeather.name}, ${currentWeather.sys.country}`}</p>
              <p>{formatDate(currentWeather.dt)}</p>
              <p>Humidity: {currentWeather.main.humidity}%</p>
              <p>{currentWeather.weather[0].description}</p>
            </div>
          </div>
        ) : (
          <p className='no-weather'>No weather data</p>
        )}
      </div>

      <SearchHistory 
        history={searchHistory} 
        onSearch={onSearch}
        onRemove={onRemove}
      />
    </section>
  );
};

export default WeatherDisplay;
