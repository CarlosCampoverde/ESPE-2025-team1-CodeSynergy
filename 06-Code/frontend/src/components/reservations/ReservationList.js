// src/components/reservations/ReservationList.js
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
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Alert,
  Fab,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Add,
  Search,
  Event,
  People,
  Restaurant,
  AccessTime,
  Edit,
  Delete,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { reservationsAPI, clientsAPI, menusAPI } from '../../services/api';
import { hasRole, getCurrentUser } from '../../utils/auth';
import RoleBasedActions from '../common/RoleBasedActions';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [clients, setClients] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, reservation: null });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = reservations.filter(reservation => {
      const client = clients.find(c => c.id === reservation.id_client);
      const clientName = client ? `${client.first_name} ${client.last_name}` : '';
      
      return (
        clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.reservation_date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.number_of_guests?.toString().includes(searchTerm)
      );
    });
    setFilteredReservations(filtered);
  }, [reservations, clients, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reservationsRes, clientsRes, menusRes] = await Promise.all([
        reservationsAPI.getAll(),
        clientsAPI.getAll(),
        menusAPI.getAll(),
      ]);
      
      setReservations(reservationsRes.data || []);
      setClients(clientsRes.data || []);
      setMenus(menusRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await reservationsAPI.delete(deleteDialog.reservation.id);
      setDeleteDialog({ open: false, reservation: null });
      fetchData();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const openDeleteDialog = (reservation) => {
    setDeleteDialog({ open: true, reservation });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, reservation: null });
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.first_name} ${client.last_name}` : 'Cliente no encontrado';
  };

  const getMenuName = (menuId) => {
    const menu = menus.find(m => m.id === menuId);
    return menu ? menu.menu_name : 'Menú no encontrado';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.substring(0, 5) : '';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Cargando reservaciones...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestión de Reservaciones</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/reservations/new')}
        >
          Nueva Reservación
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar reservaciones por cliente, fecha o número de invitados..."
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

      {filteredReservations.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No se encontraron reservaciones
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate('/reservations/new')}
            sx={{ mt: 2 }}
          >
            Crear primera reservación
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredReservations.map((reservation) => (
            <Grid item xs={12} md={6} lg={4} key={reservation.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="div">
                      Reservación #{reservation.id}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/reservations/edit/${reservation.id}`)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => openDeleteDialog(reservation)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <People sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {getClientName(reservation.id_client)}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <Event sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(reservation.reservation_date)}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatTime(reservation.reservation_time)}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={2}>
                    <Restaurant sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {getMenuName(reservation.menu_id)}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={`${reservation.number_of_guests} invitados`}
                      color="primary"
                      size="small"
                    />
                  </Box>
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
            ¿Está seguro que desea eliminar la reservación #{deleteDialog.reservation?.id}?
            Esta acción no se puede deshacer.
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

export default ReservationList;