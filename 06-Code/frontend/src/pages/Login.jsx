// 06-Code/frontend/src/pages/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
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
    <div className="min-h-screen flex items-center justify-center bg-neutral">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">{t('login.title')}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">{t('login.username')}</label>
            <input
              type="text"
              {...register('username', { required: t('login.usernameRequired') })}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${errors.username ? 'border-red-500' : 'border-neutral'}`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">{t('login.password')}</label>
            <input
              type="password"
              {...register('password', { required: t('login.passwordRequired') })}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500' : 'border-neutral'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition">
            {t('login.submit')}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          {t('login.noAccount')} <a href="/register" className="text-secondary hover:underline">{t('login.register')}</a>
        </p>
      </div>
    </div>
  );
};

export default Login;