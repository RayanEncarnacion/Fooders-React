import Navigation from "./components/Navigation";
import RecipeDetails from "./components/RecipeDetails";
import Recipes from "./components/Recipes";
import { Route, Routes, Outlet } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "./store/search-store";

function App() {
  const { searchedRecipes, requestError } = useContext(SearchContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigation />
              {}
              {requestError && <h3 className="accent-text">{requestError}</h3>}
              {searchedRecipes.length === 0 && (
                <h3 className="accent-text">
                  Search for your favorite dish or ingredient!
                </h3>
              )}
              <Outlet />
            </>
          }
        >
          <Route path="/:food" element={<Recipes />}>
            <Route path=":id" element={<RecipeDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
