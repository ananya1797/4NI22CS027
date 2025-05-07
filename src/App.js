import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TopUsers from './pages/TopUsers';
import MostCommentedPosts from './pages/MaxCommentsPost';
import Feed from './pages/Feed';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
          <Link to="/top-users" style={{ marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' }}>Top Users</Link>
          <Link to="/most-commented-posts" style={{ marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' }}>Most Commented Posts</Link>
          <Link to="/feed" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Feed</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to Social Media Analytics App</h1>} />
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/most-commented-posts" element={<MostCommentedPosts />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
