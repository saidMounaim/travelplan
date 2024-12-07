import React from "react";

const SkeletonCard = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
};

export default SkeletonCard;
