import classes from "./RecipeItem.module.css";
import { motion } from "framer-motion";

const hover = { scale: 1.03 };

const RecipeItem = ({ title, img, publisher, onClick }) => {
  return (
    <motion.div onClick={onClick} whileHover={hover} className={classes.recipe}>
      <img src={img} alt={`${title} image`} />
      <div>
        <h4 className="recipe-title">{title}</h4>
        <strong>{publisher}</strong>
      </div>
    </motion.div>
  );
};
export default RecipeItem;
