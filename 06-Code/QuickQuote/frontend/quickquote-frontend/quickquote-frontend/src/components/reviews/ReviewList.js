// src/components/reviews/ReviewList.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Rating,
  Chip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Person,
  LocationOn,
  Comment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { reviewsAPI, clientsAPI, venuesAPI } from '../../services/api';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [clients, setClients] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, review: null });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter(review => {
      const client = getClientName(review.id_client);
      const venue = getVenueName(review.id_venue);
      const searchLower = searchTerm.toLowerCase();
      
      return client.toLowerCase().includes(searchLower) ||
             venue.toLowerCase().includes(searchLower) ||
             review.review_comments?.toLowerCase().includes(searchLower);
    });
    setFilteredReviews(filtered);
  }, [reviews, searchTerm, clients, venues]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reviewsResponse, clientsResponse, venuesResponse] = await Promise.all([
        reviewsAPI.getAll(),
        clientsAPI.getAll(),
        venuesAPI.getAll()
      ]);
      
      setReviews(reviewsResponse.data || []);
      setClients(clientsResponse.data || []);
      setVenues(venuesResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setReviews([]);
      setClients([]);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.first_name} ${client.last_name}` : 'Cliente no encontrado';
  };

  const getVenueName = (venueId) => {
    const venue = venues.find(v => v.id === venueId);
    return venue ? venue.venue_name : 'Lugar no encontrado';
  };

  const handleDelete = async () => {
    try {
      await reviewsAPI.delete(deleteDialog.review.id);
      setDeleteDialog({ open: false, review: null });
      fetchData();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const openDeleteDialog = (review) => {
    setDeleteDialog({ open: true, review });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, review: null });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'primary';
    if (rating >= 2) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Cargando reseñas...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestión de Reseñas</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/reviews/new')}
        >
          Nueva Reseña
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar reseñas por cliente, lugar o comentarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {filteredReviews.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No se encontraron reseñas
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate('/reviews/new')}
            sx={{ mt: 2 }}
          >
            Crear primera reseña
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredReviews.map((review) => (
            <Grid item xs={12} md={6} lg={4} key={review.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center">
                      <Rating 
                        value={review.review_rating} 
                        readOnly 
                        size="small"
                      />
                      <Chip 
                        label={review.review_rating} 
                        size="small" 
                        variant="outlined"
                        color={getRatingColor(review.review_rating)}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/reviews/edit/${review.id}`)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => openDeleteDialog(review)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <Person sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {getClientName(review.id_client)}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {getVenueName(review.id_venue)}
                    </Typography>
                  </Box>
                  
                  {review.review_comments && (
                    <Box display="flex" alignItems="flex-start">
                      <Comment sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.5 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        "{review.review_comments.length > 100 
                          ? `${review.review_comments.substring(0, 100)}...` 
                          : review.review_comments}"
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea eliminar esta reseña? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ReviewList;