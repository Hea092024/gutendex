import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-page">
      <h2>Your Favorite Books</h2>

      {favorites.length === 0 && (
        <p className="no-favorites">
          You haven't added any favorites yet.
          <Link to="/" className="browse-link">
            Browse Books
          </Link>
        </p>
      )}

      <div className="books-grid">
        {favorites.map((book) => (
          <div key={book.id} className="favorite-book-card">
            <Link to={`/book/${book.id}`} className="book-link">
              {book.formats && book.formats["image/jpeg"] && (
                <img
                  src={book.formats["image/jpeg"]}
                  alt={`Cover for ${book.title}`}
                  className="book-cover"
                />
              )}
              <h3 className="book-title">{book.title}</h3>
              {book.authors && book.authors.length > 0 && (
                <p className="book-author">{book.authors[0].name}</p>
              )}
            </Link>
            <button
              onClick={() => removeFavorite(book.id)}
              className="remove-favorite"
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
