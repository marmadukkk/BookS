import { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import LoadingBar from "./components/LoadingBar";
import Pagination from "./components/Pagination";

const API_TOKEN = "AIzaSyAeza6LN5uMwztmIVXSc7PUi5xOejhiNEw";

function App() {
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("relevance");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 30;

  const fetchBooks = async () => {
    if (!query) return;

    setIsLoading(true);
    try {
      const categoryQuery = category !== "all" ? `+subject:${category}` : "";
      const orderBy = sortOption === "date" ? "&orderBy=newest" : "";

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}${categoryQuery}` +
          `&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_TOKEN}${orderBy}`
      );

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      setTotalItems(data.totalItems || 0);
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setTotalItems(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (query) fetchBooks();
  }, [startIndex]);

  const handleSearch = (e) => {
    e.preventDefault();
    setStartIndex(0);
    fetchBooks();
  };

  const handleBookSelect = async (bookId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_TOKEN}`
      );
      const data = await response.json();
      setSelectedBook(data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>Search for books</h1>
        <SearchForm
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onSearch={handleSearch}
        />
      </header>

      <LoadingBar isLoading={isLoading} />

      <main>
        {selectedBook ? (
          <BookDetails
            book={selectedBook}
            onBack={() => setSelectedBook(null)}
          />
        ) : (
          <>
            <div className="results-count">
              {totalItems ? `Found ${totalItems} results` : "No results found"}
            </div>
            <BookList books={books} onBookSelect={handleBookSelect} />
            <Pagination
              totalItems={totalItems}
              startIndex={startIndex}
              maxResults={maxResults}
              onPageChange={setStartIndex}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
