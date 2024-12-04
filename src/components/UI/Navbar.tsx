import Logo from "./Logo.tsx";
import SearchBar from "./SearchBar.tsx";
import LinkButton from "./LinkButton.tsx";
import useAuth from "../../hooks/useAuth.ts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { deslogar, usuario } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigator = useNavigate();

  async function onDeslogar() {
    await deslogar();
    navigator("/");
  }

  return (
    <nav className="bg-primary-color shadow-bottom">
      <div className="flex h-24 items-center justify-between px-4">
        <Logo className="w-24" />

        <button
          className="block text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="hidden md:flex md:items-center md:space-x-16">
          <PagesDisplay pages={[{ text: "Sobre", url: "/about" }]} />
          <SearchBar />
        </div>

        <div
          id="auth-options"
          className="hidden items-center space-x-3 md:flex"
        >
          {!usuario ? (
            <>
              <LinkButton text="Entrar" path="/auth/login" />
              <LinkButton text="Cadastrar" path="/auth/register" />
            </>
          ) : (
            <LinkButton text="Deslogar" onClick={onDeslogar} />
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col w-full items-center space-y-4 py-4 md:hidden">
          <div className="flex flex-col items-center space-y-3">
            {!usuario ? (
              <>
                <LinkButton text="Entrar" path="/auth/login" />
                <LinkButton text="Cadastrar" path="/auth/register" />
              </>
            ) : (
              <LinkButton text="Deslogar" onClick={deslogar} />
            )}
          </div>
          <div className="w-[40%] flex justify-center">
            <SearchBar />
          </div>
          <PagesDisplay pages={[{ text: "Sobre", url: "/about" }]} />
        </div>
      )}
    </nav>
  );
}

type PageOption = {
  text: string;
  url: string;
};

type PagesDisplayProps = {
  pages: PageOption[];
};

function PagesDisplay({ pages }: PagesDisplayProps) {
  return (
    <ul className="flex flex-col items-center md:flex-row md:space-x-16">
      {pages.map((page) => (
        <li key={page.url}>
          <Link
            to={page.url}
            className="rounded-md px-3 py-2 text-xl text-white hover:bg-blue-700"
          >
            {page.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
