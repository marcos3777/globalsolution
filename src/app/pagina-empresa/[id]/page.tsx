// app/pagina-empresa/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Empresa } from "@/types/type";
import { empresasAPI } from "@/utils/api";

export default function EditarEmpresa({ params }: { params: { id: number } }) {
  const navigate = useRouter();

  const [empresa, setEmpresa] = useState<Empresa>({
    id: 0,
    nome: "",
    cnpj: "",
    email: "",
    estado: "",
    kwh: 0,
    tipoEnergia: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const data = await empresasAPI.getById(params.id);
        setEmpresa(data);
      } catch (error) {
        setModalMessage("Erro ao buscar empresa.");
        setIsSuccess(false);
        setIsModalOpen(true);
      }
    };
    fetchEmpresa();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedEmpresa = await empresasAPI.update(params.id, {
        nome: empresa.nome,
        email: empresa.email,
        estado: empresa.estado,
        kwh: empresa.kwh,
        tipoEnergia: empresa.tipoEnergia,
      });
      
      setModalMessage("Empresa alterada com sucesso!");
      setIsSuccess(true);
      setIsModalOpen(true);

      const empresaLogada = JSON.parse(localStorage.getItem("empresaLogada") || "{}");
      empresaLogada.empresa = updatedEmpresa;
      localStorage.setItem("empresaLogada", JSON.stringify(empresaLogada));

      setEmpresa({
        id: 0,
        nome: "",
        cnpj: "",
        email: "",
        estado: "",
        kwh: 0,
        tipoEnergia: "",
      });

     
      setTimeout(() => {
        navigate.push("/pagina-empresa");
      }, 1000);
    } catch (_error) {
      setModalMessage("Falha ao realizar a alteração.");
      setIsSuccess(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-black min-h-screen flex flex-col items-center justify-center p-6 text-white font-inter">
      <h1 className="text-3xl font-bold mb-6">Editar Empresa</h1>

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-bold mb-2">Nome</label>
            <input
              type="text"
              id="idNome"
              name="nome"
              value={empresa.nome}
              onChange={handleChange}
              placeholder="Nome da empresa"
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-bold mb-2">CNPJ</label>
            <input
              type="text"
              id="idCnpj"
              name="cnpj"
              value={empresa.cnpj}
              placeholder="CNPJ da empresa"
              disabled
              className="w-full p-3 rounded-md bg-gray-700 text-gray-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-lg font-bold mb-2">Email</label>
            <input
              type="email"
              id="idEmail"
              name="email"
              value={empresa.email}
              onChange={handleChange}
              placeholder="Email da empresa"
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-bold mb-2">Estado</label>
            <input
              type="text"
              id="idEstado"
              name="estado"
              value={empresa.estado}
              onChange={handleChange}
              placeholder="Estado"
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-bold mb-2">Custo Atual KWH</label>
            <input
              type="number"
              id="idKwh"
              name="kwh"
              value={empresa.kwh}
              onChange={handleChange}
              placeholder="Custo Atual KWH"
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-bold mb-2">Tipo de Energia</label>
            <select
              id="idTipoEnergia"
              name="tipoEnergia"
              value={empresa.tipoEnergia}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">Selecione</option>
              <option value="Solar">Solar</option>
              <option value="Eólica">Eólica</option>
              <option value="Hidrelétrica">Hidrelétrica</option>
              <option value="Termoelétrica">Termoelétrica</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 rounded-md hover:scale-105 transition-transform"
            >
              Alterar
            </button>
          </div>
        </form>
      </div>

      {/* Componente Modal */}
      {isModalOpen && (
        <Modal
          message={modalMessage}
          isSuccess={isSuccess}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

// Componente Modal
interface ModalProps {
  message: string;
  isSuccess: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, isSuccess, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md ${
          isSuccess ? "border-t-4 border-green-500" : "border-t-4 border-red-500"
        }`}
      >
        <p className={`text-white text-lg ${isSuccess ? "" : "text-red-400"}`}>
          {message}
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              isSuccess
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white transition-colors`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
