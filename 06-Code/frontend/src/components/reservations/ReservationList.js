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
  const [error, setError] = useState(null); // Agregado para manejo de errores
  const [deleteDialog, setDeleteDialog] = useState({ open: false, reservation: null });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = reservations.filter(reservation => {
      // Verificar que la reservación y sus propiedades existan
      if (!reservation) return false;
      
      // Buscar cliente tanto por 'id' como por 'id_client'
      const client = clients.find(c => {
        if (!c) return false;
        if (reservation.id_client == null) return false;
        
        // Comparar con c.id
        if (c.id != null) {
          if (c.id === reservation.id_client || 
              c.id.toString() === reservation.id_client.toString()) {
            return true;
          }
        }
        
        // Comparar con c.id_client
        if (c.id_client != null) {
          if (c.id_client === reservation.id_client || 
              c.id_client.toString() === reservation.id_client.toString()) {
            return true;
          }
        }
        
        return false;
      });
      
      const clientName = client ? `${client.first_name || ''} ${client.last_name || ''}` : '';
      
      return (
        clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reservation.reservation_date && reservation.reservation_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reservation.number_of_guests && reservation.number_of_guests.toString().includes(searchTerm))
      );
    });
    setFilteredReservations(filtered);
  }, [reservations, clients, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Hacer las llamadas por separado para mejor debugging
      console.log('Fetching reservations...');
      const reservationsRes = await reservationsAPI.getAll();
      console.log('Reservations response:', reservationsRes);
      
      console.log('Fetching clients...');
      const clientsRes = await clientsAPI.getAll();
      console.log('Clients response:', clientsRes);
      
      console.log('Fetching menus...');
      const menusRes = await menusAPI.getAll();
      console.log('Menus response:', menusRes);
      
      // Verificar la estructura de los datos
      const reservationsData = Array.isArray(reservationsRes.data) ? reservationsRes.data : 
                              Array.isArray(reservationsRes) ? reservationsRes : [];
      
      const clientsData = Array.isArray(clientsRes.data) ? clientsRes.data : 
                         Array.isArray(clientsRes) ? clientsRes : [];
      
      const menusData = Array.isArray(menusRes.data) ? menusRes.data : 
                       Array.isArray(menusRes) ? menusRes : [];
      
      console.log('Processed data:', {
        reservations: reservationsData,
        clients: clientsData,
        menus: menusData
      });
      
      setReservations(reservationsData);
      setClients(clientsData);
      setMenus(menusData);
      
      // Verificar la relación entre reservaciones y clientes
      if (reservationsData.length > 0 && clientsData.length > 0) {
        console.log('Sample reservation:', reservationsData[0]);
        console.log('Sample client:', clientsData[0]);
        console.log('Client IDs available:', clientsData.map(c => ({ 
          id: c.id, 
          id_client: c.id_client,
          name: `${c.first_name} ${c.last_name}`,
          type_id: typeof c.id,
          type_id_client: typeof c.id_client
        })));
        console.log('Reservation client IDs needed:', reservationsData.map(r => ({ 
          id_client: r.id_client, 
          type: typeof r.id_client 
        })));
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los datos. Por favor, intenta nuevamente.');
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
    console.log('Looking for client with ID:', clientId, 'Type:', typeof clientId);
    
    // Verificar que clientId no sea null o undefined
    if (clientId == null) {
      return 'Cliente sin ID';
    }
    
    // Primero intentar buscar por el campo 'id' del cliente
    let client = clients.find(c => {
      if (c?.id == null) return false;
      // Comparar directamente
      if (c.id === clientId) return true;
      // Comparar convirtiendo ambos a string
      if (c.id.toString() === clientId.toString()) return true;
      // Comparar convirtiendo ambos a número (si es posible)
      const cIdNum = parseInt(c.id);
      const clientIdNum = parseInt(clientId);
      if (!isNaN(cIdNum) && !isNaN(clientIdNum) && cIdNum === clientIdNum) return true;
      return false;
    });
    
    // Si no se encontró, intentar buscar por el campo 'id_client' 
    if (!client) {
      client = clients.find(c => {
        if (c?.id_client == null) return false;
        // Comparar directamente
        if (c.id_client === clientId) return true;
        // Comparar convirtiendo ambos a string
        if (c.id_client.toString() === clientId.toString()) return true;
        // Comparar convirtiendo ambos a número (si es posible)
        const cIdClientNum = parseInt(c.id_client);
        const clientIdNum = parseInt(clientId);
        if (!isNaN(cIdClientNum) && !isNaN(clientIdNum) && cIdClientNum === clientIdNum) return true;
        return false;
      });
    }
    
    console.log('Found client:', client);
    
    if (client) {
      return `${client.first_name || ''} ${client.last_name || ''}`.trim();
    }
    
    return `Cliente no encontrado (ID: ${clientId})`;
  };

  const getMenuName = (menuId) => {
    if (menuId == null) return 'Sin menú asignado';
    
    // Similar lógica de búsqueda con conversión de tipos segura
    let menu = menus.find(m => {
      if (m?.id == null) return false;
      return m.id === menuId;
    });
    
    if (!menu) {
      menu = menus.find(m => {
        if (m?.id == null || menuId == null) return false;
        return m.id.toString() === menuId.toString();
      });
    }
    
    if (!menu) {
      menu = menus.find(m => {
        if (m?.id == null || menuId == null) return false;
        const mIdNum = parseInt(m.id);
        const menuIdNum = parseInt(menuId);
        return !isNaN(mIdNum) && !isNaN(menuIdNum) && mIdNum === menuIdNum;
      });
    }
    
    return menu ? menu.menu_name : `Menú no encontrado (ID: ${menuId})`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    try {
      return new Date(dateString).toLocaleDateString('es-ES');
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Hora no disponible';
    return timeString.substring(0, 5);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Cargando reservaciones...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchData}>
          Reintentar
        </Button>
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

      {/* Debug info - remover en producción */}
      <Paper sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="caption">
          Debug: Reservaciones: {reservations.length}, Clientes: {clients.length}, Menús: {menus.length}
        </Typography>
      </Paper>

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
            {reservations.length === 0 
              ? "No hay reservaciones registradas" 
              : "No se encontraron reservaciones con esos criterios"
            }
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate('/reservations/new')}
            sx={{ mt: 2 }}
          >
            {reservations.length === 0 ? "Crear primera reservación" : "Nueva Reservación"}
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
                      label={`${reservation.number_of_guests || 0} invitados`}
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