import { FaSearch } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Search from "./Search";
import classes from "./Navigation.module.css";
import SearchForm from "./SearchForm";
import NavigationLogic from "./NavigationLogic";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../store/search-store";

const Navigation = () => {
  const {
    renderSearchForm,
    searchInputValue,
    searchIsShown,
    onSearchChangeHandler,
    onFormSubmitHandler,
    toggleSearchHandler,
  } = NavigationLogic();

  const { updateSearchedRecipes, setRequestError } = useContext(SearchContext);

  const navigate = useNavigate();

  const resetAndGoToStart = () => {
    updateSearchedRecipes([]);
    setRequestError("");
  };
  return (
    <>
      <nav id="top">
        <div className={classes.navigation}>
          <Link id="logo" to="/" onClick={resetAndGoToStart}>
            <MdOutlineRestaurantMenu />
            Fooders
          </Link>
          <div>
            <button className={classes["search-btn"]}>
              <FaSearch onClick={toggleSearchHandler} />
            </button>

            <SearchForm
              className={classes["lg-search"]}
              searchValue={searchInputValue}
              onChange={onSearchChangeHandler}
              onSubmit={onFormSubmitHandler}
              smallScreens={false}
            />
          </div>
        </div>
      </nav>
      {renderSearchForm && (
        <Search
          searchValue={searchInputValue}
          onChange={onSearchChangeHandler}
          onSubmit={onFormSubmitHandler}
          isOpen={searchIsShown}
          smallScreens={true}
        />
      )}
    </>
  );
};
export default Navigation;
