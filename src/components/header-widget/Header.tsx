import './Header.css';

type HeaderProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

const Header = ({ isDarkMode, onToggleTheme }: HeaderProps) => {
  return (
    <header className="header">
      <button className="theme-toggle-button" onClick={onToggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
};

export default Header;
