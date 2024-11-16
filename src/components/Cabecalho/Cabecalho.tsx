// Cabecalho.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Menu from "@/components/Menu/Menu";

const Cabecalho = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setMenuAberto(false);
        }, 200);
    };

    const handleMouseEnter = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuAberto(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <header className="bg-blue-800 text-white flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-8">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="cursor-pointer"
                />
                <Link href="####" className="text-lg font-bold hover:underline">
                    Simulador
                </Link>
                <div
                    className="relative"
                    ref={menuRef}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                >
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
