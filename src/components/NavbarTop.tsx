// src/components/NavbarTop.tsx
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Navbar, Dropdown } from "react-bootstrap";
import "./NavbarTop.css";

interface NavbarTopProps {
  onSearch: (query: string) => void;
}

export default function NavbarTop({ onSearch }: NavbarTopProps) {
  return (
    <Navbar expand="sm" className="navbar-box-shadow mb-5">
      <Container fluid className="px-5">
        <Navbar.Brand href="#" className="custom-navbar-brand">
          BOOK STORE
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-collapse" />

        <Navbar.Collapse
          id="navbar-collapse"
          className="justify-content-center"
        >
          <Form className="d-flex align-items-center mx-auto">
            <Form.Control
              type="search"
              placeholder="Search book"
              className="custom-search-field me-2 rounded-pill my-2"
              aria-label="Search"
              onChange={(e) => {
                console.log(e.target.value);
                onSearch(e.target.value);
              }}
            />
            <Button variant="outline-secondary rounded-pill">Search</Button>
          </Form>

          <Dropdown className="d-flex align-items-center ms-3 justify-content-sm-start justify-content-center">
            <Dropdown.Toggle variant="outline-secondary rounded-pill">
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item href="#/action-1">A - Z</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Z - A</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Newest</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Oldest</Dropdown.Item>
              <Dropdown.Item href="#/action-5">Most Pages</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
