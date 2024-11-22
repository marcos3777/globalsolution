// app/not-found.tsx

"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Página Não Encontrada</h2>
      <p className="notfound-text">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link href="/" className="notfound-link">
        Voltar para o Início
      </Link>
    </div>
  );
}
