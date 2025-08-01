// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  People,
  EventNote,
  RestaurantMenu,
  Payment,
  RoomService,
  Event,
  Group,
  LocationOn,
  RateReview,
} from '@mui/icons-material';
import { 
  clientsAPI, 
  reservationsAPI, 
  menusAPI, 
  paymentsAPI,
  cateringAPI,
  eventsAPI,
  staffAPI,
  venuesAPI,
  reviewsAPI 
} from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    reservations: 0,  
    menus: 0,
    payments: 0,
    catering: 0,
    events: 0,
    staff: 0,
    venues: 0,
    reviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          clientsRes,
          reservationsRes,
          menusRes,
          paymentsRes,
          cateringRes,
          eventsRes,
          staffRes,
          venuesRes,
          reviewsRes,
        ] = await Promise.all([
          clientsAPI.getAll(),
          reservationsAPI.getAll(),
          menusAPI.getAll(),
          paymentsAPI.getAll(), 
          cateringAPI.getAll(),
          eventsAPI.getAll(),
          staffAPI.getAll(),
          venuesAPI.getAll(),
          reviewsAPI.getAll(),
        ]);

        setStats({
          clients: clientsRes.data.length || 0,
          reservations: reservationsRes.data.length || 0,
          menus: menusRes.data.length || 0,
          payments: paymentsRes.data.length || 0,
          catering: cateringRes.data.length || 0,
          events: eventsRes.data.length || 0,  
          staff: staffRes.data.length || 0,
          venues: venuesRes.data.length || 0,
          reviews: reviewsRes.data.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h3" component="div">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: color, fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard - QuickQuote
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Clientes" 
            value={stats.clients} 
            icon={<People />} 
            color="#1976d2" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Reservaciones" 
            value={stats.reservations} 
            icon={<EventNote />} 
            color="#388e3c" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Menús" 
            value={stats.menus} 
            icon={<RestaurantMenu />} 
            color="#f57c00" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Pagos" 
            value={stats.payments} 
            icon={<Payment />} 
            color="#7b1fa2" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Servicios Catering" 
            value={stats.catering} 
            icon={<RoomService />} 
            color="#c2185b" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Eventos" 
            value={stats.events} 
            icon={<Event />} 
            color="#303f9f" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Personal" 
            value={stats.staff} 
            icon={<Group />} 
            color="#5d4037" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Venues" 
            value={stats.venues} 
            icon={<LocationOn />} 
            color="#00796b" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Reseñas" 
            value={stats.reviews} 
            icon={<RateReview />} 
            color="#455a64" 
          />
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Bienvenido a QuickQuote
        </Typography>
        <Typography variant="body1">
          Sistema integral de gestión para servicios de catering. Administra clientes, 
          reservaciones, menús, pagos y todos los aspectos de tu negocio desde una 
          plataforma centralizada.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Dashboard;