// app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [estado, setEstado] = useState("");
  const [empresaAtual, setEmpresaAtual] = useState("");

  const estados = ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia"];
  const empresas = ["Empresa A", "Empresa B", "Empresa C", "Empresa D"];

  return (
    <main className="bg-gradient-to-b from-blue-900 to-black min-h-screen p-6 text-white flex flex-col items-center">
      {/* Dropdowns */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <div>
          <label htmlFor="estado" className="block text-lg font-bold mb-2">
            Selecione seu estado
          </label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-64 p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="" disabled>
              Estado
            </option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="empresa" className="block text-lg font-bold mb-2">
            Escolha sua empresa atual
          </label>
          <select
            id="empresa"
            value={empresaAtual}
            onChange={(e) => setEmpresaAtual(e.target.value)}
            className="w-64 p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="" disabled>
              Sua empresa atual
            </option>
            {empresas.map((empresa) => (
              <option key={empresa} value={empresa}>
                {empresa}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Card 1 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Opção 1</h2>
          <p className="text-lg font-semibold">Empresa X</p>
          <p className="text-sm text-gray-300 mb-2">Com base na sua util</p>
          <p className="text-lg font-semibold">Usina elétrica</p>
          <p className="text-sm text-gray-300 mb-4">
            Dif. gasto <span className="font-bold">R$-10</span>
          </p>
          <p className="text-sm text-gray-300 mb-6">
            Pegada de carbono <span className="font-bold text-green-500">Menor</span>
          </p>
          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform">
            Simular resultados
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Opção 2</h2>
          <p className="text-lg font-semibold">Empresa Y</p>
          <p className="text-sm text-gray-300 mb-2">Com base na sua util</p>
          <p className="text-lg font-semibold">Usina elétrica - Rio</p>
          <p className="text-sm text-gray-300 mb-4">
            Dif. gasto <span className="font-bold">R$-15</span>
          </p>
          <p className="text-sm text-gray-300 mb-6">
            Pegada de carbono <span className="font-bold text-red-500">Maior</span>
          </p>
          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform">
            Simular resultados
          </button>
        </div>
      </div>
    </main>
  );
}
