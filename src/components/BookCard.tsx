import { Book } from "../types/book";
import { MdEdit } from "react-icons/md";

interface BookCardProps {
  book: Book;
  openModal: () => void;
}

export default function BookCard({ book, openModal }: BookCardProps) {
  return (
    <div className="relative group w-full h-64 rounded-md overflow-hidden shadow-md hover:shadow-2xl hover:shadow-sky-900 transition-shadow duration-300">
      <img
        src={book.imageFile as string}
        alt={book.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute bottom-4 left-4 bg-slate-900 bg-opacity-80 text-white px-4 py-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        {" "}
        <p className="text-md text-slate-100 font-mono font-bolder">
          {book.title}
        </p>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <p className="text-sm mt-1">
          <span className="font-medium">By</span> {book.author}
        </p>
        <p className="text-sm mt-2 text-slate-300">
          <span className="font-medium">ISBN:</span> {book.isbn}
        </p>
        <p className="text-sm mt-1 text-slate-300">
          <span className="font-medium">Published Date:</span>{" "}
          {book.publishDate}
        </p>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="bg-sky-500 font-semibold text-white p-2 rounded-full hover:bg-sky-400"
          onClick={openModal}
        >
          <MdEdit size={16} />
        </button>
      </div>
    </div>
  );
}
