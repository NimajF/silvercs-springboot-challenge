package app.vercel.benjaminpuricelli.tech_challenge.repository;

import app.vercel.benjaminpuricelli.tech_challenge.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends JpaRepository<Book, Long> {

}
