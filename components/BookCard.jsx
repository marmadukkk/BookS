import React from 'react';

// Компонент BookCard принимает два пропса:
// - book: объект с данными о книге
// - onBookSelect: функция, вызываемая при клике на карточку книги
const BookCard = ({ book, onBookSelect }) => {
  // Извлекаем данные о книге из объекта book.volumeInfo
  const cover = book.volumeInfo.imageLinks?.thumbnail || ''; // Ссылка на обложку книги (если есть)
  const title = book.volumeInfo.title || 'No Title'; // Название книги (или заглушка, если нет данных)
  const authors = book.volumeInfo.authors?.join(', ') || 'Unknown Author'; // Авторы (или заглушка)
  const categories = book.volumeInfo.categories?.[0] || ''; // Первая категория книги (если есть)

  return (
    // Контейнер для карточки книги
    <div className="book-card" onClick={() => onBookSelect(book.id)}>
      {/* Обложка книги */}
      <img src={cover || "placeholder-image.jpg"} alt="cover" />

      {/* Блок с информацией о книге */}
      <div className="content">
        {/* Категория книги (если есть) */}
        {categories && <small>{categories}</small>}

        {/* Название книги */}
        <h3>{title}</h3>

        {/* Авторы книги */}
        <p>{authors}</p>
      </div>
    </div>
  );
};

export default BookCard;