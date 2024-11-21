// app/pagina-empresa/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function EmpresaPage() {
  interface Empresa {
    id: string;
    nome: string;
    cnpj: string;
    email: string;
    estado: string;
    kwh: string;
    tipoEnergia: string;
  }

  interface EmpresaLogada {
    empresa: Empresa;
  }

  const [empresaLogada, setEmpresaLogada] = useState<EmpresaLogada | null>(null);
  const navigate = useRouter();

  // Estados para o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    title: "",
    message: "",
    onConfirm: undefined,
  });

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

    // Configurar o conteúdo do modal para confirmação
    setModalContent({
      title: "Confirmação de Exclusão",
      message:
        "Tem certeza que deseja excluir sua conta? Você será redirecionado para a página inicial e precisará realizar o cadastro novamente.",
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/empresas/${empresaLogada.empresa.id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            localStorage.removeItem("empresaLogada");
            setModalContent({
              title: "Sucesso",
              message:
                "Conta excluída com sucesso. Você será redirecionado para a página inicial.",
            });
            // Redirecionar após um breve intervalo para mostrar a mensagem
            setTimeout(() => {
              navigate.push("/");
            }, 2000);
          } else {
            const errorData = await response.json();
            setModalContent({
              title: "Erro",
              message: errorData.message || "Erro ao excluir a conta. Tente novamente mais tarde.",
            });
          }
        } catch (error) {
          console.error("Erro ao excluir a conta:", error);
          setModalContent({
            title: "Erro",
            message: "Erro ao excluir a conta. Tente novamente mais tarde.",
          });
        }
      },
    });

    setIsModalOpen(true);
  };

  if (!empresaLogada) {
    return null;
  }

  const empresa = empresaLogada.empresa;

  return (
    <main className="bg-gradient-to-b from-blue-900 to-black min-h-screen p-6 text-white font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Título da Empresa Logada */}
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

      {/* Componente Modal */}
      {isModalOpen && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => setIsModalOpen(false)}
          onConfirm={modalContent.onConfirm}
        />
      )}
    </main>
  );
}

// Componente Modal
interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
