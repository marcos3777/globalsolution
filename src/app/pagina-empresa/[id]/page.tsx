// app/pagina-empresa/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Empresa } from "@/types/type";

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

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/empresas/${params.id}`);
        if (response.ok) {
          const data: Empresa = await response.json();
          setEmpresa(data);
        } else {
          console.error("Erro ao buscar empresa");
        }
      } catch (err) {
        console.error("Erro ao buscar empresa:", err);
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
      const response = await fetch(`http://localhost:8080/api/empresas/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: empresa.nome,
          email: empresa.email,
          estado: empresa.estado,
          kwh: empresa.kwh,
          tipoEnergia: empresa.tipoEnergia,
        }), 
      });

      if (response.ok) {
        alert("Empresa alterada com sucesso");

        const updatedEmpresa = { ...empresa };
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


        navigate.push("/pagina-empresa");
      } else {
        console.error("Falha ao realizar a alteração");
      }
    } catch (error) {
      console.error("Falha ao realizar a alteração: ", error);
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
    </div>
  );
}
