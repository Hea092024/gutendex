import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  const categories = [
    "fiction",
    "mystery",
    "thriller",
    "romance",
    "fantasy",
    "morality",
    "society",
    "power",
    "justice",
    "adventure",
    "tragedy",
    "war",
    "philosophy",
  ];

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">Hector`s Book Haven</Link>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <Link to="/favorites" className="favorites-link">
          Favorites
        </Link>
      </div>
      <nav className="category-menu">
        {categories.map((category) => (
          <Link key={category} to={`/category/${category}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
