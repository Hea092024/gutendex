import { useParams } from "react-router-dom";
import BookList from "./BookList"; 

export default function Category() {
  const { topic } = useParams();

  return (
    <div className="category-page">
      <h2>{topic.charAt(0).toUpperCase() + topic.slice(1)} Books</h2>
      <BookList searchTerm={topic} />{" "}
      
    </div>
  );
}
