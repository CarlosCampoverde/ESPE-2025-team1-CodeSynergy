import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import './App.css'; // Asegúrate de crear este archivo de CSS

const App: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [editClient, setEditClient] = useState<any | null>(null);

 axios.get('https://espe-2025-team1-codesynergy.onrender.com/quickquote/webresources/Clients/', {
  timeout: 10000 // 10 segundos de tiempo de espera
})
  .then((response) => {
    setClients(response.data);
  })
  .catch((error) => {
    console.error("Error al obtener los clientes:", error);
  });


  const handleDelete = (id: string) => {
    // Eliminar cliente
    axios.delete(`https://espe-2025-team1-codesynergy.onrender.com/quickquote/webresources/Clients/deleteClient/${id}`)
      .then(() => {
        setClients(clients.filter((client) => client.id_client !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar cliente:", error);
      });
  };

  const handleSearch = () => {
    // Filtro básico para buscar por nombre o email
    return clients.filter(client =>
      client.first_name.toLowerCase().includes(search.toLowerCase()) ||
      client.last_name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleEdit = (client: any) => {
    setEditClient(client);
  };

  const handleUpdate = () => {
    // Actualizar cliente
    axios.put('https://espe-2025-team1-codesynergy.onrender.com/quickquote/webresources/Clients/updateClient', editClient)
      .then((response) => {
        const updatedClients = clients.map(client =>
          client.id_client === editClient.id_client ? response.data : client
        );
        setClients(updatedClients);
        setEditClient(null); // Reset after editing
      })
      .catch((error) => {
        console.error("Error al actualizar el cliente:", error);
      });
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>QuickQuote - Gestión de Clientes</h1>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} aria-label="Buscar cliente">
          <FaSearch />
        </button>
      </div>
      <div className="client-list">
        {handleSearch().map((client) => (
          <div key={client.id_client} className="client-card">
            <div className="client-info">
              <p>{client.first_name} {client.last_name}</p>
              <p>{client.email}</p>
              <p>{client.phone}</p>
            </div>
            <div className="client-actions">
              <button onClick={() => handleEdit(client)}><FaEdit /> Editar</button>
              <button onClick={() => handleDelete(client.id_client)}><FaTrashAlt /> Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {editClient && (
        <div className="edit-modal">
          <h3>Editar Cliente</h3>
          <input
            type="text"
            value={editClient.first_name}
            onChange={(e) => setEditClient({ ...editClient, first_name: e.target.value })}
            placeholder="First Name"
          />
          <input
            type="text"
            value={editClient.last_name}
            onChange={(e) => setEditClient({ ...editClient, last_name: e.target.value })}
            placeholder="Last Name"
          />
          <input
            type="email"
            value={editClient.email}
            onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={editClient.phone}
            onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
            placeholder="Phone"
          />
          <button onClick={handleUpdate}>Actualizar Cliente</button>
          <button onClick={() => setEditClient(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default App;
