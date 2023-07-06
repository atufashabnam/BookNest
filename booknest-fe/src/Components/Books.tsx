import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import { BookDTO, Book } from './interfaces';
import { AiOutlineSearch } from 'react-icons/ai';

function Books(): JSX.Element {
  const APPLICATION_URL = "http://localhost:3000/api/books";
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<BookDTO[]>([]);
  const [dropDownMenu, setDropDownMenu] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios
          .get(APPLICATION_URL,
            {
              headers: {
                "Content-Type": "application/json"
              }
            });
        if (response.data && response.data) {
          setSelectedBooks(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    try {
      const response = await axios.get<{ items: Book[] }>(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCOHP9K6XpLSz_fAhg5jXZfylBnvTcd2AQ`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropDownChange = () => {
    setDropDownMenu(true);
  };

  const addBookToMain = async (book: Book) => {
    setDropDownMenu(false);
    const requestObj: BookDTO = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors[0],
      categories: book.volumeInfo.categories?.[0] ?? '',
      imageLinks: book.volumeInfo.imageLinks?.thumbnail ?? '',
    }

    try {
      const response = await axios.post<BookDTO>(APPLICATION_URL, requestObj);
      if (response.status === 201) {
        const savedBook = response.data;
        setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, savedBook]);
        setQuery('');
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <>
      <div className='header-container'>
        <nav>
          <h1>Book Nest</h1>
        </nav>
        <div className="search-container">
          <button className="search-button"> <AiOutlineSearch />Search</button>
          <input
            type="text"
            value={query}
            onFocus={handleDropDownChange}
            onChange={handleSearch}
            className="search-input"
            placeholder="Search for books"
          />
          {dropDownMenu && (
            <div className="search-dropdown">
              {books.map((book) => (
                <div key={book.id} className="search-result">
                  <h2 className="title">{book.volumeInfo.title}</h2>
                  {book.volumeInfo.authors && (
                    <p className="authors">Author(s): {book.volumeInfo.authors.join(', ')}</p>
                  )}
                  <button onClick={() => addBookToMain(book)} className="add-button">Add</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedBooks.map((book) => (
        <div key={book.id}>
          <BookCard
            book={book}
            setSelectedBooks={setSelectedBooks}
          />
        </div>
      ))}:
    </>
  );
}

export default Books;
