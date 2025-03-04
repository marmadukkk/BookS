import React from 'react';

// Компонент Pagination принимает пропсы:
// - totalItems: общее количество найденных элементов (книг)
// - startIndex: индекс первого элемента на текущей странице
// - maxResults: максимальное количество элементов на одной странице
// - onPageChange: функция, вызываемая при изменении страницы (принимает новый startIndex)
const Pagination = ({ totalItems, startIndex, maxResults, onPageChange }) => {
  // Обработчик для перехода на предыдущую страницу
  const handlePrevious = () => {
    onPageChange(startIndex - maxResults); // Уменьшаем startIndex на maxResults
  };

  // Обработчик для перехода на следующую страницу
  const handleNext = () => {
    onPageChange(startIndex + maxResults); // Увеличиваем startIndex на maxResults
  };

  return (
    <div id="pagination">
      {/* Кнопка "Previous" отображается, если текущая страница не первая */}
      {startIndex > 0 && (
        <button onClick={handlePrevious}>Previous</button>
      )}

      {/* Кнопка "Next" отображается, если есть еще элементы на следующей странице */}
      {startIndex + maxResults < totalItems && (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
};

export default Pagination;