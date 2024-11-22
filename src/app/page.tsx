// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Empresa } from "@/types/type";
import TipoEnergia from "@/components/TipoEnergia";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MapIcon, BuildingOfficeIcon, BoltIcon, IdentificationIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [estado, setEstado] = useState<string>("");
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaAtual, setEmpresaAtual] = useState<string>("");
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null);
  const [valorConta, setValorConta] = useState<string>("");
  const [empresasCalculadas, setEmpresasCalculadas] = useState<EmpresaCalculada[]>([]);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");

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
      setModalMessage("Por favor, selecione sua empresa atual e insira o valor da conta de luz.");
      setIsModalOpen(true);
      return;
    }

    const valorContaNumero = parseFloat(valorConta);
    if (isNaN(valorContaNumero) || valorContaNumero <= 0) {
      setModalMessage("Por favor, insira um valor válido para a conta de luz.");
      setIsModalOpen(true);
      return;
    }

    const custoPorKwh = valorContaNumero / parseFloat(empresaSelecionada.kwh.toString());

    const empresasComValores: EmpresaCalculada[] = empresas.map((empresa) => {
      const valorEstimado = custoPorKwh * parseFloat(empresa.kwh.toString());

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
    <main className="main-container">
    <div className="content-container">
      {/* Título Principal */}
      <h1 className="main-title">
        Compare e Escolha a Melhor Opção de Energia
      </h1>

      {/* Dropdowns */}
      <div className="dropdowns-container">
        {/* Seleção de Estado */}
        <div className="dropdown-item">
          <label htmlFor="estado" className="dropdown-label">
            Selecione seu estado
          </label>
          <div className="dropdown-input-container">
            <MapIcon className="icon" />
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="dropdown-select"
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
        <div className="dropdown-item">
          <label htmlFor="empresa" className="dropdown-label">
            Escolha sua empresa atual
          </label>
          <div className="dropdown-input-container">
            <BuildingOfficeIcon className="icon" />
            <select
              id="empresa"
              value={empresaAtual}
              onChange={handleEmpresaChange}
              className="dropdown-select"
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
        <div className="dropdown-item">
          <label htmlFor="valorConta" className="dropdown-label">
            Valor da sua última conta de luz
          </label>
          <div className="input-button-container">
            <div className="input-container">
              <BoltIcon className="icon" />
              <input
                id="valorConta"
                type="number"
                value={valorConta}
                onChange={(e) => setValorConta(e.target.value)}
                placeholder="Digite o valor"
                className="input-field"
              />
            </div>
            <button onClick={calcularValores} className="calculate-button">
              Calcular
            </button>
          </div>
        </div>
      </div>

      {/* Exibição da Empresa Selecionada */}
      {empresaSelecionada && (
        <div className="empresa-selecionada-container">
          <h2 className="empresa-selecionada-title">Sua Empresa Atual</h2>
          <p className="empresa-selecionada-nome">
            {empresaSelecionada.nome}
          </p>
          <p className="empresa-selecionada-info">
            <IdentificationIcon className="icon-small" />
            CNPJ: {empresaSelecionada.cnpj}
          </p>
          <p className="empresa-selecionada-info">
            <MapIcon className="icon-small" />
            Estado: {empresaSelecionada.estado}
          </p>
          <p className="empresa-selecionada-info">
            <BoltIcon className="icon-small" />
            KWH: {empresaSelecionada.kwh}
          </p>
          <p className="empresa-selecionada-info">
            Tipo de Energia:{" "}
            <TipoEnergia tipoEnergia={empresaSelecionada.tipoEnergia} />
          </p>
          {/* Valor da Conta de Luz */}
          {valorConta && (
            <p className="empresa-selecionada-consumo">
              Seu consumo atual: R$ {parseFloat(valorConta).toFixed(2)}
            </p>
          )}
        </div>
      )}

      {/* Cards das Outras Empresas */}
      {empresas.length > 0 && (
        <div className="empresas-container">
          {(empresasCalculadas.length > 0 ? empresasCalculadas : empresas)
            .filter((empresa) => empresa.id?.toString() !== empresaAtual)
            .map((empresa) => (
              <div key={empresa.id} className="empresa-card">
                <h2 className="empresa-card-title">
                  <BuildingOfficeIcon className="icon-large" />
                  {empresa.nome}
                </h2>
                <p className="empresa-card-info">
                  <IdentificationIcon className="icon-small" />
                  CNPJ: {empresa.cnpj}
                </p>
                <p className="empresa-card-info">
                  <MapIcon className="icon-small" />
                  Estado: {empresa.estado}
                </p>
                <p className="empresa-card-info">
                  <BoltIcon className="icon-small" />
                  KWH: {empresa.kwh}
                </p>
                <p className="empresa-card-info">
                  Tipo de Energia:{" "}
                  <TipoEnergia tipoEnergia={empresa.tipoEnergia} />
                </p>
                {empresasCalculadas.length > 0 && (
                  <>
                    {/* Novo campo: Valor Estimado com Tooltip */}
                    <p
                      className={`empresa-card-valor-estimado ${getStatusColor(
                        (empresa as EmpresaCalculada).status
                      )}`}
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
                    <p className="empresa-card-diferenca">
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
              </div>
            ))}
        </div>
      )}
    </div>

    {/* Componente Modal */}
    {isModalOpen && (
      <Modal
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    )}
  </main>
);
}

// Componente Modal
interface ModalProps {
message: string;
onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
return (
  <div className="modal-overlay">
    <div className="modal-container">
      <p className="modal-message">{message}</p>
      <div className="modal-buttons">
        <button onClick={onClose} className="modal-close-button">
          Fechar
        </button>
      </div>
    </div>
  </div>
);
};