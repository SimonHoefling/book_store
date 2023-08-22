// src/App.tsx
import { useState } from "react";
import "./App.css";
import { BookList, NavbarTop, Footer } from "./components";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("A-Z");

  return (
    <div className="App d-flex flex-column vh-100">
      <NavbarTop onSearch={setSearchQuery} setSortOption={setSortOption} />

      <div className="flex-grow-1">
        <BookList searchQuery={searchQuery} sortOption={sortOption} />{" "}
      </div>
      <Footer />
    </div>
  );
}

export default App;
