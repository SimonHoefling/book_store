// src/App.tsx
import './App.css';
import BookList from './components/BookList';
import NavbarTop from './components/NavbarTop';

function App() {
  return (
    <div className="App">
      <NavbarTop />
      <BookList />
      {/* Add other components for CRUD operations */}
    </div>
  );
}

export default App;
