"use client";

import { useState, useEffect } from "react";
import { Empresa } from "@/types/type"; 

export default function FilaCadastro() {
  const [modalAberto, setModalAberto] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null);
  const [empresasPendentes, setEmpresasPendentes] = useState<Empresa[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchEmpresasPendentes = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const response = await fetch("http://localhost:8080/api/empresas/pendentes");
      if (response.ok) {
        const data: Empresa[] = await response.json();
        setEmpresasPendentes(data);
      } else {
        const errorData = await response.json();
        setErro(errorData.message || "Erro ao buscar empresas pendentes");
      }
    } catch (error) {
      console.error("Erro ao buscar empresas pendentes:", error);
      setErro("Erro ao buscar empresas pendentes");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchEmpresasPendentes();
  }, []);

  const abrirModal = (empresa: Empresa) => {
    setEmpresaSelecionada(empresa);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setEmpresaSelecionada(null);
    setModalAberto(false);
  };

  return (
    <main className="bg-gradient-to-b from-blue-900 to-black min-h-screen p-6 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Empresas na Fila de Cadastro</h1>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="text-red-500">{erro}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {empresasPendentes.map((empresa) => (
          <div
            key={empresa.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-110 transition-transform flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-2">{empresa.nome}</h2>
            <p className="text-sm text-gray-400">Estado: {empresa.estado}</p>
            <p className="text-sm text-gray-400 mb-4">Tipo de Energia: {empresa.tipoEnergia}</p>
            <button
              onClick={() => abrirModal(empresa)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalAberto && empresaSelecionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={fecharModal}
        >
          <div
            className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{empresaSelecionada.nome}</h2>
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-bold">CNPJ:</span> {empresaSelecionada.cnpj}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-bold">Custo Atual KWH:</span> {empresaSelecionada.kwh}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-bold">Tipo de Energia:</span> {empresaSelecionada.tipoEnergia}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-bold">Estado:</span> {empresaSelecionada.estado}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-bold">Email:</span> {empresaSelecionada.email}
            </p>
            <button
              onClick={fecharModal}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:scale-105 transition-transform w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Botão de ação adicional */}
      <div className="mt-8">
        <button
          onClick={fetchEmpresasPendentes}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-transform"
        >
          Atualizar Fila
        </button>
      </div>
    </main>
  );
}
