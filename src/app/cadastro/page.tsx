// app/cadastro/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Empresa, Login } from "@/types/type";
import { empresasAPI } from "@/utils/api";

export default function CadastroEmpresa() {
  const tiposDeEnergia = ["Solar", "Eólica", "Hidrelétrica", "Fóssil"];
  const estados = ["SP", "RJ", "MG", "BA"];

  
  const [empresa, setEmpresa] = useState<Empresa>({
    nome: "",
    cnpj: "",
    email: "",
    estado: "",
    kwh: 0,
    tipoEnergia: "",
  });

  const [login, setLogin] = useState<Omit<Login, "empresa" | "status">>({
    senha: "",
    cnpj: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setCarregando(true);
    setMensagem("");

    const data = {
      empresa: empresa,
      login: {
        senha: login.senha,
      },
    };

    try {
      await empresasAPI.create(data);
      setMensagem("Cadastro realizado com sucesso!");
      setEmpresa({
        nome: "",
        cnpj: "",
        email: "",
        estado: "",
        kwh: 0,
        tipoEnergia: "",
      });
      setLogin({
        senha: "",
        cnpj: "",
      });
    } catch (error: any) {
      console.error("Erro:", error);
      setMensagem(`Erro ao realizar cadastro: ${error.message || "Erro desconhecido"}`);
    } finally {
      setCarregando(false);
    }
  };

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      [id]: id === "kwh" ? parseInt(value) || 0 : value,
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [id]: value,
    }));
  };

  return (
    <main className="bg-gradient-to-b from-blue-900 to-black min-h-screen p-6 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Cadastro da Empresa para entrar na fila</h1>

      <form
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="nome" className="block text-lg font-bold mb-1">
            Nome Empresa
          </label>
          <input
            id="nome"
            type="text"
            value={empresa.nome}
            onChange={handleEmpresaChange}
            placeholder="Digite o nome da empresa"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="cnpj" className="block text-lg font-bold mb-1">
            CNPJ
          </label>
          <input
            id="cnpj"
            type="text"
            value={empresa.cnpj}
            onChange={(e) => {
              handleEmpresaChange(e);
              handleLoginChange(e);
            }}
            placeholder="Digite o CNPJ"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="kwh" className="block text-lg font-bold mb-1">
            Custo atual KWH
          </label>
          <input
            id="kwh"
            type="number"
            value={empresa.kwh}
            onChange={handleEmpresaChange}
            placeholder="Digite o custo"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="tipoEnergia" className="block text-lg font-bold mb-1">
            Tipo de energia
          </label>
          <select
            id="tipoEnergia"
            value={empresa.tipoEnergia}
            onChange={handleEmpresaChange}
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="" disabled>
              Selecione
            </option>
            {tiposDeEnergia.map((energia) => (
              <option key={energia} value={energia}>
                {energia}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="estado" className="block text-lg font-bold mb-1">
            Estado
          </label>
          <select
            id="estado"
            value={empresa.estado}
            onChange={handleEmpresaChange}
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="" disabled>
              Selecione
            </option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-bold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={empresa.email}
            onChange={handleEmpresaChange}
            placeholder="Digite o email"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="senha" className="block text-lg font-bold mb-1">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={login.senha}
            onChange={handleLoginChange}
            placeholder="Digite sua senha"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
          >
            Solicitar cadastro
          </button>
          <Link
            href="/"
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform text-center"
          >
            Voltar ao menu
          </Link>
        </div>

        {mensagem && (
          <div className="mt-4 text-center text-lg font-semibold">
            {mensagem}
          </div>
        )}

        {carregando && (
          <div className="mt-4 text-center text-lg font-semibold">
            Carregando...
          </div>
        )}
      </form>

      <div className="mt-8">
        <Link
          href="/cadastro/fila"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-transform text-center"
        >
          Empresas na fila de cadastro
        </Link>
      </div>
    </main>
  );
}
