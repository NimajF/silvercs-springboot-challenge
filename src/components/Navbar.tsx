import { useState } from "react";
import FormModal from "./FormModal";
import { useUpdateList } from "../context/BookContext";

export default function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { setUpdateList } = useUpdateList();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <nav className="bg-transparent h-16">
      {isModalOpen ? (
        <FormModal onClose={handleCloseModal} updateList={setUpdateList} />
      ) : null}
      <div className="text-sm container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-slate-400 text-2xl font-bold uppercase">
          Silver Custom Software
        </div>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={handleOpenModal}
              className="bg-sky-600 p-3 rounded-md transition-all hover:shadow-lg hover:shadow-sky-800 hover:bg-sky-600 hover:border-transparent"
            >
              Add Book
            </button>
          </li>
          <li>
            <button className="hover:text-blue-400 transition p-3">
              Books
            </button>
          </li>
          <li>
            <button className="hover:text-blue-400 transition p-3">
              About
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
