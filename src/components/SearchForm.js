const SearchForm = ({ className, searchValue, onChange, onSubmit }) => {
  return (
    <form className={className || ""} onSubmit={onSubmit}>
      <input
        value={searchValue}
        onChange={onChange}
        type="search"
        placeholder="Enter Food or Ingredient name..."
      />
      <button>Search</button>
    </form>
  );
};
export default SearchForm;
