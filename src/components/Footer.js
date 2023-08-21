// src/components/Footer.tsx
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container fluid className="custom-footer py-5">
      <Row className="justify-content-center">
        <Col xs="auto">&copy; {currentYear} BOOK STORE</Col>
      </Row>
    </Container>
  );
}
