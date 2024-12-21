package app.vercel.benjaminpuricelli.tech_challenge.controller;

import app.vercel.benjaminpuricelli.tech_challenge.entity.Book;
import app.vercel.benjaminpuricelli.tech_challenge.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {
    private final BookService service;

    @Autowired
    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return service.getAllBooks();
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return service.saveBook(book);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        return service.getBookById(id)
                .map(existingBook -> {
                    existingBook.setTitle(updatedBook.getTitle());
                    existingBook.setAuthor(updatedBook.getAuthor());
                    existingBook.setIsbn(updatedBook.getIsbn());
                    existingBook.setPublishDate(updatedBook.getPublishDate());
                    existingBook.setImageFile(updatedBook.getImageFile());
                    return ResponseEntity.ok(service.saveBook(existingBook));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/delete/all")
    public void deleteAllBooks() {
        service.deleteAllBooks();
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
    }


}
