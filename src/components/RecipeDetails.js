import { useEffect, useState, useContext } from "react";
import classes from "./RecipeDetails.module.css";
import { MdOutlineTimer } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { SearchContext } from "../store/search-store";
const buttonVariants = {
  initial: { scale: 1 },
  animate: { scale: 1.05 },
};

const getData = async (id, setFunction, errorFunction) => {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    if (
      response.status === 400 ||
      response.status === 404 ||
      response.status === "fail"
    ) {
      errorFunction(`No recipe details found with the provided ID: ${id}.`);
      setFunction(null);
      throw new Error(
        `Status ${response.status} due to invalid recipe id: ${id}`
      );
      return;
    }

    if (response.status === 429) {
      errorFunction(
        "No more requests allowed!... Feel free to try again in an hour."
      );
      setFunction(null);
      return;
    }

    const { data } = await response.json();
    setFunction(data.recipe);
  } catch (error) {
    console.error(error);
  }
};

// COMPONENT
const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState(null);

  const { setRequestError } = useContext(SearchContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const closeDetailsAndUpdateURL = () => {
    setRecipeDetails(null);
  };

  useEffect(() => {
    getData(id, setRecipeDetails, setRequestError);
  }, [id]);

  return (
    <>
      {recipeDetails ? (
        <div className={classes["recipe-details"]}>
          <motion.button
            onClick={closeDetailsAndUpdateURL}
            initial="initial"
            whileHover="animate"
            variants={buttonVariants}
            className={classes.close}
          >
            <AiOutlineClose />
          </motion.button>
          <img
            src={recipeDetails.image_url}
            alt={`${recipeDetails.title} image`}
          />
          <h2 className={classes["recipe-title"]}>{recipeDetails.title}</h2>
          <strong>{recipeDetails.publisher}</strong>
          <div className={classes["cooking-details"]}>
            <p>
              <MdOutlineTimer /> {recipeDetails.cooking_time} Minutes
            </p>
            <p>
              <BsPeople />
              {recipeDetails.servings} Servings
            </p>
          </div>
          <div className={classes["ingredients-container"]}>
            <h3>Recipe Ingredients</h3>
            <ul className={classes["ingredients-list"]}>
              {recipeDetails.ingredients.map((ing) => (
                <li key={Math.random()}>
                  <p>
                    <AiOutlineCheck />
                    {`${ing.quantity} ${ing.unit} ${ing.description}`}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes["how-to-cook"]}>
            <h3>How To Cook It</h3>
            <p>{`This recipe was carefully designed and tested by ${recipeDetails.publisher}. Please check out directions at their website. `}</p>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={recipeDetails.source_url}
            >
              Details <BsFillArrowRightCircleFill />
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default RecipeDetails;
