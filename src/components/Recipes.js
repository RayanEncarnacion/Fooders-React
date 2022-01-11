import classes from "./Recipes.module.css";
import RecipeItem from "./RecipeItem";
import { useContext, useEffect } from "react";
import { SearchContext } from "../store/search-store";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const API_KEY = "edf1bef9-8bbf-4494-a57e-4a68736fb1fb";

const getData = async (
  URLParam = "",
  key,
  updateDetails,
  setRequestError,
  updateSearchedRecipes
) => {
  if (!URLParam) return;
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${URLParam}&key=${key}`
    );
    updateDetails(null);
    if (response.status === 429) {
      setRequestError(
        "No more requests allowed!... Feel free to try again in an hour."
      );
      throw new Error("Exceeded request per hour. Try again later!");
    }

    if (!response.ok) {
      setRequestError("Something went wrong with your request!");
      throw new Error("Something went wrong with your request!");
    }

    const data = await response.json();

    if (data.results === 0) {
      setRequestError("No recipes were found with that name!");
      updateSearchedRecipes([]);
      return;
    }

    setRequestError("");
    updateSearchedRecipes(data.data.recipes);
  } catch (error) {
    console.error(error);
  }
};

const Recipes = () => {
  const {
    searchedRecipes,
    updateSearchedRecipes,
    updateRecipeDetails,
    setRequestError,
  } = useContext(SearchContext);

  const { food } = useParams();

  const navigate = useNavigate();

  const addIdToURL = (id) => {
    navigate(`/${food}/${id}`);
    document.getElementById("top").scrollIntoView();
  };

  useEffect(() => {
    getData(
      food,
      API_KEY,
      updateRecipeDetails,
      setRequestError,
      updateSearchedRecipes
    );
  }, [food]);

  return (
    <>
      <Outlet />
      <main className={classes.recipes}>
        {searchedRecipes.length > 0 &&
          searchedRecipes.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              title={recipe.title}
              img={recipe.image_url}
              publisher={recipe.publisher}
              onClick={addIdToURL.bind(null, recipe.id)}
            />
          ))}
      </main>
    </>
  );
};
export default Recipes;
