import React from 'react';
import { Form } from 'react-bootstrap';

import { BookDTO, ReviewDto } from './interfaces';
import axios from 'axios';

interface StatusDropdownProps {
  book: BookDTO,
  setSelectedBooks: (selectedBooks: BookDTO[]) => void;
}


const StatusDropdown: React.FC<StatusDropdownProps> = ({book,  setSelectedBooks}) => {

  const APPLICATION_URL = "http://localhost:3000/api/books";

  const updateStatus = async (bookId: string, newStatus: string) => {
    try {
      const url = `${APPLICATION_URL}/review/${bookId}`;
      const response = await axios.put<ReviewDto>(
        url.trim(),
        { status: newStatus }
      );

      if (response.status === 200) {
        const updatedReview = response.data;
        setSelectedBooks((prevSelectedBooks: BookDTO[]) =>
          prevSelectedBooks.map((book) => {
            if (book.review && book.review.id === updatedReview.id) {
              return {
                ...book,
                review: {
                  ...book.review,
                  status: updatedReview.status,
                }
              };
            }else if (!book.review) {
              return {
                ...book,
                review: {
                  status: updatedReview.status,
                  id: updatedReview.id,
                  rating: updatedReview.rating,
                  notes: updatedReview.notes
                }
              };
            }
            return book;
          }) as BookDTO[]
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  return (
    <Form.Control
              as="select"
              value={book.review?.status ?? ''}
              data-rating={book.review?.rating}
              onChange={(event) => updateStatus(book.id, event.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Read" defaultValue={book.review?.status === 'Read'}>
                Read
              </option>
              <option value="Unread" defaultValue={book.review?.status === 'Unread'}>
                Unread
              </option>
              <option value="Reading" defaultValue={book.review?.status === 'Reading'}>
                Reading
              </option>
            </Form.Control>
  );
};

export default StatusDropdown;
