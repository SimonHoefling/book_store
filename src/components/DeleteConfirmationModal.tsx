import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Type definition for Book
type Book = {
  id: string;
  title: string;
  first_publish_year: number;
  number_of_pages_median: number;
};

interface DeleteConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  bookToDelete: Book | null;
  onDelete: (bookId: string) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
  bookToDelete,
  onDelete,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the book: {bookToDelete?.title}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          CANCEL
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            if (bookToDelete) {
              onDelete(bookToDelete.id);
            }
          }}
        >
          DELETE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
