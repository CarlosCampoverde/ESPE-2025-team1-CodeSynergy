// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/common/Layout';
import Dashboard from './components/Dashboard';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            {/* Clients Routes */}
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/edit/:id" element={<ClientForm />} />
            
            {/* Reservations Routes */}
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/reservations/new" element={<ReservationForm />} />
            <Route path="/reservations/edit/:id" element={<ReservationForm />} />
            
            {/* Menus Routes */}
            <Route path="/menus" element={<MenuList />} />
            <Route path="/menus/new" element={<MenuForm />} />
            <Route path="/menus/edit/:id" element={<MenuForm />} />
            
            {/* Payments Routes */}
            <Route path="/payments" element={<PaymentList />} />
            <Route path="/payments/new" element={<PaymentForm />} />
            <Route path="/payments/edit/:id" element={<PaymentForm />} />
            
            {/* Catering Routes */}
            <Route path="/catering" element={<CateringList />} />
            <Route path="/catering/new" element={<CateringForm />} />
            <Route path="/catering/edit/:id" element={<CateringForm />} />
            
            {/* Events Routes */}
            <Route path="/events" element={<EventList />} />
            <Route path="/events/new" element={<EventForm />} />
            <Route path="/events/edit/:id" element={<EventForm />} />
            
            {/* Staff Routes */}
            <Route path="/staff" element={<StaffList />} />
            <Route path="/staff/new" element={<StaffForm />} />
            <Route path="/staff/edit/:id" element={<StaffForm />} />
            
            {/* Venues Routes */}
            <Route path="/venues" element={<VenueList />} />
            <Route path="/venues/new" element={<VenueForm />} />
            <Route path="/venues/edit/:id" element={<VenueForm />} />
            
            {/* Reviews Routes */}
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/reviews/new" element={<ReviewForm />} />
            <Route path="/reviews/edit/:id" element={<ReviewForm />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;