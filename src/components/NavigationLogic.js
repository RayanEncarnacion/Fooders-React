import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavigationLogic = () => {
  const [searchIsShown, setSearchIsShown] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [renderSearchForm, setRenderSearchForm] = useState(true);

  const navigate = useNavigate();

  useEffect(() => console.log("Change form visibility!"), [renderSearchForm]);

  window.addEventListener("load", () => {
    window.innerWidth >= 768
      ? setRenderSearchForm(false)
      : setRenderSearchForm(true);
  });

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

      navigate(`/${searchInputValue}`);
      setSearchInputValue("");
      toggleSearchHandler();
    },
    [searchInputValue, toggleSearchHandler]
  );

  return {
    renderSearchForm,
    searchIsShown,
    searchInputValue,
    onSearchChangeHandler,
    onFormSubmitHandler,
    toggleSearchHandler,
  };
};

export default NavigationLogic;
