import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onBookSelect }) => {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onBookSelect={onBookSelect} />
      ))}
    </div>
  );
};

export default BookList;