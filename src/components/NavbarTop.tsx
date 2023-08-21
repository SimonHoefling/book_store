// src/components/NavbarTop.tsx
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarTop.css";

interface NavbarTopProps {
  onSearch: (query: string) => void;
}

export default function NavbarTop({ onSearch }: NavbarTopProps) {
  return (
    <Navbar expand="sm" className="navbar-box-shadow mb-5">
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
              onChange={(e) => {
                console.log(e.target.value); // This line will log the search query
                onSearch(e.target.value); // This line sends the query to the parent
              }}
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
