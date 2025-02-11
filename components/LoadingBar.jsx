import React from 'react';

// Компонент LoadingBar принимает пропс:
// - isLoading: булевое значение, указывающее, активен ли процесс загрузки
const LoadingBar = ({ isLoading }) => {
  return (
    // Контейнер для индикатора загрузки
    <div className={`loading-bar ${isLoading ? 'active' : ''}`}>
      {/* Полоса прогресса загрузки */}
      <div className="loading-bar-progress"></div>
    </div>
  );
};

export default LoadingBar;