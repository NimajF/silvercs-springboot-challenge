import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../types/book";
import BookCard from "./BookCard";
import FormEditModal from "./FormEditModal";
import { useUpdateList } from "../context/BookContext";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { updateList, setUpdateList } = useUpdateList();

  const handleOpenModal = (book: Book) => {
    setBookToEdit(book);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setBookToEdit(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (updateList) {
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
          setUpdateList(false);
        }
      };

      fetchBooks();
    }
  }, [updateList, setUpdateList]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8 px-4">
      {isModalOpen ? (
        <FormEditModal book={bookToEdit as Book} onClose={handleCloseModal} />
      ) : null}
      <h1 className="mt-5 text-4xl font-bold text-center text-gray-200 mb-6">
        Search the best Programming Books!
      </h1>
      <div className="w-2/3 py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            openModal={() => handleOpenModal(book)}
          />
        ))}
      </div>
    </div>
  );
}
