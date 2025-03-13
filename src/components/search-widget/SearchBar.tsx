import SearchIcon from "../../assets/search.svg";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
  onSearch: (location: string) => void;
  isError: boolean;
}

const SearchBar = ({ value, onChange, onSearch, isError }: SearchBarProps) => {
  return (
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Enter a location..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className='search-button' onClick={() => onSearch(value)} aria-label="Search">
          <img className="search-icon" src={SearchIcon} alt="Search icon" />
        </button>
        {isError && <p className="error-message">Invalid location</p>}
      </div>
  );
};

export default SearchBar;
