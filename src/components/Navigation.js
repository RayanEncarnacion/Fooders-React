import { FaSearch } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Search from "./Search";
import classes from "./Navigation.module.css";
import SearchForm from "./SearchForm";
import NavigationLogic from "./NavigationLogic";

const Navigation = () => {
  const {
    width,
    searchInputValue,
    searchIsShown,
    onSearchChangeHandler,
    onFormSubmitHandler,
    toggleSearchHandler,
  } = NavigationLogic();

  return (
    <>
      <nav>
        <div className={classes.navigation}>
          <h1>
            <MdOutlineRestaurantMenu />
            Fooders
          </h1>
          <div>
            <button className={classes["search-btn"]}>
              <FaSearch onClick={toggleSearchHandler} />
            </button>

            <SearchForm
              className={classes["lg-search"]}
              searchValue={searchInputValue}
              onChange={onSearchChangeHandler}
              onSubmit={onFormSubmitHandler}
            />
          </div>
        </div>
      </nav>
      {!width && (
        <Search
          searchValue={searchInputValue}
          onChange={onSearchChangeHandler}
          onSubmit={onFormSubmitHandler}
          isOpen={searchIsShown}
        />
      )}
    </>
  );
};
export default Navigation;
