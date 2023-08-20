// src/App.tsx
import './App.css';
import BookList from './components/BookList';
import NavbarTop from './components/NavbarTop';

function App() {
  return (
    <div className="App">
      <NavbarTop />
      <div className="text-center text-secondary mb-5">
        <h1>BOOK STORE ADMIN PANEL</h1>
      </div>
      <BookList />
      {/* Add other components for CRUD operations */}
    </div>
  );
}

export default App;
