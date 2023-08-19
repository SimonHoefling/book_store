import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarTop.css';

export default function NavbarTop() {
  return (
    <Navbar expand="sm" className="bg-body-secondary">
      <Container fluid className="px-4">
        <Navbar.Brand href="#" className=" custom-navbar-brand">
          BOOK STORE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Form className="d-flex ms-auto align-items-center my-2">
            <Form.Control
              type="search"
              placeholder="Search book"
              className="custom-search-field me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
