import React from 'react';

const BookCard = ({ book, onBookSelect }) => {
  const cover = book.volumeInfo.imageLinks?.thumbnail || '';
  const title = book.volumeInfo.title || 'No Title';
  const authors = book.volumeInfo.authors?.join(', ') || 'Unknown Author';
  const categories = book.volumeInfo.categories?.[0] || '';

  return (
    <div className="book-card" onClick={() => onBookSelect(book.id)}>
      <img src={cover || "placeholder-image.jpg"} alt="cover" />
      <div className="content">
        {categories && <small>{categories}</small>}
        <h3>{title}</h3>
        <p>{authors}</p>
      </div>
    </div>
  );
};

export default BookCard;