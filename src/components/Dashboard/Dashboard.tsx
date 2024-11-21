import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Dashboard: React.FC = () => {
  const [grafico, setGrafico] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrafico = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/dashboard");
        setGrafico(response.data.grafico);
      } catch (err) {
        console.error("Erro ao buscar o gráfico:", err);
      }
    };

    fetchGrafico();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {grafico ? (
        <Image
          src={`data:image/png;base64,${grafico}`}
          alt="Gráfico de Consumo de Energia"
          width={800}
          height={600}
          priority
        />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
};

export default Dashboard;
