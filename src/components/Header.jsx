import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Hector's Book Haven</Link>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <nav className="nav">
        <div className="dropdown">
          <button className="dropdown-btn">Categories</button>
          <div className="dropdown-content">
            {categories.map((category) => (
              <Link key={category} to={`/category/${category.toLowerCase()}`}>
                {category}
              </Link>
            ))}
          </div>
        </div>
        <Link to="/favorites" className="favorites-link">
          Favorites
        </Link>
      </nav>
    </header>
  );
}
