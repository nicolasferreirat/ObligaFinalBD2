import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/admin/loginPage/loginPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
