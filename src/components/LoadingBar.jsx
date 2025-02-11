import React from 'react';

const LoadingBar = ({ isLoading }) => {
  return (
    <div className={`loading-bar ${isLoading ? 'active' : ''}`}>
      <div className="loading-bar-progress"></div>
    </div>
  );
};

export default LoadingBar;