import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // TODO: Llamar a POST /quickquote/webresources/Auth/login
      console.log('Login data:', data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('login.title')}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">{t('login.username')}</label>
            <input
              type="text"
              {...register('username', { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t('login.password')}</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {t('login.submit')}
          </button>
        </form>
        <p className="mt-4 text-center">
          {t('login.noAccount')} <a href="/register" className="text-blue-500">{t('login.register')}</a>
        </p>
      </div>
    </div>
  );
};

export default Login;