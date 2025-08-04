// src/components/reservations/ReservationForm.js
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { reservationsAPI, clientsAPI, menusAPI } from '../../services/api';

function ReservationForm() {
  const [reservation, setReservation] = useState({
    id_client: '',
    reservation_date: '',
    reservation_time: '',
    number_of_guests: '',
    menu_id: '',
  });
  const [clients, setClients] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (isEdit && clients.length > 0 && menus.length > 0) {
      fetchReservation();
    }
  }, [id, isEdit, clients, menus]);

  const fetchInitialData = async () => {
    try {
      setDataLoading(true);
      const [clientsRes, menusRes] = await Promise.all([
        clientsAPI.getAll(),
        menusAPI.getAll(),
      ]);
      
      setClients(clientsRes.data || []);
      setMenus(menusRes.data || []);
    } catch (error) {
      setError('Error al cargar los datos iniciales');
      console.error('Error:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchReservation = async () => {
    try {
      setLoading(true);
      const response = await reservationsAPI.getById(id);
      const data = response.data;
      
      setReservation({
        id_client: data.id_client || '',
        reservation_date: data.reservation_date || '',
        reservation_time: data.reservation_time || '',
        number_of_guests: data.number_of_guests || '',
        menu_id: data.menu_id || '',
      });
    } catch (error) {
      setError('Error al cargar los datos de la reservación');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!reservation.id_client) {
      setError('El cliente es requerido');
      return false;
    }
    if (!reservation.reservation_date) {
      setError('La fecha de reservación es requerida');
      return false;
    }
    if (!reservation.reservation_time) {
      setError('La hora de reservación es requerida');
      return false;
    }
    if (!reservation.number_of_guests || reservation.number_of_guests <= 0) {
      setError('El número de invitados debe ser mayor a 0');
      return false;
    }
    if (!reservation.menu_id) {
      setError('El menú es requerido');
      return false;
    }

    // Validar que la fecha no sea en el pasado
    const reservationDate = new Date(reservation.reservation_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (reservationDate < today) {
      setError('La fecha de reservación no puede ser en el pasado');
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
      
      const reservationData = {
        ...reservation,
        id_client: parseInt(reservation.id_client),
        number_of_guests: parseInt(reservation.number_of_guests),
        menu_id: parseInt(reservation.menu_id),
      };

      if (isEdit) {
        await reservationsAPI.update({ ...reservationData, id: parseInt(id) });
        setSuccess('Reservación actualizada exitosamente');
      } else {
        await reservationsAPI.create(reservationData);
        setSuccess('Reservación creada exitosamente');
      }
      
      setTimeout(() => {
        navigate('/reservations');
      }, 1500);
    } catch (error) {
      setError(isEdit ? 'Error al actualizar la reservación' : 'Error al crear la reservación');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
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
          onClick={() => navigate('/reservations')}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4">
          {isEdit ? 'Editar Reservación' : 'Nueva Reservación'}
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
                <FormControl fullWidth required>
                  <InputLabel>Cliente</InputLabel>
                  <Select
                    name="id_client"
                    value={reservation.id_client}
                    onChange={handleChange}
                    disabled={loading}
                    label="Cliente"
                  >
                    {clients.map((client) => (
                      <MenuItem key={client.id} value={client.id}>
                        {client.first_name} {client.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Menú</InputLabel>
                  <Select
                    name="menu_id"
                    value={reservation.menu_id}
                    onChange={handleChange}
                    disabled={loading}
                    label="Menú"
                  >
                    {menus.map((menu) => (
                      <MenuItem key={menu.id} value={menu.id}>
                        {menu.menu_name} - ${menu.menu_price}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fecha de Reservación"
                  name="reservation_date"
                  type="date"
                  value={reservation.reservation_date}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hora de Reservación"
                  name="reservation_time"
                  type="time"
                  value={reservation.reservation_time}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Número de Invitados"
                  name="number_of_guests"
                  type="number"
                  value={reservation.number_of_guests}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  inputProps={{ min: 1 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/reservations')}
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

export default ReservationForm;