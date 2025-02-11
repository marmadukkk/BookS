import React from 'react';

// Компонент SearchForm принимает пропсы:
// - query: текущее значение поискового запроса
// - setQuery: функция для обновления состояния query
// - category: текущая выбранная категория
// - setCategory: функция для обновления состояния category
// - sortOption: текущий выбранный параметр сортировки
// - setSortOption: функция для обновления состояния sortOption
// - onSearch: функция, вызываемая при отправке формы поиска
const SearchForm = ({ query, setQuery, category, setCategory, sortOption, setSortOption, onSearch }) => {
  return (
    <div className="search-container">
      {/* Форма для поиска */}
      <form onSubmit={onSearch} className="search-box">
        {/* Поле ввода для поискового запроса */}
        <input
          type="text"
          value={query} // Текущее значение запроса
          onChange={(e) => setQuery(e.target.value)} // Обновление состояния query при изменении текста
          placeholder="Search for books..." // Подсказка в поле ввода
        />
        {/* Кнопка для отправки формы */}
        <button type="submit" className="search-button">
          {/* Иконка лупы (SVG) */}
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </form>

      {/* Блок фильтров (категории и сортировка) */}
      <div className="filters">
        {/* Группа фильтра по категориям */}
        <div className="filter-group">
          <label>Categories</label>
          {/* Выпадающий список для выбора категории */}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
        </div>

        {/* Группа фильтра по сортировке */}
        <div className="filter-group">
          <label>Sorting by</label>
          {/* Выпадающий список для выбора сортировки */}
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="relevance">relevance</option> {/* Сортировка по релевантности */}
            <option value="date">date</option> {/* Сортировка по дате */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;