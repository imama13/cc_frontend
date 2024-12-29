import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
// import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { VideoProvider } from './context/VideoContext';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <AuthProvider>
    <VideoProvider>
      <Router>
        <Routes>
          <Route path = "/login" element = {<Login />} />

          <Route path = "/" element = {<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </Router>
    </VideoProvider>
    </AuthProvider>
  );
}

export default App;
