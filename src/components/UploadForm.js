import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  ToggleButton, 
  ToggleButtonGroup 
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DescriptionIcon from '@mui/icons-material/Description';
import api from '../services/api';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [selectedContentTypes, setSelectedContentTypes] = useState(['Slides']);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contentTypes', JSON.stringify(selectedContentTypes));
    try {
      const res = await api.post('/upload/generate-content', formData);
      setContent(res.data.generatedContent);
    } catch {
      alert('Failed to generate content');
    }
  };

  const handleContentTypeChange = (event, newContentTypes) => {
    if (newContentTypes.length) {
      setSelectedContentTypes(newContentTypes);
    }
  };

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Left Panel - Upload Form */}
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            bgcolor: '#FFFFFF',
            height: '100%',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box 
              sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                bgcolor: '#F0F0FF', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
              }}
            >
              <LayersIcon sx={{ color: '#5F59ED' }} />
            </Box>
            <Typography variant="h6" fontWeight="bold">
              Content Generator
            </Typography>
          </Box>

          <Typography variant="body1" fontWeight="medium" sx={{ mb: 2 }}>
            Upload Content
          </Typography>

          {/* File Upload Area */}
          <Box
            sx={{
              border: '2px dashed #E0E0E0',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              mb: 4,
              cursor: 'pointer',
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input
              id="file-upload"
              type="file"
              accept=".txt,.doc,.docx,.pdf"
              hidden
              onChange={handleFileUpload}
            />
            <Box 
              sx={{ 
                width: 64, 
                height: 64, 
                borderRadius: '50%', 
                bgcolor: '#F0F0FF', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <ArrowUpwardIcon sx={{ color: '#5F59ED', fontSize: 28 }} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Upload lecture content
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Drag and drop your file here, or click to browse
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Supported formats: .txt, .doc, .docx, .pdf
            </Typography>
            {file && (
              <Typography variant="body2" sx={{ mt: 2, fontWeight: 'medium' }}>
                Selected: {file.name}
              </Typography>
            )}
          </Box>

          {/* Content Type Selection */}
          <Typography variant="body1" fontWeight="medium" sx={{ mb: 2 }}>
            Select Content Types
          </Typography>
          <ToggleButtonGroup
            value={selectedContentTypes}
            onChange={handleContentTypeChange}
            aria-label="content types"
            sx={{ mb: 4 }}
          >
            <ToggleButton 
              value="Slides" 
              aria-label="slides"
              sx={{ 
                mr: 1,
                borderRadius: '20px',
                px: 3,
                bgcolor: selectedContentTypes.includes('Slides') ? '#5F59ED' : 'transparent',
                color: selectedContentTypes.includes('Slides') ? 'white' : 'inherit',
                '&.Mui-selected': {
                  bgcolor: '#5F59ED',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#4B4BD4',
                  }
                }
              }}
            >
              Slides
            </ToggleButton>
            <ToggleButton 
              value="Quizzes" 
              aria-label="quizzes"
              sx={{ 
                mr: 1,
                borderRadius: '20px',
                px: 3,
                bgcolor: selectedContentTypes.includes('Quizzes') ? '#5F59ED' : 'transparent',
                color: selectedContentTypes.includes('Quizzes') ? 'white' : 'inherit',
                '&.Mui-selected': {
                  bgcolor: '#5F59ED',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#4B4BD4',
                  }
                }
              }}
            >
              Quizzes
            </ToggleButton>
            <ToggleButton 
              value="Exercises" 
              aria-label="exercises"
              sx={{ 
                borderRadius: '20px',
                px: 3,
                bgcolor: selectedContentTypes.includes('Exercises') ? '#5F59ED' : 'transparent',
                color: selectedContentTypes.includes('Exercises') ? 'white' : 'inherit',
                '&.Mui-selected': {
                  bgcolor: '#5F59ED',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#4B4BD4',
                  }
                }
              }}
            >
              Exercises
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Generate Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleUpload}
            sx={{ 
              py: 1.5,
              bgcolor: file ? '#5F59ED' : '#A5A5F5',
              '&:hover': {
                bgcolor: file ? '#4B4BD4' : '#8585E0'
              },
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '16px'
            }}
            disabled={!file}
          >
            Generate Content
          </Button>
        </Paper>
      </Grid>

      {/* Right Panel - Content Display */}
      <Grid item xs={12} md={6}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            bgcolor: '#FFFFFF',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: content ? 'flex-start' : 'center',
            alignItems: content ? 'stretch' : 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          {!content ? (
            <>
              <Box 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: '#F0F0FF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 3
                }}
              >
                <DescriptionIcon sx={{ color: '#5F59ED', fontSize: 40 }} />
              </Box>
              <Typography variant="h5" fontWeight="medium" sx={{ mb: 2 }}>
                No Content Generated Yet
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: 400 }}>
                Upload your lecture content and click "Generate Content" to create interactive educational materials.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Generated Content
              </Typography>
              <Box sx={{ 
                bgcolor: '#f8f9fa', 
                p: 3, 
                borderRadius: 2,
                flex: 1,
                overflow: 'auto'
              }}>
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>{content}</Typography>
              </Box>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UploadForm;