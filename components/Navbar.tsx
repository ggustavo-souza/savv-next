'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModalLogOut from "./ModalLogOut";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
  tipo: "visitante" | "usuario" | "diretor" | "gerente" | "fiscal"
}

export default function Navbar({ tipo }: NavbarProps) {
  const [modalLogOutAberto, setModalLogOutAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="relative w-full shadow-sm border-b border-gray-200 bg-primaria z-50">
      <nav className="flex items-center justify-between px-6 md:px-10 py-3 md:py-4">
        <div className="relative h-14 w-28 sm:h-16 sm:w-32 md:h-18 md:w-36">
          <Link href="/" onClick={fecharMenu}>
            <Image src="/SAVV_Logo_SemFundo.png" fill alt="SAVV Logo" className="object-contain" />
          </Link>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <button
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          className="md:hidden text-secundaria text-2xl p-2 rounded-md hover:bg-black/5 transition-colors cursor-pointer"
          onClick={() => setMenuAberto((prev) => !prev)}
        >
          <FaBars className={`transition-transform duration-300 ${menuAberto ? "transform rotate-90" : "opacity-100"}`} />
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {tipo === "visitante" && (
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Transparência
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Serviço
                </Link>
              </li>
              <li>
                <Link
                  href="/login/usuario"
                  className="font-medium px-6 py-2 lg:text-md xl:text-lg rounded-xs shadow-sm bg-secundaria text-primaria transition-colors hover:opacity-90 inline-block"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}

          {tipo === "usuario" && (
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Transparência
                </Link>
              </li>
              <li>
                <Link
                  href="/minhaconta"
                  className="font-medium px-6 py-2 lg:text-md xl:text-lg rounded-xs shadow-sm bg-secundaria text-primaria transition-colors hover:opacity-90 inline-block"
                >
                  Minha Conta
                </Link>
              </li>
            </ul>
          )}

          {tipo === "diretor" && (
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Gerenciar Funcionários
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalLogOutAberto(true)}
                  className="font-medium px-6 py-2 lg:text-md xl:text-lg rounded-xs shadow-sm bg-secundaria text-primaria transition-colors hover:opacity-90 cursor-pointer"
                >
                  Sair
                </button>
              </li>
            </ul>
          )}

          {tipo === "fiscal" && (
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Painel
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalLogOutAberto(true)}
                  className="font-medium px-6 py-2 lg:text-md xl:text-lg rounded-xs shadow-sm bg-secundaria text-primaria transition-colors hover:opacity-90 cursor-pointer"
                >
                  Sair
                </button>
              </li>
            </ul>
          )}

          {tipo === "gerente" && (
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Painel
                </Link>
              </li>
              <li>
                <Link href="/admin/gerente/solicitacoes" className="font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
                  Solicitações
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalLogOutAberto(true)}
                  className="font-medium px-6 py-2 lg:text-md xl:text-lg rounded-xs shadow-sm bg-secundaria text-primaria transition-colors hover:opacity-90 cursor-pointer"
                >
                  Sair
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* Menu Colapsável Mobile com animação suave */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuAberto ? "max-h-96 opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 bg-primaria shadow-inner">
          {tipo === "visitante" && (
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/transparencia" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Transparência
                </Link>
              </li>
              <li>
                <Link href="/servicos" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Serviço
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/login/usuario"
                  onClick={fecharMenu}
                  className="block text-center font-medium px-6 py-2 rounded-xs shadow-sm bg-secundaria text-primaria hover:opacity-90"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}

          {tipo === "usuario" && (
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/transparencia" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Transparência
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/minhaconta"
                  onClick={fecharMenu}
                  className="block text-center font-medium px-6 py-2 rounded-xs shadow-sm bg-secundaria text-primaria hover:opacity-90"
                >
                  Minha Conta
                </Link>
              </li>
            </ul>
          )}

          {tipo === "diretor" && (
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Gerenciar Funcionários
                </Link>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    fecharMenu();
                    setModalLogOutAberto(true);
                  }}
                  className="w-full text-center font-medium px-6 py-2 rounded-xs shadow-sm bg-secundaria text-primaria hover:opacity-90 cursor-pointer"
                >
                  Sair
                </button>
              </li>
            </ul>
          )}

          {tipo === "fiscal" && (
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Painel
                </Link>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    fecharMenu();
                    setModalLogOutAberto(true);
                  }}
                  className="w-full text-center font-medium px-6 py-2 rounded-xs shadow-sm bg-secundaria text-primaria hover:opacity-90 cursor-pointer"
                >
                  Sair
                </button>
              </li>
            </ul>
          )}

          {tipo === "gerente" && (
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Painel
                </Link>
              </li>
              <li>
                <Link href="/admin/gerente/solicitacoes" onClick={fecharMenu} className="block font-medium text-secundaria hover:opacity-80 py-1">
                  Solicitações
                </Link>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    fecharMenu();
                    setModalLogOutAberto(true);
                  }}
                  className="w-full text-center font-medium px-6 py-2 rounded-xs shadow-sm bg-secundaria text-primaria hover:opacity-90 cursor-pointer"
                >
                  Sair
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {modalLogOutAberto && (
        <ModalLogOut onClose={() => setModalLogOutAberto(false)} />
      )}
    </header>
  );
}
