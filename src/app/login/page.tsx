// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { FaBuilding, FaLock } from "react-icons/fa";
import { loginAPI } from "@/utils/api";

export default function LoginPage() {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useRouter();

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginAPI.login({ cnpj, senha });
      localStorage.setItem("empresaLogada", JSON.stringify(data));
      setModalMessage("Login bem-sucedido! Redirecionando...");
      setIsSuccess(true);
      setIsModalOpen(true);
      // Redirecionar após 1 segundo
      setTimeout(() => {
        navigate.push("/pagina-empresa");
      }, 1000);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setModalMessage(error instanceof Error ? error.message : "CNPJ ou senha inválidos.");
      setIsSuccess(false);
      setIsModalOpen(true);
    }
  };

  return (
    <main className="bg-gradient-to-b from-blue-900 to-black min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full space-y-6"
        >
{/* CNPJ */}
<div className="relative flex items-center">
  <FaBuilding className="absolute left-3 text-gray-400" />
  <input
    id="cnpj"
    type="text"
    placeholder="Digite seu CNPJ"
    value={cnpj}
    onChange={(e) => setCnpj(e.target.value)}
    className="w-full pl-10 p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
  />
</div>

{/* Senha */}
<div className="relative flex items-center">
  <FaLock className="absolute left-3 text-gray-400" />
  <input
    id="senha"
    type="password"
    placeholder="Digite sua senha"
    value={senha}
    onChange={(e) => setSenha(e.target.value)}
    className="w-full pl-10 p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
  />
</div>

          {/* Botão de Login */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform flex items-center justify-center space-x-2"
            >
              <FaSignInAlt />
              <span>Entrar</span>
            </button>
          </div>
        </form>

        {/* Link para Cadastro */}
        <div className="mt-6 text-center">
          <p className="text-white">
            Ainda não tem conta?{" "}
            <Link
              href="/cadastro"
              className="text-green-400 font-bold hover:underline"
            >
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>

      {/* Componente Modal */}
      {isModalOpen && (
        <Modal
          message={modalMessage}
          isSuccess={isSuccess}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
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
