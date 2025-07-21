'use client';

import { useState } from 'react';

interface University {
  name: string;
  web_pages: string[];
}

export default function Home() {
  const [country, setCountry] = useState<string>('');
  const [universities, setUniversities] = useState<University[]>([]);

  const handleSearch = async () => {
    if (!country.trim()) {
      alert("Por favor escribe un país");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/universidades?country=${country}`);
      const data: University[] = await res.json();
      setUniversities(data);
    } catch (error) {
      alert("Error al buscar universidades");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Buscador de Universidades por País</h1>
      <input
        type="text"
        placeholder="Ej: Ecuador"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        style={{ padding: '8px' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px', marginLeft: '8px' }}>
        Buscar
      </button>

      <ul style={{ marginTop: '20px' }}>
        {universities.map((uni, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <strong>{uni.name}</strong><br />
            <a href={uni.web_pages[0]} target="_blank" rel="noopener noreferrer">
              {uni.web_pages[0]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
