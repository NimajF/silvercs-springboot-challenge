import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../types/book";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8081/books");
        setBooks(response.data);
      } catch (err: any) {
        setError(err.message || "Error fetching books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            className="p-4 border rounded shadow-md bg-gray-50 hover:bg-gray-100"
          >
            <h2 className="font-semibold">{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Published Date: {book.publishDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
