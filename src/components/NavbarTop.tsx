// src/components/NavbarTop.tsx
import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Navbar, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../assets/BookStore.webp';
import "./NavbarTop.css";

interface NavbarTopProps {
  onSearch: (query: string) => void;
  setSortOption: (option: string) => void;
}

export default function NavbarTop({
  onSearch,
  setSortOption,
}: NavbarTopProps) {
  const [searchValue, setSearchValue] = useState('');  // <-- ADDED: to track input value to make the magnifying glass icon appear/disappear

  const handleSortOptionClick = (option: string) => {
    console.log("Sorting option clicked:", option);
    setSortOption(option);
  };

  return (
    <Navbar expand="md" className="navbar-box-shadow mb-5">
      <Container fluid className="px-5">
        <Navbar.Brand href="#">
          <img src={logoImage} alt="Book Store Logo" height="30" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-collapse" />

        <Navbar.Collapse id="navbar-collapse" className="justify-content-center">
          <Form className="d-flex align-items-center mx-auto">
            <div className="search-container">
              <Form.Control
                type="search"
                placeholder="Search book"
                className="custom-search-field me-2 rounded-pill my-2 w-100 w-lg-100"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchValue(val);
                  console.log(val);
                  onSearch(val);
                }}
              />
              {/* ADDED: conditional rendering of the icon based on input value */}
              {searchValue === '' && <FontAwesomeIcon icon={faSearch} className="search-icon" />}
            </div>
          </Form>

          <Dropdown className="d-flex align-items-center ms-3 justify-content-sm-start justify-content-center">
            <Dropdown.Toggle variant="outline-secondary rounded-pill">
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item onClick={() => handleSortOptionClick("A-Z")}>
                A - Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortOptionClick("Z-A")}>
                Z - A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortOptionClick("Newest")}>
                Newest
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortOptionClick("Oldest")}>
                Oldest
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSortOptionClick("Most Pages")}
              >
                Most Pages
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
