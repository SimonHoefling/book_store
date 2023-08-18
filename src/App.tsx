// src/App.tsx

import React from 'react';
import './App.css';
import BookList from './components/BookList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Store</h1>
      </header>
      <BookList />
      {/* Add other components for CRUD operations */}
    </div>
  );
}

export default App;
