import { memo } from "react";
import { motion } from "framer-motion";
import classes from "./LinksList.module.css";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsBookmarkCheck } from "react-icons/bs";

const listVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.2 },
  },
};

const linkVariant = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const LinksList = ({ links, isOpen, className }) => {
  if (className !== "") {
    return (
      <ul className={`${classes["link-list"]} ${className}`}>
        {links.map((link) => {
          if (link.text.includes("ADD")) {
            return (
              <motion.a
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                key={Math.random()}
                href="/"
              >
                <RiFilePaper2Line /> {link.text}
              </motion.a>
            );
          }
          if (link.text.includes("BOOK")) {
            return (
              <motion.a
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                key={Math.random()}
                href="/"
              >
                <BsBookmarkCheck /> {link.text}
              </motion.a>
            );
          }
          return (
            <motion.a
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              key={Math.random()}
              href="/"
            >
              {link.text}
            </motion.a>
          );
        })}
      </ul>
    );
  }

  return (
    <motion.ul
      className={`${classes["link-list"]} ${className}`}
      animate={isOpen ? "visible" : "hidden"}
      variants={listVariants}
    >
      {links.map((link) => (
        <motion.a key={Math.random()} variants={linkVariant} href="/">
          {link.text}
        </motion.a>
      ))}
    </motion.ul>
  );
};
export default LinksList;
