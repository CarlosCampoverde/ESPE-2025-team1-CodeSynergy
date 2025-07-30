// 06-Code/frontend/src/App.jsx
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './styles/index.css';
import './i18n/config';

function App() {
  return <RouterProvider router={router} />;
}

export default App;