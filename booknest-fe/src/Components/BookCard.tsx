import React, { useState } from 'react';
import StarRating from './StarRating';
import './BookCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiStickyNoteLine } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';
import StatusDropdown from './StatusDropdown';
import { BookDTO} from './interfaces';
import NotesModal from './NotesModal';

interface BookCardProps {
  books: BookDTO[];
  updateNotes: (bookId: string, newNotes: string) => void;
  setSelectedBooks: (selectedBooks: BookDTO[]) => void;
  deleteBook: (bookId: string) => void;
}


const BookCard: React.FC<BookCardProps> = ({
  books,
  updateNotes,
  setSelectedBooks,
  deleteBook,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [notes, setNotes] = useState<{ [id: string]: string }>({});

  const handleAddNote = (id: string) => {
    setSelectedBookId(id);
    const selectedBook = books.find((book) => book.id === id);

    if (selectedBook && selectedBook.review) {
      const { notes } = selectedBook.review;
      setNotes((prevNotes) => {
        const newNotes = Object.assign({}, prevNotes);
        newNotes[id] = notes;
        return newNotes;
      });
    }
    setShowModal(true);
  };

  
  return (
    <div className="book-card">
      {books.map((book) => (
        <div key={book.id} className="book">
          <div className="book-details">
            <h3>{book.title}</h3>
            <p>{book.authors}</p>
            {book.description && <p>Description: {book.description}</p>}
            <img src={book.imageLinks} alt={book.title} />
            <StarRating
              bookId={book.id}
              setSelectedBooks={setSelectedBooks}
              starRating={book.review ? book.review.rating : 0}
            />
            <StatusDropdown book={book} setSelectedBooks={setSelectedBooks} />

          </div>
          <div className="icons-row">
            <RiStickyNoteLine className="notes-icon"
              onClick={() => handleAddNote(book.id)} size={30}/>
            <AiOutlineDelete className="delete-icon"
              onClick={() => deleteBook(book.id)} size={30}/>
          </div>
        </div>
      ))}
      <NotesModal
       show={showModal}
       onClose={() => setShowModal(false)}
       onSave={() => {
         updateNotes(selectedBookId, notes[selectedBookId] || '');
         setShowModal(false);
       }}
       value={notes[selectedBookId] || ''}
       onChange={(value) => setNotes({ ...notes, [selectedBookId]: value })}
       title="Add Notes"
       />
    </div>
  );
};

export default BookCard;