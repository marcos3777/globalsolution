// app/cadastro/page.tsx
"use client";

export default function CadastroEmpresa() {
  const tiposDeEnergia = ["Solar", "Eólica", "Hidrelétrica", "Fóssil"];
  const estados = ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia"];

  return (
    <main className="bg-gradient-to-b from-blue-900 to-black min-h-screen p-6 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">(Página quando clicar seja parceira)</h1>

      <form className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
        {/* Nome Empresa */}
        <div>
          <label htmlFor="nome" className="block text-lg font-bold mb-1">
            Nome Empresa
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Digite o nome da empresa"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* CNPJ */}
        <div>
          <label htmlFor="cnpj" className="block text-lg font-bold mb-1">
            CNPJ
          </label>
          <input
            id="cnpj"
            type="text"
            placeholder="Digite o CNPJ"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Custo atual KWH */}
        <div>
          <label htmlFor="custo" className="block text-lg font-bold mb-1">
            Custo atual KWH
          </label>
          <input
            id="custo"
            type="number"
            placeholder="Digite o custo"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Tipo de Energia */}
        <div>
          <label htmlFor="energia" className="block text-lg font-bold mb-1">
            Tipo de energia
          </label>
          <select
            id="energia"
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

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block text-lg font-bold mb-1">
            Estado
          </label>
          <select
            id="estado"
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

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-bold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite o email"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Senha */}
        <div>
          <label htmlFor="senha" className="block text-lg font-bold mb-1">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
          >
            Solicitar cadastro
          </button>
          <button
            type="button"
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
          >
            Voltar ao menu
          </button>
        </div>
      </form>

      {/* Botão adicional */}
      <div className="mt-8">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-transform">
          Empresas na fila de cadastro
        </button>
      </div>
    </main>
  );
}
