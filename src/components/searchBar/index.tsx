interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar avaliações...",
  onSearch,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
      />
    </div>
  );
};

export default SearchBar;
