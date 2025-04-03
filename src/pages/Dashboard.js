import React from 'react';
import { Typography, Box, Container, Breadcrumbs, Link } from '@mui/material';
import UploadForm from '../components/UploadForm';

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 2 }}>
        <Link underline="hover" color="inherit" href="#">
          Dashboard
        </Link>
        <Typography color="text.primary">Content Generator</Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
        Intelligent Module Generator
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload your lecture content and generate educational materials
      </Typography>

      <UploadForm />
    </Container>
  );
};

export default Dashboard;