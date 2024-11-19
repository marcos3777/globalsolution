// app/pagina-empresa/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function EmpresaPage() {
  const [empresaLogada, setEmpresaLogada] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Recuperar dados da empresa logada do localStorage
    const empresaData = localStorage.getItem("empresaLogada");
    if (empresaData) {
      setEmpresaLogada(JSON.parse(empresaData));
    } else {
      // Se não houver dados, redirecionar para a página de login
      window.location.href = "/login";
    }
  }, []);

  const handleDelete = async () => {
    if (!empresaLogada) return;

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Você será redirecionado para a página inicial e precisará realizar o cadastro novamente."
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/empresas/${empresaLogada.empresa.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Limpar o localStorage
          localStorage.removeItem("empresaLogada");
          alert("Conta excluída com sucesso. Você será redirecionado para a página inicial.");
          // Redirecionar para a página inicial
          window.location.href = "/";
        } else {
          alert("Erro ao excluir a conta. Tente novamente mais tarde.");
        }
      } catch (error) {
        console.error("Erro ao excluir a conta:", error);
        alert("Erro ao excluir a conta. Tente novamente mais tarde.");
      }
    }
  };

  const handleEdit = () => {
    if (!empresaLogada) return;
    // Redirecionar para a página de edição com o ID da empresa
    window.location.href = `/pagina-empresa/${empresaLogada.empresa.id}`;
  };

  if (!empresaLogada) {
    return null; // Ou uma mensagem de carregamento
  }

  const empresa = empresaLogada.empresa;

  return (
    <main className="bg-gradient-to-b from-blue-900 to-black min-h-screen p-6 text-white font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Nome da Empresa Logada */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Bem-vindo, {empresa.nome}
        </h1>
        <p className="text-center text-lg text-gray-300 mb-12">
          Aqui você pode gerenciar as informações da sua empresa.
        </p>

        {/* Card da Empresa */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{empresa.nome}</h2>
            <div className="flex space-x-4">
              {/* Ícone de Editar */}
              <button
                onClick={handleEdit}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Editar"
              >
                <FaEdit size={18} />
              </button>
              {/* Ícone de Excluir */}
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Excluir"
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          </div>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">CNPJ:</span> {empresa.cnpj}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Email:</span> {empresa.email}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Estado:</span> {empresa.estado}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Custo atual KWH:</span> {empresa.kwh}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Tipo de energia:</span>{" "}
            {empresa.tipoEnergia}
          </p>
        </div>
      </div>
    </main>
  );
}
