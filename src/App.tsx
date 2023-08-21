// src/App.tsx
import { useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import NavbarTop from "./components/NavbarTop";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="App">
      <NavbarTop onSearch={setSearchQuery} />
      <div className="text-center text-secondary mb-5">
        <h1>BOOK STORE ADMIN PANEL</h1>
      </div>
      <BookList searchQuery={searchQuery} />
      {/* Add other components for CRUD operations */}
    </div>
  );
}

export default App;
