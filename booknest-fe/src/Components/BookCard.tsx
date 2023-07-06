import React from 'react';
import StarRating from './StarRating';
import './BookCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatusDropdown from './StatusDropdown';
import { BookDTO } from './interfaces';
import DeleteBook from './DeleteBook';
import Note from './Note';

interface BookCardProps {
  book: BookDTO;
  setSelectedBooks: React.Dispatch<React.SetStateAction<BookDTO[]>>;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  setSelectedBooks,
}) => {
  return (
    <div className="book-card">
      <div key={book.id} className="book">
        <div className="book-details">
          <h3>{book.title}</h3>
          <p>{book.authors}</p>
          <img src={book.imageLinks} alt={book.title} />
          <StarRating
            bookId={book.id}
            setSelectedBooks={setSelectedBooks}
            starRating={book.review ? book.review.rating : 0}
          />
          <StatusDropdown book={book} setSelectedBooks={setSelectedBooks} />
        </div>
        <div className="icons-row">
          <Note book={book} setSelectedBooks={setSelectedBooks} />
          <DeleteBook bookId={book.id} setSelectedBooks={setSelectedBooks} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;