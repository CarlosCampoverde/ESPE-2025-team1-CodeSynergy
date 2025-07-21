'use client';

import { useState } from 'react';

interface University {
  name: string;
  web_pages: string[];
  state_province: string | null;
  domains: string[];
  country: string;
  alpha_two_code: string;
}

export default function Home() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState<University[]>([]);

  const handleSearch = async () => {
    if (!country.trim()) {
      alert("Search a country");
      return;
    }

    try {
      const res = await fetch(`http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`);
      const data: University[] = await res.json();
      setUniversities(data);
    } catch (error) {
      alert("Error al buscar universidades");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>search universities</h1>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Ej: Ecuador"
      />
      <button onClick={handleSearch}>
        Buscar
      </button>

      <ul>
        {universities.map((uni, index) => (
          <li key={index}>
            <p><strong>Name:</strong> {uni.name}</p>
            <p><strong>Coutry:</strong> {uni.country}</p>
            <p><strong>Alpha two code:</strong> {uni.alpha_two_code}</p>
            <p><strong>state-province:</strong> {uni.state_province || 'Null'}</p>
            <p><strong>Domains:</strong> {uni.domains.join(', ')}</p>
            <p>
              <strong>Web:</strong>{' '}
              {uni.web_pages.map((url, i) => (
                <span key={i}>
                  <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>{' '}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
