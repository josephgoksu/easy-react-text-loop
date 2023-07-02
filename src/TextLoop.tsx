import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
  timeout?: number;
  animation?: "tween" | "spring" | "inertia" | "keyframes" | "just";
}

const variants = {
  enter: (direction) => {
    return {
      y: -20,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      opacity: 0,
    };
  },
};

const TextLoop: React.FC<Props> = ({ children, timeout = 2500, animation = "spring" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const texts = React.Children.toArray(children);
      let next = index + 1;
      if (next === texts.length) {
        next = 0;
      }
      setIndex(next);
    }, timeout);
  }, [index, children, timeout]);

  return (
    <AnimatePresence>
      <motion.span
        style={{ position: "absolute", marginLeft: "0.5rem", marginRight: "0.5rem" }}
        variants={variants}
        key={index}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          y: { type: animation, stiffness: 300, damping: 200 },
          opacity: { duration: 0.5 },
        }}
      >
        {" "}
        {children && React.Children.toArray(children)[index]}{" "}
      </motion.span>
    </AnimatePresence>
  );
};

export default TextLoop;
