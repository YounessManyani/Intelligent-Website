import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const MainLayout = ({ children, onLogout }) => {
  // State for sidebar open/closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onLogout={onLogout} 
      />
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          overflow: 'auto',
          backgroundColor: '#f9f9f9',
          p: 3,
          pt: 2,
          transition: 'margin 0.3s',
          ml: { xs: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;