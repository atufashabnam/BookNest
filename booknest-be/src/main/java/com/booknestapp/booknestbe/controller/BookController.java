package com.booknestapp.booknestbe.controller;

import com.booknestapp.booknestbe.Dto.BookWithReviewDto;
import com.booknestapp.booknestbe.Dto.ReviewDto;
import com.booknestapp.booknestbe.model.Book;
import com.booknestapp.booknestbe.model.Review;
import com.booknestapp.booknestbe.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<BookWithReviewDto>> getAllBooksWithReviews() {
        try {
            List<BookWithReviewDto> bookWithReviews = bookService.getAllBooksWithReviews();
            return ResponseEntity.ok(bookWithReviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        try {
            Book savedBook = bookService.addBook(book);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/review/{bookId}")
    public ResponseEntity<Review> updateReview(@PathVariable String bookId, @RequestBody ReviewDto reviewDto) {
        try {
            Book book = bookService.getBookById(bookId);
            if (book != null) {
                Review updatedReview = bookService.updateReview(book, reviewDto);
                return ResponseEntity.ok(updatedReview);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/status/{reviewId}")
    public ResponseEntity<Review> updateStatus(@PathVariable Long reviewId, @RequestParam String status) {
        try {
            Review review = bookService.getReviewById(reviewId);
            if (review != null) {
                Review savedReview = bookService.updateReviewStatus(review, status);
                return ResponseEntity.ok(savedReview);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/notes/{reviewId}")
    public ResponseEntity<Review> addNotes(@PathVariable Long reviewId, @RequestParam String notes) {
        try {
            Review review = bookService.getReviewById(reviewId);
            if (review != null) {
                Review savedReview = bookService.addReviewNotes(review, notes);
                return ResponseEntity.ok(savedReview);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBookAndNotes(@PathVariable("id") String id) {
        try {
            boolean deleted = bookService.deleteBook(id);
            if (deleted) {
                return ResponseEntity.ok("Book and notes deleted successfully.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) {
        try {
            boolean deleted = bookService.deleteReview(reviewId);
            if (deleted) {
                return ResponseEntity.ok("Review deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

