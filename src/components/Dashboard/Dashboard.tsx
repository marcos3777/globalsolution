"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard: React.FC = () => {
  const [grafico, setGrafico] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);

  // Função para buscar o gráfico do backend Python
  const fetchGrafico = async () => {
    setCarregando(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/dashboard");
      if (response.data && response.data.grafico) {
        setGrafico(`data:image/png;base64,${response.data.grafico}`);
      } else {
        setErro("Nenhum gráfico foi gerado.");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setErro("Erro ao carregar o gráfico: " + (err instanceof Error ? err.message : "Erro desconhecido"));
    } finally {
      setCarregando(false);
    }
  };

  // Hook para carregar o gráfico ao montar o componente
  useEffect(() => {
    fetchGrafico();
  }, []);