import { createContext, useCallback, useState } from "react";

const initialState = {
  searchedRecipes: [],
  searchValue: "",
  recipeDetails: Object,
  requestError: String,
  getSearchValue: (value) => {},
  updateSearchedRecipes: (recipes) => {},
  resetRecipeDetails: () => {},
  setRequestError: () => {},
};

export const SearchContext = createContext(initialState);

const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [requestError, setRequestError] = useState("");

  const getSearchValue = useCallback((value) => {
    setSearchValue(value);
  });

  const updateSearchedRecipes = (recipes) => {
    setSearchedRecipes(recipes);
  };

  const updateRecipeDetails = (details) => {
    setRecipeDetails(details);
  };

  const resetRecipeDetails = () => {
    setRecipeDetails(null);
  };
  return (
    <SearchContext.Provider
      value={{
        searchedRecipes,
        searchValue,
        recipeDetails,
        getSearchValue,
        updateSearchedRecipes,
        updateRecipeDetails,
        resetRecipeDetails,
        requestError,
        setRequestError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
