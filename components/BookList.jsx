import React from 'react';
import BookCard from './BookCard'; // Импорт компонента BookCard для отображения отдельной книги

// Компонент BookList принимает два пропса:
// - books: массив книг, которые нужно отобразить
// - onBookSelect: функция, которая вызывается при выборе книги (передается в BookCard)
const BookList = ({ books, onBookSelect }) => {
  return (
    // Контейнер для сетки книг
    <div className="books-grid">
      {/* Проходим по массиву книг и создаем компонент BookCard для каждой книги */}
      {books.map((book) => (
        <BookCard
          key={book.id} // Уникальный ключ для каждого элемента списка
          book={book} // Передача данных о книге в компонент BookCard
          onBookSelect={onBookSelect} // Передача функции выбора книги
        />
      ))}
    </div>
  );
};

export default BookList;