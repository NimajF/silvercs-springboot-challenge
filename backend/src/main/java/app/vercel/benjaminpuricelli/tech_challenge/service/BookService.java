package app.vercel.benjaminpuricelli.tech_challenge.service;

import app.vercel.benjaminpuricelli.tech_challenge.entity.Book;
import app.vercel.benjaminpuricelli.tech_challenge.repository.BookRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepo repository;

    public BookService(BookRepo repository) {
        this.repository = repository;
    }

    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return repository.findById(id);
    }

    public Book saveBook(Book book) {
        return repository.save(book);
    }

    public void deleteBook(Long id) {
        repository.deleteById(id);
    }

    public void deleteAllBooks() {
        repository.deleteAll();
    }
}
