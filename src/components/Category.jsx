import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Category() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { topic } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const url = `https://gutendex.com/books/?topic=${encodeURIComponent(
          topic
        )}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        setBooks((prevBooks) =>
          page === 1 ? data.results : [...prevBooks, ...data.results]
        );
        setHasMore(data.next !== null);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [topic, page]);

  return (
    <div className="category-page">
      <h2>{topic.charAt(0).toUpperCase() + topic.slice(1)} Books</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="books-grid">
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id} className="book-card">
            {book.formats["image/jpeg"] && (
              <img
                src={book.formats["image/jpeg"]}
                alt={`Cover for ${book.title}`}
                className="book-cover"
              />
            )}
            <h3 className="book-title">{book.title}</h3>
            {book.authors.length > 0 && (
              <p className="book-author">{book.authors[0].name}</p>
            )}
          </Link>
        ))}
      </div>

      {loading && <div className="loading">Loading books...</div>}
      {hasMore && !loading && (
        <button onClick={() => setPage((p) => p + 1)} className="load-more">
          Load More Books
        </button>
      )}
      {!hasMore && books.length > 0 && (
        <p className="no-more">No more books to load</p>
      )}
      {!loading && books.length === 0 && (
        <p className="no-results">No books found in this category.</p>
      )}
    </div>
  );
}
