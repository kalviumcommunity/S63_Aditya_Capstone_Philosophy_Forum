import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import DiscussionRooms from './pages/DiscussionRooms';
import Journal from './pages/Journal';
import Debates from './pages/Debates';
import DebateTopics from './pages/DebateTopics';
import Questions from './pages/Questions';
import Dilemmas from './pages/Dilemmas';
import Quiz from './pages/Quiz';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import Recommendation from './pages/Recommendation';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discussions" element={<DiscussionRooms />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/debates" element={<Debates />} />
        <Route path="/debate-topics" element={<DebateTopics />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/dilemmas" element={<Dilemmas />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/" element={<Home />} />
        {/* Fallback: redirect unknown routes to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
