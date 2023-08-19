// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './BookList.css'; // Import your CSS file

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
    <Container>
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">
        {books.map((book: any) => (
          <div key={book.id} className="col mb-4">
            <Card className="h-100 shadow">
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '100%',
                  overflow: 'hidden',
                }}
              >
                <Card.Img
                  variant="top"
                  src={book.covers.M}
                  alt={book.title}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author_name}</Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Button variant="secondary" size="sm">
                    EDIT
                  </Button>
                  <Button variant="danger" size="sm">
                    DELETE
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BookList;
