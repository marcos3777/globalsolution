// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Empresa } from "@/types/type";
import TipoEnergia from "@/components/TipoEnergia";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MapIcon, BuildingOfficeIcon, BoltIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [estado, setEstado] = useState<string>("");
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaAtual, setEmpresaAtual] = useState<string>("");
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null);
  const [valorConta, setValorConta] = useState<string>("");
  const [empresasCalculadas, setEmpresasCalculadas] = useState<EmpresaCalculada[]>([]);

  type EmpresaCalculada = Empresa & {
    valorEstimado: number;
    diferencaPercentual: number;
    status: "maisBarato" | "maisCaro" | "igual";
  };

  const estados = ["SP", "RJ", "MG", "BA"];

  useEffect(() => {
    if (estado) {
      fetch(`http://localhost:8080/api/empresas/estado/${estado}`)
        .then((response) => response.json())
        .then((data: Empresa[]) => {
          setEmpresas(data);
          setEmpresaAtual("");
          setEmpresaSelecionada(null);
          setEmpresasCalculadas([]);
        })
        .catch((error) => {
          console.error("Erro ao buscar empresas:", error);
        });
    } else {
      setEmpresas([]);
      setEmpresaAtual("");
      setEmpresaSelecionada(null);
      setEmpresasCalculadas([]);
    }
  }, [estado]);

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmpresaId = e.target.value;
    setEmpresaAtual(selectedEmpresaId);
    const selectedEmpresaIdNumber = parseInt(selectedEmpresaId, 10);
    const selectedEmpresa = empresas.find(
      (empresa) => empresa.id === selectedEmpresaIdNumber
    );
    setEmpresaSelecionada(selectedEmpresa || null);
    setEmpresasCalculadas([]);
  };

  const calcularValores = () => {
    if (!empresaSelecionada || !valorConta) {
      alert(
        "Por favor, selecione sua empresa atual e insira o valor da conta de luz."
      );
      return;
    }

    const valorContaNumero = parseFloat(valorConta);
    if (isNaN(valorContaNumero) || valorContaNumero <= 0) {
      alert("Por favor, insira um valor válido para a conta de luz.");
      return;
    }

    const custoPorKwh = valorContaNumero / empresaSelecionada.kwh;

    const empresasComValores: EmpresaCalculada[] = empresas.map((empresa) => {
      const valorEstimado = custoPorKwh * empresa.kwh;

      const diferencaPercentual =
        ((valorEstimado - valorContaNumero) / valorContaNumero) * 100;

      let status: "maisBarato" | "maisCaro" | "igual";
      if (valorEstimado < valorContaNumero) {
        status = "maisBarato";
      } else if (valorEstimado > valorContaNumero) {
        status = "maisCaro";
      } else {
        status = "igual";
      }

      return {
        ...empresa,
        valorEstimado,
        diferencaPercentual,
        status,
      };
    });

    empresasComValores.sort((a, b) => a.valorEstimado - b.valorEstimado);

    setEmpresasCalculadas(empresasComValores);
  };

  const getStatusColor = (status: "maisBarato" | "maisCaro" | "igual") => {
    switch (status) {
      case "maisBarato":
        return "text-green-500";
      case "maisCaro":
        return "text-red-500";
      case "igual":
        return "text-yellow-500";
      default:
        return "text-white";
    }
  };

  return (
    <main className="bg-gradient-to-b from-blue-900 to-black min-h-screen p-6 text-white flex flex-col items-center font-inter">
      <div className="w-full max-w-7xl">
        {/* Título Principal */}
        <h1 className="text-4xl font-extrabold mb-12 text-center">
          Compare e Escolha a Melhor Opção de Energia
        </h1>

        {/* Dropdowns */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {/* Seleção de Estado */}
          <div className="relative">
            <label htmlFor="estado" className="block text-lg font-bold mb-2">
              Selecione seu estado
            </label>
            <div className="relative">
              <MapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              <select
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-64 p-3 pl-10 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-green-500 focus:outline-none appearance-none"
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
          </div>

          {/* Seleção de Empresa */}
          <div className="relative">
            <label htmlFor="empresa" className="block text-lg font-bold mb-2">
              Escolha sua empresa atual
            </label>
            <div className="relative">
              <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              <select
                id="empresa"
                value={empresaAtual}
                onChange={handleEmpresaChange}
                className="w-64 p-3 pl-10 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-green-500 focus:outline-none appearance-none"
                disabled={empresas.length === 0}
              >
                <option value="" disabled>
                  Sua empresa atual
                </option>
                {empresas.map((empresa) => (
                  <option
                    key={empresa.id ?? ""}
                    value={empresa.id?.toString() ?? ""}
                  >
                    {empresa.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Valor da Última Conta de Luz e Botão Calcular */}
          <div className="relative">
            <label htmlFor="valorConta" className="block text-lg font-bold mb-2">
              Valor da sua última conta de luz
            </label>
            <div className="flex">
              <div className="relative w-48">
                <BoltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                <input
                  id="valorConta"
                  type="number"
                  value={valorConta}
                  onChange={(e) => setValorConta(e.target.value)}
                  placeholder="Digite o valor"
                  className="w-full p-3 pl-10 rounded-l-md bg-gray-800 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <button
                onClick={calcularValores}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-r-md hover:bg-green-600 transition-colors"
              >
                Calcular
              </button>
            </div>
          </div>
        </div>

        {/* Exibição da Empresa Selecionada */}
        {empresaSelecionada && (
          <div className="mb-12 text-center bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Sua Empresa Atual</h2>
            <p className="text-lg font-bold">{empresaSelecionada.nome}</p>
            <p className="text-sm text-gray-300 mb-2">
              CNPJ: {empresaSelecionada.cnpj}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              Estado: {empresaSelecionada.estado}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              KWH: {empresaSelecionada.kwh}
            </p>
            <p className="text-sm text-gray-300 mb-2 flex items-center gap-2 justify-center">
              Tipo de Energia:{" "}
              <TipoEnergia tipoEnergia={empresaSelecionada.tipoEnergia} />
            </p>
            {/* Valor da Conta de Luz */}
            {valorConta && (
              <p className="text-lg font-bold text-gray-300 mt-4">
                Seu consumo atual: R$ {parseFloat(valorConta).toFixed(2)}
              </p>
            )}
          </div>
        )}

        {/* Cards das Outras Empresas */}
        {empresas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {(empresasCalculadas.length > 0 ? empresasCalculadas : empresas)
              .filter((empresa) => empresa.id?.toString() !== empresaAtual)
              .map((empresa) => (
                <div
                  key={empresa.id}
                  className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
                >
                  <h2 className="text-2xl font-bold mb-4">{empresa.nome}</h2>
                  <p className="text-sm text-gray-400 mb-2">
                    CNPJ: {empresa.cnpj}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    Estado: {empresa.estado}
                  </p>
                  <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                    Tipo de Energia:{" "}
                    <TipoEnergia tipoEnergia={empresa.tipoEnergia} />
                  </p>
                  {empresasCalculadas.length > 0 && (
                    <>
                      {/* Novo campo: Valor Estimado com Tooltip */}
                      <p
                        className={`text-lg font-bold mb-2 ${getStatusColor(
                          (empresa as EmpresaCalculada).status
                        )} underline cursor-pointer`}
                        data-tooltip-id={`tooltip-${empresa.id}`}
                      >
                        Valor estimado: R${" "}
                        {(empresa as EmpresaCalculada).valorEstimado.toFixed(2)}
                      </p>
                      <Tooltip
                        id={`tooltip-${empresa.id}`}
                        content={
                          (empresa as EmpresaCalculada).status === "maisBarato"
                            ? "Você pagaria menos com esta empresa."
                            : (empresa as EmpresaCalculada).status === "maisCaro"
                            ? "Você pagaria mais com esta empresa."
                            : "Você pagaria o mesmo valor com esta empresa."
                        }
                      />
                      {/* Diferença Percentual */}
                      <p className="text-sm text-gray-400 mb-4">
                        {(empresa as EmpresaCalculada).status === "maisBarato" &&
                          `Economia de ${Math.abs(
                            (empresa as EmpresaCalculada).diferencaPercentual
                          ).toFixed(1)}%`}
                        {(empresa as EmpresaCalculada).status === "maisCaro" &&
                          `Aumento de ${(empresa as EmpresaCalculada).diferencaPercentual.toFixed(
                            1
                          )}%`}
                        {(empresa as EmpresaCalculada).status === "igual" &&
                          "Você pagaria o mesmo valor."}
                      </p>
                    </>
                  )}
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300">
                    Escolher esta empresa
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
