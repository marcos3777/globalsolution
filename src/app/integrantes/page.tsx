// app/integrantes/page.tsx

"use client";

import Image from "next/image";

export default function Integrantes() {
  const membros = [
    {
      nome: "Marcos Vinicius Pereira de Oliveira",
      rm: "RM557252",
      foto: "/marcos.png",
      github: "https://github.com/marcos3777",
      linkedin: "https://www.linkedin.com/in/marcos-v-oliveiraa/",
    },
    {
      nome: "Felipe Melo de Sousa",
      rm: "RM556099",
      foto: "/felipe.png",
      github: "#",
      linkedin: "#",
    },
    {
      nome: "Leonardo Matheus Teixeira",
      rm: "RM556629",
      foto: "/leonardo.jpeg",
      github: "#",
      linkedin: "#",
    },
  ];

  const turma = "1TDSPW";

  return (
    <div className="integrantes-container">
      <h1 className="integrantes-title">Integrantes do Grupo</h1>
      <div className="integrantes-grid">
        {membros.map((membro, index) => (
          <div key={index} className="integrante-card">
            <Image
              src={membro.foto}
              alt={`${membro.nome} Foto`}
              width={128}
              height={128}
              className="integrante-foto"
            />
            <div className="integrante-info">
              <h2 className="integrante-nome">{membro.nome}</h2>
              <p className="integrante-rm">{membro.rm}</p>
              <p className="integrante-turma">Turma: {turma}</p>
            </div>
            <div className="integrante-links">
              <a
                href={membro.github}
                target="_blank"
                rel="noopener noreferrer"
                className="integrante-link"
              >
                GitHub
              </a>
              <a
                href={membro.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="integrante-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
