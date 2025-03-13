import { formatDate } from '../../helper';
import { WeatherApiResponse } from '../../WeatherApiResponse';
import searchIcon from '../../assets/search.svg';
import deleteIcon from '../../assets/trash.svg'

import './SearchHistory.css';

type SearchHistoryProps = {
  history: WeatherApiResponse[];
  onSearch: (location: string) => void;
  onRemove: (locationToRemove: string) => void;
};

const SearchHistory = ({ history, onSearch, onRemove }: SearchHistoryProps) => {
  return (
    <section className="search-history">
      <h4>Search History</h4>
      {history.length === 0 ? (
        <p className="no-history">No history records</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={`${item.name}-${item.dt}`} className="search-history-item">
              <div className="search-left">
                <span className="search-location">
                  {item.name}, {item.sys.country}
                </span>
                <span className="search-date">{formatDate(item.dt)}</span>
              </div>

              <div className="search-right">
                <button
                  className="search-again-button"
                  aria-label="Search again"
                  onClick={() => onSearch(item.name)}
                >
                  <img src={searchIcon} alt="Search icon" />
                </button>
                <button
                  className="delete-button"
                  aria-label="Delete search history item"
                  onClick={() => onRemove(item.name)}
                >
                  <img src={deleteIcon} alt="Delete icon" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchHistory;
