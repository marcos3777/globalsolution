// Cabecalho.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Menu from "@/components/Menu/Menu";

const Cabecalho = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-blue-800 text-white flex items-center justify-between px-6" style={{ maxHeight: '120px' }}>
      <div className="flex items-center space-x-8">
        <div className="flex items-center">
          {/* Define o tamanho diretamente */}
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200} // Tamanho da largura do logo
            height={40} // Tamanho da altura do logo
            className="object-contain"
          />
        </div>
        <Link href="http://localhost:3000/" className="text-lg font-bold hover:underline">
          Simulador
        </Link>
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="text-lg font-bold hover:underline"
          >
            Empresa
          </button>
          {menuAberto && <Menu />}
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
