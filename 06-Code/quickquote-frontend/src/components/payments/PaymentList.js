// src/components/payments/PaymentList.js
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
  Chip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Payment,
  EventNote,
  AttachMoney,
  CalendarToday,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { paymentsAPI, reservationsAPI, clientsAPI } from '../../services/api';

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, payment: null });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = payments.filter(payment => {
      const reservation = reservations.find(r => r.id === payment.id_reservation);
      const client = reservation ? clients.find(c => c.id === reservation.id_client) : null;
      const clientName = client ? `${client.first_name} ${client.last_name}` : '';
      
      return (
        clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.payment_amount?.toString().includes(searchTerm) ||
        payment.payment_date?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredPayments(filtered);
  }, [payments, reservations, clients, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [paymentsRes, reservationsRes, clientsRes] = await Promise.all([
        paymentsAPI.getAll(),
        reservationsAPI.getAll(),
        clientsAPI.getAll(),
      ]);
      
      setPayments(paymentsRes.data || []);
      setReservations(reservationsRes.data || []);
      setClients(clientsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await paymentsAPI.delete(deleteDialog.payment.id);
      setDeleteDialog({ open: false, payment: null });
      fetchData();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const openDeleteDialog = (payment) => {
    setDeleteDialog({ open: true, payment });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, payment: null });
  };

  const getReservationInfo = (reservationId) => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return { clientName: 'Reservación no encontrada', reservationDate: '' };
    
    const client = clients.find(c => c.id === reservation.id_client);
    const clientName = client ? `${client.first_name} ${client.last_name}` : 'Cliente no encontrado';
    
    return {
      clientName,
      reservationDate: reservation.reservation_date,
      reservationId: reservation.id
    };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Cargando pagos...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestión de Pagos</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/payments/new')}
        >
          Nuevo Pago
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar pagos por cliente, monto o fecha..."
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

      {filteredPayments.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No se encontraron pagos
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate('/payments/new')}
            sx={{ mt: 2 }}
          >
            Crear primer pago
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredPayments.map((payment) => {
            const reservationInfo = getReservationInfo(payment.id_reservation);
            return (
              <Grid item xs={12} md={6} lg={4} key={payment.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="div">
                        Pago #{payment.id}
                      </Typography>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/payments/edit/${payment.id}`)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => openDeleteDialog(payment)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <EventNote sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Reservación #{reservationInfo.reservationId}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Cliente: {reservationInfo.clientName}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(payment.payment_date)}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                      <Box display="flex" alignItems="center">
                        <AttachMoney sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="h6" color="primary">
                          {formatPrice(payment.payment_amount)}
                        </Typography>
                      </Box>
                      <Chip
                        label="Pagado"
                        color="success"
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea eliminar el pago #{deleteDialog.payment?.id}?
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

export default PaymentList;