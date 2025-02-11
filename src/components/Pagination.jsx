import React from 'react';

const Pagination = ({ totalItems, startIndex, maxResults, onPageChange }) => {
  const handlePrevious = () => {
    onPageChange(startIndex - maxResults);
  };

  const handleNext = () => {
    onPageChange(startIndex + maxResults);
  };

  return (
    <div id="pagination">
      {startIndex > 0 && (
        <button onClick={handlePrevious}>Previous</button>
      )}
      {startIndex + maxResults < totalItems && (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
};

export default Pagination;