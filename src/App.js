import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import "./App.css"

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Dashboard Route */}
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;