import { useState, useEffect, useContext, useCallback } from "react";
import { SearchContext } from "../store/search-store";

const NavigationLogic = () => {
  const [searchIsShown, setSearchIsShown] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [width, setWidth] = useState(null);

  window.addEventListener("load", () => {
    window.innerWidth >= 768 ? setWidth("Medium") : "";
  });

  window.addEventListener("resize", () => {
    if (width === "Medium" && window.innerWidth >= 768) return;
    if (width === "Medium" && window.innerWidth <= 768) setWidth(null);
    if (!width && window.innerWidth <= 768) return;
    if (!width && window.innerWidth >= 768) setWidth("Medium");
  });

  const { getSearchValue } = useContext(SearchContext);

  const onSearchChangeHandler = (e) => {
    setSearchInputValue(e.target.value);
  };

  const toggleSearchHandler = useCallback(() => {
    setSearchIsShown((prev) => !prev);
  });

  const onFormSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (searchInputValue === "") return;

      getSearchValue(searchInputValue);
      setSearchInputValue("");
      toggleSearchHandler();
    },
    [searchInputValue, getSearchValue, toggleSearchHandler]
  );

  return {
    width,
    searchInputValue,
    searchIsShown,
    onSearchChangeHandler,
    onFormSubmitHandler,
    toggleSearchHandler,
  };
};

export default NavigationLogic;
