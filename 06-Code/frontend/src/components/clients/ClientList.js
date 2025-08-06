// src/components/clients/ClientList.js
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
  Alert,
  Fab,
  Chip,
  Paper,
} from '@mui/material';
import {
  Add,
  Search,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { clientsAPI } from '../../services/api';
import { hasRole } from '../../utils/auth';
import RoleBasedActions from '../common/RoleBasedActions';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, client: null });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter(client =>
      client.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [clients, searchTerm]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientsAPI.getAll();
      setClients(response.data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await clientsAPI.delete(deleteDialog.client.id_client);
      setDeleteDialog({ open: false, client: null });
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleEdit = (client) => {
    navigate(`/clients/edit/${client.id_client}`);
  };

  const openDeleteDialog = (client) => {
    setDeleteDialog({ open: true, client });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, client: null });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Cargando clientes...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestión de Clientes</Typography>
        {hasRole(['admin', 'superadmin']) && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/clients/new')}
          >
            Nuevo Cliente
          </Button>
        )}
      </Box>

      {filteredClients.length === 0 && !loading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No se encontraron clientes.
          {hasRole(['admin', 'superadmin']) && ' Haz clic en "Nuevo Cliente" para agregar el primero.'}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar clientes por nombre, email o teléfono..."
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
      </Box>

      {filteredClients.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No se encontraron clientes
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate('/clients/new')}
            sx={{ mt: 2 }}
          >
            Crear primer cliente
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredClients.map((client) => (
            <Grid item xs={12} md={6} lg={4} key={client.id_client}>
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="div">
                      {client.first_name} {client.last_name}
                    </Typography>
                    <RoleBasedActions
                      item={client}
                      onEdit={handleEdit}
                      onDelete={openDeleteDialog}
                      editRoles={['admin', 'superadmin']}
                      deleteRoles={['admin', 'superadmin']}
                      itemType="cliente"
                    />
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {client.email || 'No especificado'}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {client.phone || 'No especificado'}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="flex-start">
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {client.address || 'No especificado'}
                    </Typography>
                  </Box>
                  
                  <Box mt={2}>
                    <Chip 
                      label={`ID: ${client.id_client}`} 
                      size="small" 
                      variant="outlined" 
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button for mobile */}
      {hasRole(['admin', 'superadmin']) && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate('/clients/new')}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: { xs: 'flex', sm: 'none' }
          }}
        >
          <Add />
        </Fab>
      )}

      <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea eliminar al cliente{' '}
            <strong>
              {deleteDialog.client?.first_name} {deleteDialog.client?.last_name}
            </strong>
            ? Esta acción no se puede deshacer.
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

export default ClientList;