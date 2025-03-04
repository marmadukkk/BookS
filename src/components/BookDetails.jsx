import React from 'react';

// Компонент BookDetails принимает два пропса:
// - book: объект с данными о книге
// - onBack: функция, вызываемая при нажатии кнопки "Back to Search"
const BookDetails = ({ book, onBack }) => {
  // Извлекаем данные о книге из объекта book.volumeInfo
  const vol = book.volumeInfo;
  const cover = vol.imageLinks?.thumbnail || ''; // Ссылка на обложку книги (если есть)
  const title = vol.title || 'No Title'; // Название книги (или заглушка, если нет данных)
  const authors = vol.authors?.join(', ') || 'Unknown Author'; // Авторы (или заглушка)
  const description = vol.description || 'No description available'; // Описание (или заглушка)
  const publishedDate = vol.publishedDate || 'Unknown Date'; // Дата публикации (или заглушка)
  const publisher = vol.publisher || 'Unknown Publisher'; // Издатель (или заглушка)
  const pageCount = vol.pageCount || 'Unknown'; // Количество страниц (или заглушка)
  const categories = vol.categories?.join(' / ') || 'No categories listed'; // Категории (или заглушка)

  return (
    // Контейнер для отображения деталей книги
    <div className="full-book-view">
      {/* Обложка книги */}
      <img src={cover} alt="cover" />

      {/* Блок с деталями книги */}
      <div className="book-details">
        {/* Категории книги */}
        <small>{categories}</small>

        {/* Название книги */}
        <h2>{title}</h2>

        {/* Авторы книги */}
        <p>{authors}</p>

        {/* Издатель */}
        <p><strong>Publisher:</strong> {publisher}</p>

        {/* Дата публикации */}
        <p><strong>Published Date:</strong> {publishedDate}</p>

        {/* Количество страниц */}
        <p><strong>Page Count:</strong> {pageCount}</p>

        {/* Описание книги */}
        <div className="description">
          <h3>Description:</h3>
          <p>{description}</p>
        </div>

        {/* Кнопка для возврата к поиску */}
        <button className="backtosearch" onClick={onBack}>Back to Search</button>
      </div>
    </div>
  );
};

export default BookDetails;