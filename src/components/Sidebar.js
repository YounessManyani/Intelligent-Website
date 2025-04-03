import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Typography,
  IconButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const location = useLocation();
  
  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Generated Content', icon: <DescriptionIcon />, path: '/content' },
  ];
  
  const bottomMenuItems = [];
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback to original behavior
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      sx={{
        width: isOpen ? 250 : 70,
        flexShrink: 0,
        height: '100vh',
        backgroundColor: '#5B5DED',
        color: 'white',
        transition: 'width 0.3s',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 1100,
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2,
          justifyContent: isOpen ? 'space-between' : 'center'
        }}
      >
        {isOpen && (
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            ModuleGen
          </Typography>
        )}
        <IconButton 
          color="inherit" 
          onClick={toggleSidebar}
          sx={{ ml: isOpen ? 0 : 'auto' }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ 
              py: 1.5,
              backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              borderRadius: isOpen ? 2 : 0,
              mx: isOpen ? 1 : 0,
              justifyContent: isOpen ? 'flex-start' : 'center',
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: isOpen ? 40 : 'auto' }}>
              {item.icon}
            </ListItemIcon>
            {isOpen && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <List>
        {bottomMenuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ 
              py: 1.5,
              backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              borderRadius: isOpen ? 2 : 0,
              mx: isOpen ? 1 : 0,
              justifyContent: isOpen ? 'flex-start' : 'center',
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: isOpen ? 40 : 'auto' }}>
              {item.icon}
            </ListItemIcon>
            {isOpen && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
        
        <ListItem 
          button 
          onClick={handleLogout}
          sx={{ 
            py: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            borderRadius: isOpen ? 2 : 0,
            mx: isOpen ? 1 : 0,
            mb: 2,
            justifyContent: isOpen ? 'flex-start' : 'center',
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: isOpen ? 40 : 'auto' }}>
            <LogoutIcon />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;