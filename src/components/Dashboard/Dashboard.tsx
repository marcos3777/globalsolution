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
        setGrafico(data.grafico); // Armazena o gráfico
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