import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../types/book";
import BookCard from "./BookCard";
import FormEditModal from "./FormEditModal";
import { useUpdateList } from "../context/BookContext";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isModalOpen && (
        <FormEditModal book={bookToEdit as Book} onClose={handleCloseModal} />
      )}

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-5 text-4xl font-bold text-center text-gray-200 mb-6"
      >
        Search the best Programming Books!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="w-2/3 py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {books.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                duration: 0.4,
                delay: 1 + idx * 0.1,
              }}
            >
              <BookCard book={book} openModal={() => handleOpenModal(book)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
