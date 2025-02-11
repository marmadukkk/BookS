import React from 'react';

const BookDetails = ({ book, onBack }) => {
  const vol = book.volumeInfo;
  const cover = vol.imageLinks?.thumbnail || '';
  const title = vol.title || 'No Title';
  const authors = vol.authors?.join(', ') || 'Unknown Author';
  const description = vol.description || 'No description available';
  const publishedDate = vol.publishedDate || 'Unknown Date';
  const publisher = vol.publisher || 'Unknown Publisher';
  const pageCount = vol.pageCount || 'Unknown';
  const categories = vol.categories?.join(' / ') || 'No categories listed';

  return (
    <div className="full-book-view">
      <img src={cover} alt="cover" />
      <div className="book-details">
        <small>{categories}</small>
        <h2>{title}</h2>
        <p>{authors}</p>
        <p><strong>Publisher:</strong> {publisher}</p>
        <p><strong>Published Date:</strong> {publishedDate}</p>
        <p><strong>Page Count:</strong> {pageCount}</p>
        <div className="description">
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
        <button className="backtosearch" onClick={onBack}>Back to Search</button>
      </div>
    </div>
  );
};

export default BookDetails;