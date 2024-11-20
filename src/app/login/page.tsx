// app/login/page.tsx
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cnpj, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("empresaLogada", JSON.stringify(data));
        window.location.href = "/pagina-empresa"; 
      } else {
        const errorData = await response.json();
        alert(errorData.message || "CNPJ ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login");
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
          <div>
            <label
              htmlFor="cnpj"
              className="block text-lg font-bold text-white mb-1"
            >
              CNPJ
            </label>
            <input
              id="cnpj"
              type="text"
              placeholder="Digite seu CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="senha"
              className="block text-lg font-bold text-white mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Botão de Login */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
            >
              Entrar
            </button>
          </div>
        </form>

        {/* Link para Cadastro */}
        <div className="mt-6 text-center">
          <p className="text-white">
            Ainda não tem conta?{" "}
            <a
              href="/cadastro"
              className="text-green-400 font-bold hover:underline"
            >
              Cadastre-se aqui
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
