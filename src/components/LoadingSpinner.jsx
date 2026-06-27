"use client";
import { BounceLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-100 w-full">
      <BounceLoader 
        color="#7c3aed" 
        size={80} 
      />
    </div>
  );
};

export default LoadingSpinner;