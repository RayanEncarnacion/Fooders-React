import classes from "./Recipes.module.css";
import RecipeItem from "./RecipeItem";
import { useContext, useEffect } from "react";
import { SearchContext } from "../store/search-store";

const Recipes = () => {
  const {
    searchValue,
    searchedRecipes,
    updateSearchedRecipes,
    updateRecipeDetails,
  } = useContext(SearchContext);

  useEffect(() => {
    const getData = async () => {
      if (searchValue === "") return;
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}&key=eb36ee90-27f2-4bc7-8328-5922dec6e06b`
        );

        if (!response.ok) {
          updateSearchedRecipes([]);
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        updateSearchedRecipes(data.data.recipes);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [searchValue]);

  const getRecipeDetails = async (id) => {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();
    updateRecipeDetails(data.data.recipe);
  };

  return (
    <main className={classes.recipes}>
      {searchedRecipes.length > 0 &&
        searchedRecipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            title={recipe.title}
            img={recipe.image_url}
            publisher={recipe.publisher}
            onClick={getRecipeDetails.bind(null, recipe.id)}
          />
        ))}
      {searchedRecipes.length <= 0 && (
        <p className={classes["no-recipes"]}>No recipes has been found!</p>
      )}
    </main>
  );
};
export default Recipes;
