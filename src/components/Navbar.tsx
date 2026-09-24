import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  tipo: "visitante" | "usuario" | "diretor" | "gerente" | "fiscal"
}

export default function Navbar({ tipo }: NavbarProps) {
  return (
    <header className="w-full shadow-sm border-b h-fit border-gray-200 bg-primaria">
      <nav className="flex w-full justify-between px-10">
        <div className="relative h-18 sm:h-22 md:h-24 xl:h-26 w-34">
          <Link href={'/'}>
            <Image src="/SAVV_Logo_SemFundo.png" fill alt="SAVV Logo" className="object-cover" />
          </Link>
        </div>

        <ul className="flex items-center gap-6">
          <li>
            <Link href={'/'} className="hidden md:block font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
              Home
            </Link>
          </li>
          <li>
            <Link href="/transparencia" className="hidden md:block font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
              Transparência
            </Link>
          </li>
          <li>
            <Link href="/servico" className="hidden md:block font-medium lg:text-md xl:text-lg text-secundaria transition-colors hover:opacity-80">
              Serviço
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="hidden md:block font-medium px-6 py-2 lg:text-md xl:text-lg rounded-xs shadow-sm bg-secundaria text-primaria transition-colors hover:opacity-90"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
