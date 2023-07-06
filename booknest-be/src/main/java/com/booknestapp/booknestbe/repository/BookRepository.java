package com.booknestapp.booknestbe.repository;

import com.booknestapp.booknestbe.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
}

