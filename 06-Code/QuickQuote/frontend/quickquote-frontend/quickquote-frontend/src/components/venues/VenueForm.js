// src/components/venues/VenueForm.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { venuesAPI } from '../../services/api';

function VenueForm() {
  const [venue, setVenue] = useState({
    venue_name: '',
    venue_location: '',
    venue_capacity: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetchVenue();
    }
  }, [id, isEdit]);

  const fetchVenue = async () => {
    try {
      setLoading(true);
      const response = await venuesAPI.getById(id);
      setVenue(response.data);
    } catch (error) {
      setError('Error al cargar los datos del lugar');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenue(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!venue.venue_name.trim()) {
      setError('El nombre del lugar es requerido');
      return false;
    }
    if (!venue.venue_location.trim()) {
      setError('La ubicación del lugar es requerida');
      return false;
    }
    if (!venue.venue_capacity || venue.venue_capacity <= 0) {
      setError('La capacidad debe ser un número mayor a 0');
      return false;
    }

    // Validar que la capacidad sea un número entero
    if (!Number.isInteger(Number(venue.venue_capacity))) {
      setError('La capacidad debe ser un número entero');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const venueData = {
        ...venue,
        venue_capacity: parseInt(venue.venue_capacity)
      };
      
      if (isEdit) {
        await venuesAPI.update({ ...venueData, id: parseInt(id) });
        setSuccess('Lugar actualizado exitosamente');
      } else {
        await venuesAPI.create(venueData);
        setSuccess('Lugar creado exitosamente');
      }
      
      setTimeout(() => {
        navigate('/venues');
      }, 1500);
    } catch (error) {
      setError(isEdit ? 'Error al actualizar el lugar' : 'Error al crear el lugar');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/venues')}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4">
          {isEdit ? 'Editar Lugar' : 'Nuevo Lugar'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre del Lugar"
                  name="venue_name"
                  value={venue.venue_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Capacidad"
                  name="venue_capacity"
                  type="number"
                  value={venue.venue_capacity}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  inputProps={{ min: 1 }}
                  helperText="Número máximo de personas"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  name="venue_location"
                  multiline
                  rows={3}
                  value={venue.venue_location}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Dirección completa del lugar"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/venues')}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default VenueForm;