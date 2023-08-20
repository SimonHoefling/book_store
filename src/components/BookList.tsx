// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { fetchBooks, updateBook, deleteBook, createBook } from '../services/api'; // Update import to include createBook
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedAuthor, setEditedAuthor] = useState('');
  const [selectedFirstPublishYear, setSelectedFirstPublishYear] = useState<number>(0);
  const [selectedNumberOfPages, setSelectedNumberOfPages] = useState<number>(0);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author_name: '',
    first_publish_year: 0,
    number_of_pages_median: 0,
  });

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

  // Function to add a new book
  const handleAddBook = async () => {
    // Replace with your API call to create a new book
    const response = await createBook(newBook);

    // Update the books list with the new book
    setBooks([...books, response.data]);

    // Close the modal
    handleCloseModal();
  };

  return (
    <Container>
      <h4
        className="text-secondary mb-4"
        onClick={() => {
          // Clear previous new book data (is needed when adding a new )
          setNewBook({
            title: '',
            author_name: '',
            first_publish_year: 0,
            number_of_pages_median: 0,
          });
          // Open the modal for adding a new book
          setShowModal(true);
        }}
        style={{ cursor: 'pointer' }}
      >
        <FontAwesomeIcon icon={faBook} /> Add book
      </h4>
      {/* Display the list of books */}
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 mb-5">
        {books.map((book) => (
          <div key={book.id} className="col mb-4">
            <Card className="h-100 shadow">
              <div style={{
                position: 'relative',
                paddingBottom: '100%',
                overflow: 'hidden'
                }}>
                {book.covers && book.covers.M ? (
                  <Card.Img
                    variant="top"
                    src={book.covers.M}
                    alt={book.title}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                  />
                ) : null}
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
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setBookToDelete(book);
                      setShowDeleteConfirmation(true);
                    }}
                  >
                    DELETE
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {/* Modal for editing or adding a book */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook ? 'Edit Book' : 'Add Book'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for editing or adding book details */}
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={selectedBook ? editedTitle : newBook.title}
                onChange={(e) =>
                  selectedBook
                    ? setEditedTitle(e.target.value)
                    : setNewBook({ ...newBook, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                value={selectedBook ? editedAuthor : newBook.author_name}
                onChange={(e) =>
                  selectedBook
                    ? setEditedAuthor(e.target.value)
                    : setNewBook({ ...newBook, author_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFirstPublishYear">
              <Form.Label>First Published Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter first published year"
                value={
                  selectedBook ? selectedFirstPublishYear : newBook.first_publish_year
                }
                onChange={(e) =>
                  selectedBook
                    ? setSelectedFirstPublishYear(parseInt(e.target.value))
                    : setNewBook({
                        ...newBook,
                        first_publish_year: parseInt(e.target.value),
                      })
                }
              />
            </Form.Group>
            <Form.Group controlId="formNumPagesMedian">
              <Form.Label>Number of Pages Median</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of pages median"
                value={
                  selectedBook ? selectedNumberOfPages : newBook.number_of_pages_median
                }
                onChange={(e) =>
                  selectedBook
                    ? setSelectedNumberOfPages(parseInt(e.target.value))
                    : setNewBook({
                        ...newBook,
                        number_of_pages_median: parseInt(e.target.value),
                      })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            CLOSE
          </Button>
          <Button
            variant={selectedBook ? 'success' : 'primary'}
            onClick={selectedBook ? handleSaveChanges : handleAddBook}
          >
            {selectedBook ? 'SAVE CHANGES' : 'ADD BOOK'}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the book: {bookToDelete?.title}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
            CANCEL
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (bookToDelete) {
                await deleteBook(bookToDelete.id);
                const updatedBooks = books.filter(book => book.id !== bookToDelete.id);
                setBooks(updatedBooks);
                setBookToDelete(null);
                setShowDeleteConfirmation(false);
              }
            }}
          >
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookList;
