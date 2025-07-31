// src/pages/QuoteForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getAllMenus, getPublicCateringServices, createClient, createEvent, createFullQuote } from '../services/api';

const QuoteForm = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const [step, setStep] = useState(1);
  const [menus, setMenus] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuData = await getAllMenus();
        const serviceData = await getPublicCateringServices();
        setMenus(menuData);
        setServices(serviceData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Paso 1: Crear cliente
      const clientResponse = await createClient({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
      const clientId = clientResponse.id_client;

      // Paso 2: Crear evento
      const eventResponse = await createEvent({
        event_name: data.event_type,
        event_date: data.event_date,
        event_location: data.location,
        event_type: data.event_type,
      });
      const eventId = eventResponse.id;

      // Paso 3 y 4: Generar cotización
      const quoteResponse = await createFullQuote(eventId, {
        client_id: clientId,
        menu_id: data.menu_id,
        number_of_guests: data.guests,
        services: selectedServices,
        event_type: data.event_type,
      });

      alert(t('quote.success'));
      reset();
      setStep(1);
    } catch (error) {
      console.error('Error creating quote:', error);
      alert(t('quote.error'));
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('quote.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Paso 1: Información del Cliente */}
        {step === 1 && (
          <div>
            <h3>{t('quote.clientInfo')}</h3>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.firstName')}</label>
              <input
                type="text"
                {...register('first_name', { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.lastName')}</label>
              <input
                type="text"
                {...register('last_name', { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.email')}</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.phone')}</label>
              <input
                type="tel"
                {...register('phone', { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.address')}</label>
              <input
                type="text"
                {...register('address', { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="button" onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">
              {t('quote.next')}
            </button>
          </div>
        )}

        {/* Paso 2: Información del Evento */}
        {step === 2 && (
          <div>
            <h3>{t('quote.eventInfo')}</h3>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.eventType')}</label>
              <input
                type="text"
                {...register('event_type', { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.eventDate')}</label>
              <input
                type="date"
                {...register('event_date', { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.location')}</label>
              <input
                type="text"
                {...register('location', { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.guests')}</label>
              <input
                type="number"
                {...register('guests', { required: true, min: 1 })}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white p-2 rounded mr-2">
              {t('quote.previous')}
            </button>
            <button type="button" onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">
              {t('quote.next')}
            </button>
          </div>
        )}

        {/* Paso 3: Selección de Menú */}
        {step === 3 && (
          <div>
            <h3>{t('quote.menuSelection')}</h3>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.menuType')}</label>
              <select {...register('menu_id', { required: true })} className="w-full p-2 border rounded">
                <option value="">{t('quote.selectMenu')}</option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.menu_name} - ${menu.menu_price}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white p-2 rounded mr-2">
              {t('quote.previous')}
            </button>
            <button type="button" onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">
              {t('quote.next')}
            </button>
          </div>
        )}

        {/* Paso 4: Servicios Adicionales */}
        {step === 4 && (
          <div>
            <h3>{t('quote.additionalServices')}</h3>
            <div className="mb-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={service.id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedServices([...selectedServices, service.id]);
                      } else {
                        setSelectedServices(selectedServices.filter((id) => id !== service.id));
                      }
                    }}
                    className="mr-2"
                  />
                  <label>{service.service_name} - ${service.service_price}</label>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{t('quote.comments')}</label>
              <textarea {...register('comments')} className="w-full p-2 border rounded" rows="4" />
            </div>
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white p-2 rounded mr-2">
              {t('quote.previous')}
            </button>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              {t('quote.submit')}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuoteForm;