import React from "react";
import { motion } from "framer-motion";

const PageSelector = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <motion.button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="w-8 h-10 flex items-center justify-center hover:bg-balatro-redshadow bg-balatro-red pixel-corners-small shadow-red text-lg cursor-pointer text-white"
        disabled={currentPage === 1}
      >
        {"<"}
      </motion.button>
      <div className="px-8 py-2 text-xl bg-balatro-red pixel-corners-small shadow-red text-white">
        Page {currentPage}/{totalPages}
      </div>
      <motion.button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="w-8 h-10 flex items-center justify-center hover:bg-balatro-redshadow bg-balatro-red pixel-corners-small shadow-red text-lg cursor-pointer text-white"
        disabled={currentPage === totalPages}
      >
        {">"}
      </motion.button>
    </div>
  );
};

export default PageSelector;
