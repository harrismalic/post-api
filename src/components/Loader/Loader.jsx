import React from "react";

const Loader = ({ loader }) => {
  return (
    loader && (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    )
  );
};

export default Loader;
