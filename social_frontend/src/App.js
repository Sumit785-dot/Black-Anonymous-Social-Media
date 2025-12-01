import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import FollowList from './pages/FollowList';
import Chat from './pages/Chat';
import ChatRoom from './pages/ChatRoom';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/theme.css';
import api from './services/api';

function App() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.get('/health/')
      .then(res => setStatus(res.data.status))
      .catch(err => setStatus('error: ' + err.message));
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Temporary Health Check Display */}
          <div style={{ padding: '10px', borderBottom: '1px solid #333' }}>
            Backend Status: {status}
          </div>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId/followers"
              element={
                <ProtectedRoute>
                  <FollowList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId/following"
              element={
                <ProtectedRoute>
                  <FollowList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:conversationId"
              element={
                <ProtectedRoute>
                  <ChatRoom />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
