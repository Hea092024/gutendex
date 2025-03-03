import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BookDetail() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        const data = await response.json();
        setBook(data);

        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(favorites.some((fav) => fav.id === parseInt(id)));
      } catch (err) {
        setError("Failed to fetch book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const toggleFavorite = () => {
    if (!book) return;

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const bookToSave = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        formats: book.formats,
        download_count: book.download_count,
      };
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, bookToSave])
      );
      setIsFavorite(true);
    }
  };

  if (loading) return <div className="loading">Loading book details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!book) return <div className="error-message">Book not found</div>;

  return (
    <div className="book-detail">
      <div className="book-info">
        <div className="book-cover-container">
          {book.formats["image/jpeg"] && (
            <img
              src={book.formats["image/jpeg"]}
              alt={`Cover for ${book.title}`}
              className="book-cover-large"
            />
          )}
        </div>

        <div className="book-text">
          <h1 className="book-title">{book.title}</h1>

          {book.authors.length > 0 && (
            <p className="book-author">
              <strong>Author:</strong>{" "}
              {book.authors.map((author) => author.name).join(", ")}
            </p>
          )}

          <p className="book-downloads">
            <strong>Downloads:</strong> {book.download_count.toLocaleString()}
          </p>

          {book.subjects && book.subjects.length > 0 && (
            <div className="book-categories">
              <strong>Categories:</strong>
              <ul>
                {book.subjects.slice(0, 5).map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>
          )}

          {book.languages && book.languages.length > 0 && (
            <p className="book-language">
              <strong>Language:</strong>{" "}
              {book.languages.map((lang) => lang.toUpperCase()).join(", ")}
            </p>
          )}

          <div className="book-links">
            <strong>Read Book:</strong>
            <div className="format-links">
              {book.formats["text/html"] && (
                <a
                  href={book.formats["text/html"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HTML
                </a>
              )}
              {book.formats["application/epub+zip"] && (
                <a
                  href={book.formats["application/epub+zip"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EPUB
                </a>
              )}
              {book.formats["text/plain"] && (
                <a
                  href={book.formats["text/plain"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plain Text
                </a>
              )}
              {book.formats["application/pdf"] && (
                <a
                  href={book.formats["application/pdf"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PDF
                </a>
              )}
            </div>
          </div>

          <button
            onClick={toggleFavorite}
            className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
