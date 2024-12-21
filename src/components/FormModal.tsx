import { useState } from "react";
import { Book } from "../types/book";
import axios from "axios";
import formValidator from "../utils/formValidator";
import { uploadImage } from "../utils/imageHandler";
import { motion } from "framer-motion";

interface ModalProps {
  onClose: () => void;
  updateList: (value: boolean) => void;
}

export default function FormModal({ onClose, updateList }: ModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishDate: "",
    imageFile: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState(formData.imageFile || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validationErrors = formValidator(formData as Book);
      setErrors(errors);
      if (Object.keys(validationErrors).length === 0) {
        const img = await uploadImage(formData.imageFile as File);
        const bookData = { ...formData, imageFile: img };
        await axios.post("http://localhost:8081/books", bookData);
        alert("Book added successfully!");
        setFormData({
          title: "",
          author: "",
          isbn: "",
          publishDate: "",
          imageFile: null as File | null,
        });
        onClose();
        updateList(true);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="bg-slate-800 border border-slate-800 backdrop-blur-md bg-opacity-60 rounded-lg shadow-lg p-8 w-1/3 max-lg:w-2/3 max-sm:w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-slate-100">
          Create a New Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
              className="text-sm w-full p-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-sky-300"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleChange}
              className="text-sm w-full p-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-sky-300"
            />
            {errors.author && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={handleChange}
              className="text-sm w-full p-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-sky-300"
            />
            {errors.isbn && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className="text-sm w-full p-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-sky-300"
            />
            {errors.publishDate && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-72 mb-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              Selecciona una Imágen
              {formData.imageFile || previewImage ? (
                <img
                  src={previewImage as string}
                  alt="Foto de perfil del camarero"
                  height={100}
                  width={100}
                  className="rounded-md mt-2"
                />
              ) : (
                ""
              )}
              <div className="flex flex-col items-center justify-center pt-2 pb-2">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click subir una imágen</span>{" "}
                  o arrastra
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG
                </p>
              </div>
              <input
                id="dropzone-file"
                name="imageFile"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
            >
              Discard
            </button>
            <button
              type="submit"
              className="text-sm px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-500 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
