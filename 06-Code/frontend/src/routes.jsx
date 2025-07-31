import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Menus from './pages/Menus';
import QuoteForm from './pages/QuoteForm';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/clients', element: <Clients /> },
  { path: '/menus', element: <Menus /> },
  { path: '/quote', element: <QuoteForm /> },
]);

export default router;