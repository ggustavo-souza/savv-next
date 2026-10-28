import Link from "next/link";
import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa6";
import { obterSessao } from "@/services/AuthCheck";
import MapaPrefeitura from "./MapaPrefeitura";

interface FooterProps {
  tipo?: "visitante" | "usuario" | "diretor" | "gerente" | "fiscal";
}

export default async function Footer({ tipo }: FooterProps = {}) {
  let userTipo = tipo;

  if (!userTipo) {
    const user = await obterSessao();
    if (user?.userId) {
      if (user.cargo === "gerente") {
        userTipo = "gerente";
      } else if (user.cargo === "diretor") {
        userTipo = "diretor";
      } else if (user.cargo === "fiscal") {
        userTipo = "fiscal";
      } else {
        userTipo = "usuario";
      }
    } else {
      userTipo = "visitante";
    }
  }

  const isLogado = userTipo !== "visitante";

  return (
    <footer className="w-full border-t border-gray-200 bg-primaria text-secundaria mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Esquerda: Redes Sociais e Telefone */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg text-secundaria">
              Prefeitura de Votorantim
            </h3>
            <div className="flex items-center gap-4 text-secundaria">
              <a
                href="https://www.facebook.com/prefeituravotorantim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Prefeitura de Votorantim"
                className="text-secundaria transition-opacity hover:opacity-80"
              >
                <FaFacebook size={26} />
              </a>
              <a
                href="https://www.instagram.com/prefeituradevotorantimoficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Prefeitura de Votorantim"
                className="text-secundaria transition-opacity hover:opacity-80"
              >
                <FaInstagram size={26} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-secundaria text-sm font-medium mt-1">
              <FaPhone className="w-4 h-4 shrink-0" />
              <a
                href="tel:+551533538533"
                className="transition-opacity hover:opacity-80"
              >
                (15) 3353-8533
              </a>
            </div>
          </div>

          {/* Centro: Navegação Condicional */}
          <div className="flex flex-col md:items-center">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-lg text-secundaria">
                Navegação
              </h3>
              <ul className="flex flex-col gap-2">
                {!isLogado ? (
                  <>
                    <li>
                      <Link
                        href="/"
                        className="font-medium text-secundaria transition-opacity hover:opacity-80"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/transparencia"
                        className="font-medium text-secundaria transition-opacity hover:opacity-80"
                      >
                        Transparência
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login/usuario"
                        className="font-medium text-secundaria transition-opacity hover:opacity-80"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/registrar"
                        className="font-medium text-secundaria transition-opacity hover:opacity-80"
                      >
                        Registrar
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/"
                        className="font-medium text-secundaria transition-opacity hover:opacity-80"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/transparencia"
                        className="font-medium text-secundaria transition-opacity hover:opacity-80"
                      >
                        Transparência
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/servicos"
                        className="font-medium text-secundaria transition-opacity hover:opacity-80"
                      >
                        Serviço
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/minhaconta"
                        className="font-medium text-secundaria transition-opacity hover:opacity-80"
                      >
                        Minha Conta
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Direita: Mapa Estático da Prefeitura */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg text-secundaria">
              Localização
            </h3>
            <div className="w-full max-w-sm">
              <MapaPrefeitura />
              <p className="text-xs text-secundaria mt-2 font-medium">
                Av. 31 de Março, 327 - Centro, Votorantim - SP
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
