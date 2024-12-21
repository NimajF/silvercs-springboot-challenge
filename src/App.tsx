import Navbar from "./components/Navbar";
import BooksList from "./components/BooksList";
import { UpdateListProvider } from "./context/BookContext";
import { motion } from "framer-motion";

function App() {
  return (
    <UpdateListProvider>
      <motion.div
        className="bg-custom-svg bg-fixed bg-no-repeat bg-cover min-h-screen text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />

        <motion.div
          className="flex flex-col items-center justify-center pt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="text-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.h1
              className="text-6xl p-2 font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Books Challenge!!
            </motion.h1>
            <motion.p
              className="text-lg mb-3 text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Welcome to the Books Management App! Easily keep track of your
              favorite books, their authors, and their details.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <BooksList />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </UpdateListProvider>
  );
}

export default App;
