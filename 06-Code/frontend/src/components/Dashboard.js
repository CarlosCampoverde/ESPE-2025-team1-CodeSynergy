// src/components/Dashboard.js
import React from 'react';
import { getCurrentUser } from '../utils/auth';
import ClientDashboard from './dashboards/ClientDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import { Alert, Box } from '@mui/material';

function Dashboard() {
  const user = getCurrentUser();
  
  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error al cargar el usuario. Por favor, inicia sesión nuevamente.
        </Alert>
      </Box>
    );
  }

  // Mostrar dashboard según el rol del usuario
  switch (user.role) {
    case 'client':
      return <ClientDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'superadmin':
      return <SuperAdminDashboard />;
    default:
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="warning">
            Rol de usuario no reconocido: {user.role}
          </Alert>
        </Box>
      );
  }
}
export default Dashboard;