// src/components/menus/MenuForm.js
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
  InputAdornment,
} from '@mui/material';
import { Save, ArrowBack, AttachMoney } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { menusAPI } from '../../services/api';

function MenuForm() {
  const [menu, setMenu] = useState({
    id: '',
    menu_name: '',
    menu_description: '',
    menu_price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // NUEVO: Función para obtener el próximo ID disponible
  const fetchNextId = async () => {
    try {
      // Opción A: Si tu API tiene un endpoint específico para obtener el próximo ID
      // const response = await menusAPI.getNextId();
      // return response.data.nextId;
      
      // Opción B: Obtener todos los menús y calcular el próximo ID
      const response = await menusAPI.getAll();
      const maxId = Math.max(...response.data.map(menu => menu.id), 0);
      return maxId + 1;
    } catch (error) {
      console.error('Error al obtener el próximo ID:', error);
      // Fallback: retornar 1 si hay error
      return 1;
    }
  };

  // MODIFICADO: useEffect actualizado para generar ID automáticamente
  useEffect(() => {
    if (isEdit) {
      fetchMenu();
    } else {
      // Para nuevo menú, generar el próximo ID automáticamente
      const generateId = async () => {
        try {
          setLoading(true);
          const nextId = await fetchNextId();
          setMenu(prev => ({ ...prev, id: nextId }));
        } catch (error) {
          setError('Error al generar el ID del menú');
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
      
      generateId();
    }
  }, [id, isEdit]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await menusAPI.getById(id);
      setMenu(response.data);
    } catch (error) {
      setError('Error al cargar los datos del menú');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!menu.menu_name.trim()) {
      setError('El nombre del menú es requerido');
      return false;
    }
    if (!menu.menu_description.trim()) {
      setError('La descripción del menú es requerida');
      return false;
    }
    if (!menu.menu_price || menu.menu_price <= 0) {
      setError('El precio debe ser mayor a 0');
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
      
      const menuData = {
        ...menu,
        menu_price: parseFloat(menu.menu_price),
      };

      if (isEdit) {
        await menusAPI.update({ ...menuData, id: parseInt(id) });
        setSuccess('Menú actualizado exitosamente');
      } else {
        // MODIFICADO: Incluir el ID generado al crear
        await menusAPI.create({ ...menuData, id: parseInt(menu.id) });
        setSuccess('Menú creado exitosamente');
      }
      
      setTimeout(() => {
        navigate('/menus');
      }, 1500);
    } catch (error) {
      setError(isEdit ? 'Error al actualizar el menú' : 'Error al crear el menú');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // MODIFICADO: Mostrar loading también cuando se está generando el ID
  if (loading && (isEdit || !menu.id)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          {isEdit ? 'Cargando menú...' : 'Generando ID...'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/menus')}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4">
          {isEdit ? 'Editar Menú' : 'Nuevo Menú'}
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
                  label="ID"
                  name="id"
                  value={menu.id}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText={isEdit ? "ID del menú (solo lectura)" : "ID generado automáticamente"}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Menú"
                  name="menu_name"
                  value={menu.menu_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Ej: Menú Ejecutivo, Menú Premium, etc."
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción del Menú"
                  name="menu_description"
                  multiline
                  rows={4}
                  value={menu.menu_description}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Describe los platos incluidos, ingredientes principales, etc."
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Precio"
                  name="menu_price"
                  type="number"
                  value={menu.menu_price}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  inputProps={{ 
                    min: 0, 
                    step: 0.01 
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/menus')}
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

export default MenuForm;