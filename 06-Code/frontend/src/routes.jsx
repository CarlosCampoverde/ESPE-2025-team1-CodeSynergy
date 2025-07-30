// 06-Code/frontend/src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import QuoteForm from './pages/QuoteForm';
import Clients from './pages/Clients';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hola, ¡proyecto QuickQuote funcionando!</div>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/quote',
    element: <QuoteForm />,
  },
  {
    path: '/clients',
    element: <Clients />,
  },
]);

export default router;