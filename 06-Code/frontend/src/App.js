
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from './components/common/Layout';
import Dashboard from './components/Dashboard';
import AuthPage from './components/auth/AuthPage';
import TokenHandler from './components/auth/TokenHandler';
import ProtectedRoute from './components/ProtectedRoute';
import UserManagement from './components/UserManagement';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';
import ReservationList from './components/reservations/ReservationList';
import ReservationForm from './components/reservations/ReservationForm';
import MenuList from './components/menus/MenuList';
import MenuForm from './components/menus/MenuForm';
import PaymentList from './components/payments/PaymentList';
import PaymentForm from './components/payments/PaymentForm';
import CateringList from './components/catering/CateringList';
import CateringForm from './components/catering/CateringForm';
import EventList from './components/events/EventList';
import EventForm from './components/events/EventForm';
import StaffList from './components/staff/StaffList';
import StaffForm from './components/staff/StaffForm';
import VenueList from './components/venues/VenueList';
import VenueForm from './components/venues/VenueForm';
import ReviewList from './components/reviews/ReviewList';
import ReviewForm from './components/reviews/ReviewForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <AuthPage />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <TokenHandler />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    
                    {/* User Management - Solo SuperAdmin */}
                    <Route path="/user-management" element={
                      <ProtectedRoute requiredRole="superadmin">
                        <UserManagement />
                      </ProtectedRoute>
                    } />
                    
                    {/* Clients Routes - Solo Admin y SuperAdmin */}
                    <Route path="/clients" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <ClientList />
                      </ProtectedRoute>
                    } />
                    <Route path="/clients/new" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <ClientForm />
                      </ProtectedRoute>
                    } />
                    <Route path="/clients/edit/:id" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <ClientForm />
                      </ProtectedRoute>
                    } />
                    
                    {/* Reservations Routes - Todos los usuarios autenticados */}
                    <Route path="/reservations" element={<ReservationList />} />
                    <Route path="/reservations/new" element={<ReservationForm />} />
                    <Route path="/reservations/edit/:id" element={<ReservationForm />} />
                    
                    {/* Menus Routes - Todos pueden ver, solo admin puede editar */}
                    <Route path="/menus" element={<MenuList />} />
                    <Route path="/menus/new" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <MenuForm />
                      </ProtectedRoute>
                    } />
                    <Route path="/menus/edit/:id" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <MenuForm />
                      </ProtectedRoute>
                    } />
                    
                    {/* Payments Routes - Todos los usuarios autenticados */}
                    <Route path="/payments" element={<PaymentList />} />
                    <Route path="/payments/new" element={<PaymentForm />} />
                    <Route path="/payments/edit/:id" element={<PaymentForm />} />
                    
                    {/* Catering Routes - Solo Admin y SuperAdmin */}
                    <Route path="/catering" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <CateringList />
                      </ProtectedRoute>
                    } />
                    <Route path="/catering/new" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <CateringForm />
                      </ProtectedRoute>
                    } />
                    <Route path="/catering/edit/:id" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <CateringForm />
                      </ProtectedRoute>
                    } />
                    
                    {/* Events Routes - Todos pueden ver, solo admin puede editar */}
                    <Route path="/events" element={<EventList />} />
                    <Route path="/events/new" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <EventForm />
                      </ProtectedRoute>
                    } />
                    <Route path="/events/edit/:id" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <EventForm />
                      </ProtectedRoute>
                    } />
                    
                    {/* Staff Routes - Solo Admin y SuperAdmin */}
                    <Route path="/staff" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <StaffList />
                      </ProtectedRoute>
                    } />
                    <Route path="/staff/new" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <StaffForm />
                      </ProtectedRoute>
                    } />
                    <Route path="/staff/edit/:id" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <StaffForm />
                      </ProtectedRoute>
                    } />
                    
                    {/* Venues Routes - Todos pueden ver, solo admin puede editar */}
                    <Route path="/venues" element={<VenueList />} />
                    <Route path="/venues/new" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <VenueForm />
                      </ProtectedRoute>
                    } />
                    <Route path="/venues/edit/:id" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <VenueForm />
                      </ProtectedRoute>
                    } />
                    
                    {/* Reviews Routes - Todos pueden ver y crear, solo admin puede editar */}
                    <Route path="/reviews" element={<ReviewList />} />
                    <Route path="/reviews/new" element={<ReviewForm />} />
                    <Route path="/reviews/edit/:id" element={
                      <ProtectedRoute requiredRole={['admin', 'superadmin']}>
                        <ReviewForm />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;