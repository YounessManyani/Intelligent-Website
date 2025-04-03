import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Home = () => (
  <Paper elevation={2} sx={{ p: 5, mt: 4 }}>
    <Box textAlign="center">
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#5F59ED' }}>
        Welcome to Intelligent Module Generator
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 2, color: '#444' }}>
        Generate interactive materials effortlessly from your lecture content.
      </Typography>
    </Box>
  </Paper>
);

export default Home;
