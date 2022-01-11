import classes from "./SearchForm.module.css";

const SearchForm = ({
  className,
  searchValue,
  smallScreens,
  onChange,
  onSubmit,
}) => {
  return (
    <form className={className || null} onSubmit={onSubmit}>
      {!smallScreens && (
        <a
          href="https://forkify-api.herokuapp.com/phrases.html"
          target="_blank"
          className={classes.keywords}
        >
          List of keywords
        </a>
      )}
      <input
        value={searchValue}
        onChange={onChange}
        type="search"
        placeholder="Enter Food or Ingredient name..."
      />
      <button type="submit" className={classes["search-button"]}>
        Search
      </button>
      {smallScreens && (
        <a
          href="https://forkify-api.herokuapp.com/phrases.html"
          target="_blank"
          className={classes["keywords-sm"]}
        >
          List of keywords
        </a>
      )}
    </form>
  );
};
export default SearchForm;
