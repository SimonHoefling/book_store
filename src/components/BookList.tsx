// src/components/BookList.tsx
// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { fetchBooks, updateBook } from '../services/api'; // Replace with your actual API functions
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './BookList.css';

// Define the Book interface
interface Book {
  id: string;
  title: string;
  author_name: string;
  first_publish_year: number;
  number_of_pages_median: number;
  covers: {
    S: string;
    M: string;
    L: string;
  };
}

const BookList = () => {
  // State variables
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedAuthor, setEditedAuthor] = useState('');
  const [selectedFirstPublishYear, setSelectedFirstPublishYear] = useState<number>(0);
  const [selectedNumberOfPages, setSelectedNumberOfPages] = useState<number>(0);

  // Load books from API on sorted by title
  useEffect(() => {
    const loadBooks = async () => {
      const response = await fetchBooks();
      setBooks(response.data);
    };

    loadBooks();
  }, []);

  // Function to handle editing a book
  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setEditedTitle(book.title);
    setEditedAuthor(book.author_name);
    setSelectedFirstPublishYear(book.first_publish_year);
    setSelectedNumberOfPages(book.number_of_pages_median);
    setShowModal(true);
  };

  // Function to close the editing modal
  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  // Function to save changes made in the modal
  const handleSaveChanges = async () => {
    if (selectedBook) {
      const updatedBook: Book = {
        ...selectedBook,
        title: editedTitle,
        author_name: editedAuthor,
        first_publish_year: selectedFirstPublishYear,
        number_of_pages_median: selectedNumberOfPages,
      };
      // Replace with your API call to update the book
      await updateBook(selectedBook.id, updatedBook);

      // Update the books list with the updated book
      const updatedBooks = books.map((book) =>
        book.id === selectedBook.id ? updatedBook : book
      );
      setBooks(updatedBooks);

      // Close the modal
      handleCloseModal();
    }
  };

  return (
    <Container>
      {/* Display the list of books */}
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 mb-5">
        {books.map((book) => (
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
                <Card.Text>Year: {book.first_publish_year}</Card.Text>
                <Card.Text>Pages: {book.number_of_pages_median}</Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(book)}
                  >
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
      {/* Modal for editing a book */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for editing book details */}
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                value={editedAuthor}
                onChange={(e) => setEditedAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFirstPublishYear">
              <Form.Label>First Published Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter first published year"
                value={selectedFirstPublishYear}
                onChange={(e) => setSelectedFirstPublishYear(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formNumPagesMedian">
              <Form.Label>Number of Pages Median</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of pages median"
                value={selectedNumberOfPages}
                onChange={(e) => setSelectedNumberOfPages(parseInt(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookList;
