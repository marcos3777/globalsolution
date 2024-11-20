// app/pagina-empresa/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function EmpresaPage() {
  const [empresaLogada, setEmpresaLogada] = useState<any>(null);
  const navigate = useRouter(); 

  useEffect(() => {
    const empresaData = localStorage.getItem("empresaLogada");
    if (empresaData) {
      setEmpresaLogada(JSON.parse(empresaData));
    } else {
      navigate.push("/login");
    }
  }, [navigate]);

  const handleDelete = async () => {
    if (!empresaLogada) return;

    const confirmDelete = confirm(
      "Tem certeza que deseja excluir sua conta? Você será redirecionado para a página inicial e precisará realizar o cadastro novamente."
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/empresas/${empresaLogada.empresa.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          localStorage.removeItem("empresaLogada");
          alert("Conta excluída com sucesso. Você será redirecionado para a página inicial.");
          navigate.push("/");
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Erro ao excluir a conta. Tente novamente mais tarde.");
        }
      } catch (error) {
        console.error("Erro ao excluir a conta:", error);
        alert("Erro ao excluir a conta. Tente novamente mais tarde.");
      }
    }
  };

  if (!empresaLogada) {
    return null;
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
              {/* Ícone de Editar com Link */}
              <Link
                href={`/pagina-empresa/${empresa.id}`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Editar"
              >
                <FaEdit size={18} />
              </Link>
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
