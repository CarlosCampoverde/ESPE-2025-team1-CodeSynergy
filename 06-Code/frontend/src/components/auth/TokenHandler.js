import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TokenHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, '/');
      navigate('/');
    }
  }, [navigate]);
  return null;
}
