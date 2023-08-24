// src/components/BookList.tsx
import { useEffect, useState } from "react";
import {
  fetchBooks,
  updateBook,
  deleteBook,
  createBook,
} from "../services/api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../components/Pagination"; // Use curly braces for named export
import { isMobile } from "react-device-detect"; // Import the isMobile function
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import defaultCover from "../assets/default-cover.jpeg";
import "./BookList.css";

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
  isbn: string;
  isNew?: boolean;
}

interface BookListProps {
  searchQuery: string;
  sortOption: string;
}

const BookList = ({ searchQuery, sortOption }: BookListProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");
  const [selectedFirstPublishYear, setSelectedFirstPublishYear] =
    useState<number>(0);
  const [selectedNumberOfPages, setSelectedNumberOfPages] = useState<number>(0);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = isMobile ? 4 : 16; // Adjust this value as needed
  const [isEditing, setIsEditing] = useState(false);
  const [bookIsbn, setBookIsbn] = useState("");
  const [newBook, setNewBook] = useState({
    title: "",
    author_name: "",
    first_publish_year: 0,
    number_of_pages_median: 0,
    isbn: "",
  });

  useEffect(() => {
    const loadBooks = async () => {
      const response = await fetchBooks();
      const sortedBooks = response.data.sort((a: Book, b: Book) => {
        switch (sortOption) {
          case "A-Z":
            return a.title.localeCompare(b.title);
          case "Z-A":
            return b.title.localeCompare(a.title);
          case "Newest":
            return b.first_publish_year - a.first_publish_year;
          case "Oldest":
            return a.first_publish_year - b.first_publish_year;
          case "Most Pages":
            return b.number_of_pages_median - a.number_of_pages_median;
          default:
            return 0;
        }
      });
      setBooks(sortedBooks);
    };
    loadBooks();
    setCurrentPage(1); // Reset to the first page when searchQuery changes
  }, [sortOption, searchQuery]);

  const handleEdit = (book: Book) => {
    setIsEditing(true);
    setSelectedBook(book);
    setEditedTitle(book.title);
    setEditedAuthor(book.author_name);
    setSelectedFirstPublishYear(book.first_publish_year);
    setSelectedNumberOfPages(book.number_of_pages_median);
    if (book.isNew) {
      setBookIsbn(book.isbn);
    } else {
      setBookIsbn("");
    }
    setShowModal(true);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedBook(null);
    setShowModal(false);
  };

  // Utility function for getting the cover URLs from the ISBN number (needed when adding or editing a book)
  const getCoverUrls = (isbn: string) => {
    return {
      S: `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`,
      M: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
      L: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
    };
  };

  const handleSaveChanges = async () => {
    if (selectedBook) {
      let updatedCovers = selectedBook.covers;
      if (selectedBook.isbn !== bookIsbn && bookIsbn) {
        updatedCovers = getCoverUrls(bookIsbn);
      }
      const updatedBook: Book = {
        ...selectedBook,
        title: editedTitle,
        author_name: editedAuthor,
        first_publish_year: selectedFirstPublishYear,
        number_of_pages_median: selectedNumberOfPages,
        covers: updatedCovers,
        isbn: bookIsbn,
      };
      await updateBook(selectedBook.id, updatedBook);
      const updatedBooks = books.map((book) =>
        book.id === selectedBook.id ? updatedBook : book
      );
      setBooks(updatedBooks);
      handleCloseModal();
    }
  };

  const handleAddBook = async () => {
    const bookToAdd = {
      ...newBook,
      covers: newBook.isbn ? getCoverUrls(newBook.isbn) : {},
      isNew: true,
    };
    const response = await createBook(bookToAdd);
    setBooks([...books, response.data]);
    handleCloseModal();
  };

  return (
    <Container>
      {/* Heading */}
      <div className="text-center text-secondary mb-4">
        <h1>BOOK STORE ADMIN PANEL</h1>
      </div>
      {/* Add a new book */}
      <h4
        className="mb-4 add-book-custom"
        onClick={() => {
          setNewBook({
            title: "",
            author_name: "",
            first_publish_year: 0,
            number_of_pages_median: 0,
            isbn: "", // Clear previous new book data
          });
          setShowModal(true);
        }}
      >
        <FontAwesomeIcon icon={faBook} /> Add book
      </h4>
      {/* Display the list of books */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-5">
        {filteredBooks
          .slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
          .map((book) => (
            <div key={book.id} className="col mb-4">
              <Card className="h-100 shadow">
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "100%",
                    overflow: "hidden",
                  }}
                >
                  {book.covers && book.covers.M ? (
                    <Card.Img
                      variant="top"
                      src={book.covers.M}
                      alt={book.title}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <Card.Img
                      variant="top"
                      src={defaultCover}
                      alt="Default Cover"
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-0 custom-card-title">{book.title}</Card.Title>
                  <Card.Text className="mb-0">By {book.author_name}</Card.Text>
                  <Card.Text className="mb-0">
                    Year: {book.first_publish_year}
                  </Card.Text>
                  <Card.Text>Pages: {book.number_of_pages_median}</Card.Text>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(book)}
                    >
                      EDIT
                    </Button>
                    <div className="trash-icon" style={{ marginLeft: "8px" }}>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => {
                          setBookToDelete(book);
                          setShowDeleteConfirmation(true);
                        }}
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        {/* Display message if no books match the search */}
        {filteredBooks.length === 0 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
            }}
            className="text-center"
          >
            <h3>Can't find the book with the search term "{searchQuery}"</h3>
          </div>
        )}
      </div>
      {/* Pagination */}
      <Pagination
        totalItems={filteredBooks.length}
        itemsPerPage={booksPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {/* Modal for editing or adding a book */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook ? "Edit Book" : "Add Book"}</Modal.Title>
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
                  selectedBook
                    ? selectedFirstPublishYear
                    : newBook.first_publish_year
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
                  selectedBook
                    ? selectedNumberOfPages
                    : newBook.number_of_pages_median
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
            {/* Add a field for ISBN number */}
            <Form.Group controlId="formIsbn">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ISBN"
                value={isEditing ? bookIsbn : newBook.isbn}
                onChange={(e) =>
                  isEditing
                    ? setBookIsbn(e.target.value) // Update the ISBN for the current book being edited
                    : setNewBook({ ...newBook, isbn: e.target.value })
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
            variant={selectedBook ? "success" : "primary"}
            onClick={selectedBook ? handleSaveChanges : handleAddBook}
          >
            {selectedBook ? "SAVE CHANGES" : "ADD BOOK"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        bookToDelete={bookToDelete}
        onDelete={async (bookId: string) => {
          await deleteBook(bookId);
          const updatedBooks = books.filter((book) => book.id !== bookId);
          setBooks(updatedBooks);
          setBookToDelete(null);
          setShowDeleteConfirmation(false);
        }}
      />
    </Container>
  );
};

export default BookList;
