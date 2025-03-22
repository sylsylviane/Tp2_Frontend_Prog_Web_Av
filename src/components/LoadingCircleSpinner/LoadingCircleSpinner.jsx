"use client";
import "./LoadingCircleSpinner.css";
import { motion } from "motion/react";

function LoadingCircleSpinner() {
  return (
    <div className="container">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default LoadingCircleSpinner;
  
// REFERENCE: https://examples.motion.dev/react/loading-circle-spinner