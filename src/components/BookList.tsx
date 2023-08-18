// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const response = await fetchBooks();
      setBooks(response.data);
    };

    loadBooks();
  }, []);

  return (
    <div>
      {books.map((book: any) => (
        <div key={book.id}>
          <img src={book.covers.M} alt={book.title} />
          <h2>{book.title}</h2>
          <p>{book.author_name}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
