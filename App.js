import { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import LoadingBar from "./components/LoadingBar";
import Pagination from "./components/Pagination";

// API токен для доступа к Google Books API
const API_TOKEN = "AIzaSyAeza6LN5uMwztmIVXSc7PUi5xOejhiNEw";

function App() {
  // Состояния для управления данными и UI
  const [books, setBooks] = useState([]); // Список найденных книг
  const [totalItems, setTotalItems] = useState(0); // Общее количество найденных книг
  const [query, setQuery] = useState(""); // Поисковый запрос
  const [category, setCategory] = useState("all"); // Выбранная категория для фильтрации
  const [sortOption, setSortOption] = useState("relevance"); // Параметр сортировки (по релевантности или дате)
  const [selectedBook, setSelectedBook] = useState(null); // Выбранная книга для отображения деталей
  const [isLoading, setIsLoading] = useState(false); // Статус загрузки данных
  const [startIndex, setStartIndex] = useState(0); // Индекс начала выборки для пагинации
  const maxResults = 30; // Максимальное количество результатов на странице

  // Функция для запроса книг из API
  const fetchBooks = async () => {
    if (!query) return; // Если запрос пустой, ничего не делаем

    setIsLoading(true); // Включаем индикатор загрузки
    try {
      // Формируем запрос с учетом категории и сортировки
      const categoryQuery = category !== "all" ? `+subject:${category}` : "";
      const orderBy = sortOption === "date" ? "&orderBy=newest" : "";

      // Выполняем запрос к API
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}${categoryQuery}` +
          `&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_TOKEN}${orderBy}`
      );

      if (!response.ok) throw new Error("Request failed"); // Если запрос неудачный, выбрасываем ошибку

      // Обрабатываем ответ и обновляем состояние
      const data = await response.json();
      setTotalItems(data.totalItems || 0); // Общее количество найденных книг
      setBooks(data.items || []); // Список книг
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // В случае ошибки очищаем список книг
      setTotalItems(0); // И обнуляем общее количество
    }
    setIsLoading(false); // Выключаем индикатор загрузки
  };

  // Эффект для автоматического запроса книг при изменении startIndex (пагинация)
  useEffect(() => {
    if (query) fetchBooks();
  }, [startIndex]);

  // Обработчик поиска (вызывается при отправке формы)
  const handleSearch = (e) => {
    e.preventDefault();
    setStartIndex(0); // Сбрасываем пагинацию на первую страницу
    fetchBooks(); // Запрашиваем книги
  };

  // Обработчик выбора книги для отображения деталей
  const handleBookSelect = async (bookId) => {
    setIsLoading(true); // Включаем индикатор загрузки
    try {
      // Запрашиваем детали книги по её ID
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_TOKEN}`
      );
      const data = await response.json();
      setSelectedBook(data); // Обновляем состояние выбранной книги
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
    setIsLoading(false); // Выключаем индикатор загрузки
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>Search for books</h1>
        {/* Компонент формы поиска */}
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

      {/* Индикатор загрузки */}
      <LoadingBar isLoading={isLoading} />

      <main>
        {selectedBook ? (
          // Если выбрана книга, показываем её детали
          <BookDetails
            book={selectedBook}
            onBack={() => setSelectedBook(null)} // Обработчик возврата к списку книг
          />
        ) : (
          // Иначе показываем список книг и пагинацию
          <>
            <div className="results-count">
              {totalItems ? `Found ${totalItems} results` : "No results found"}
            </div>
            <BookList books={books} onBookSelect={handleBookSelect} />
            <Pagination
              totalItems={totalItems}
              startIndex={startIndex}
              maxResults={maxResults}
              onPageChange={setStartIndex} // Обработчик изменения страницы
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
