import classes from "./Search.module.css";
import { motion } from "framer-motion";
import SearchForm from "./SearchForm";

const searchVariants = {
  visible: { x: 0, opacity: 1 },
  hidden: {
    x: "105%",
    opacity: 0,
  },
};

const Search = ({ isOpen, searchValue, keywords, onChange, onSubmit }) => {
  return (
    <motion.div
      className={classes.search}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      variants={searchVariants}
    >
      <SearchForm
        keywords={keywords}
        keywordsClass={classes.keywords}
        searchValue={searchValue}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </motion.div>
  );
};
export default Search;
