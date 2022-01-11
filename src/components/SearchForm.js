const SearchForm = ({
  className,
  searchValue,
  keywords,
  keywordsClass,
  onChange,
  onSubmit,
}) => {
  return (
    <form className={className || null} onSubmit={onSubmit}>
      <input
        value={searchValue}
        onChange={onChange}
        type="search"
        placeholder="Enter Food or Ingredient name..."
      />
      <button>Search</button>
      {keywords && (
        <button
          onClick={() =>
            window
              .open("https://forkify-api.herokuapp.com/phrases.html", "_blank")
              .focus()
          }
          className={keywordsClass}
        >
          List of keywords
        </button>
      )}
    </form>
  );
};
export default SearchForm;
