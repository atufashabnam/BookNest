package com.booknestapp.booknestbe.service;


import com.booknestapp.booknestbe.Dto.BookWithReviewDto;
import com.booknestapp.booknestbe.Dto.ReviewDto;
import com.booknestapp.booknestbe.model.Book;
import com.booknestapp.booknestbe.model.Review;
import com.booknestapp.booknestbe.repository.BookRepository;
import com.booknestapp.booknestbe.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public BookService(BookRepository bookRepository, ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book getBookById(String bookId) throws NotFoundException {
        return bookRepository.findById(bookId).orElseThrow(NotFoundException::new);
    }

    public Review updateReview(Book book, ReviewDto reviewDto) {
        Review existingReview = book.getReview();
        if (existingReview != null) {
            if (reviewDto != null && reviewDto.rating() > 0) {
                existingReview.setRating(reviewDto.rating());
            }
            if (reviewDto != null && reviewDto.status() != null && reviewDto.status().length() > 0) {
                existingReview.setStatus(reviewDto.status());
            }
            if (reviewDto != null && reviewDto.notes() != null && reviewDto.notes().length() > 0) {
                existingReview.setNotes(reviewDto.notes());
            }
            return reviewRepository.save(existingReview);
        } else {
            Review newReview = new Review(
                    reviewDto.rating(), reviewDto.status(), reviewDto.notes(), book);
            book.setReview(newReview);
            Review savedReview = reviewRepository.save(newReview);
            bookRepository.save(book);
            return savedReview;
        }
    }


    public boolean deleteBook(String id) throws NotFoundException {
        Book book = bookRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        Review review = book.getReview();
        if (review != null) {
            reviewRepository.delete(review);
        }
        bookRepository.delete(book);
        return true;
    }

    public List<BookWithReviewDto> getAllBooksWithReviews() {
        List<Book> books = bookRepository.findAll();
        List<BookWithReviewDto> bookWithReviews = new ArrayList<>();

        for (Book book : books) {
            BookWithReviewDto bookWithReview = null;
            if (book.getReview() != null) {
                ReviewDto reviewDto = new ReviewDto(
                        book.getReview().getRating(),
                        book.getReview().getStatus(),
                        book.getReview().getNotes(),
                        book.getReview().getId());
                bookWithReview = new BookWithReviewDto(
                        book.getId(),
                        book.getTitle(),
                        book.getAuthor(),
                        book.getCategories(),
                        book.getImageLinks(),
                        book.getDescription(),
                        reviewDto);
            }else{
                bookWithReview = new BookWithReviewDto(
                        book.getId(),
                        book.getTitle(),
                        book.getAuthor(),
                        book.getCategories(),
                        book.getImageLinks(),
                        book.getDescription(),
                        null);
            }
            bookWithReviews.add(bookWithReview);
        }
        return bookWithReviews;
    }
}

