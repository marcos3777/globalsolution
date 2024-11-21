import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard: React.FC = () => {
  const [grafico, setGrafico] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrafico = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/dashboard");
        setGrafico(response.data.grafico);
      } catch (err) {
        console.error("Erro ao buscar o gráfico:", err); // Agora o erro é utilizado
      }
    };

    fetchGrafico();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {grafico ? (
        <img src={`data:image/png;base64,${grafico}`} alt="Gráfico de Consumo de Energia" />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default Dashboard;
