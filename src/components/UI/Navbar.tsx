import Logo from "./Logo.tsx";
import SearchBar from "./SearchBar.tsx";
import LinkButton from "./LinkButton.tsx";
import useAuth from "../../hooks/useAuth.ts";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { deslogar, usuario } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-color shadow-bottom">
      <div className="flex items-center justify-between h-24 px-4">
        <Logo className="w-24" />

        <button
          className="block text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
          className="items-center hidden space-x-3 md:flex"
        >
          {!usuario ? (
            <>
              <LinkButton text="Entrar" path="/auth/login" />
              <LinkButton text="Cadastrar" path="/auth/register" />
            </>
          ) : (
            <LinkButton text="Deslogar" onClick={deslogar} />
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col items-center py-4 space-y-4 md:hidden">
          <PagesDisplay pages={[{ text: "Sobre", url: "/about" }]} />
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
            className="px-3 py-2 text-xl text-white rounded-md hover:bg-blue-700"
          >
            {page.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
