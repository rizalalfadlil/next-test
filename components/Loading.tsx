import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import React from "react";
export function Loading({}) {
  return (
    <motion.div
      className="size-max"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 1,
        ease: "circInOut",
        repeat: Infinity,
      }}
    >
      <LoaderCircle />
    </motion.div> 
  );
}
