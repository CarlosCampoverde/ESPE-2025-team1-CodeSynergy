// src/components/menus/MenuList.js
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
  Restaurant,
  AttachMoney,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { menusAPI } from '../../services/api';

function MenuList() {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, menu: null });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    const filtered = menus.filter(menu =>
      menu.menu_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.menu_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.menu_price?.toString().includes(searchTerm)
    );
    setFilteredMenus(filtered);
  }, [menus, searchTerm]);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await menusAPI.getAll();
      setMenus(response.data || []);
    } catch (error) {
      console.error('Error fetching menus:', error);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await menusAPI.delete(deleteDialog.menu.id);
      setDeleteDialog({ open: false, menu: null });
      fetchMenus();
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  const openDeleteDialog = (menu) => {
    setDeleteDialog({ open: true, menu });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, menu: null });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Cargando menús...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestión de Menús</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/menus/new')}
        >
          Nuevo Menú
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar menús por nombre, descripción o precio..."
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

      {filteredMenus.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No se encontraron menús
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate('/menus/new')}
            sx={{ mt: 2 }}
          >
            Crear primer menú
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredMenus.map((menu) => (
            <Grid item xs={12} md={6} lg={4} key={menu.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="div">
                      {menu.menu_name}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/menus/edit/${menu.id}`)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => openDeleteDialog(menu)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="flex-start" mb={2}>
                    <Restaurant sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {menu.menu_description}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <AttachMoney sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="h6" color="primary">
                        {formatPrice(menu.menu_price)}
                      </Typography>
                    </Box>
                    <Chip
                      label="Disponible"
                      color="success"
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
            ¿Está seguro que desea eliminar el menú{' '}
            <strong>{deleteDialog.menu?.menu_name}</strong>?
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

export default MenuList;