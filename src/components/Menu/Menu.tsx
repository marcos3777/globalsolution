// Menu.tsx
"use client";

import Link from "next/link";

const Menu = () => {
  return (
    <div className="absolute top-full left-0 bg-white text-blue-800 border border-gray-300 rounded shadow-lg mt-2">
      <ul className="flex flex-col">
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer block">
          <Link href="/login">Login</Link>
        </li>
        <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer block">
          <Link href="/cadastro">Faça Parte</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
