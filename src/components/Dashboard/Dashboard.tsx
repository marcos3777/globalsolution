import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [grafico, setGrafico] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGrafico = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/grafico');
      const data = await response.json();
      
      if (data.grafico) {
        setGrafico(data.grafico); // Armazena o gráfico Base64
      } else {
        setError('Erro ao carregar gráfico');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrafico();
  }, []);

  return (
    <div>
      <h1>Dashboard de Consumo de Energia</h1>
      <button onClick={fetchGrafico} disabled={loading}>
        {loading ? 'Carregando...' : 'Gerar Gráfico'}
      </button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
