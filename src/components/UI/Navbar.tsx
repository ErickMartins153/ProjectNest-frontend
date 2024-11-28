import Logo from "./Logo.tsx";
import SearchBar from "./SearchBar.tsx";
import LinkButton from "./LinkButton.tsx";
import useAuth from "../../hooks/useAuth.ts";

export default function Navbar() {
  const { deslogar, usuario } = useAuth();
  return (
    <nav className="flex flex-wrap h-24 px-4 bg-primary-color shadow-bottom">
      <Logo className="w-24" />
      <PagesDisplay
        pages={[
          { text: "Início", url: "/home" },
          { text: "Projetos", url: "/projetos" },
          { text: "Sobre", url: "/about" },
        ]}
      />
      <div className="flex items-center justify-center ml-auto mr-5">
        <SearchBar />
      </div>
      <div
        id="auth-options"
        className="flex items-center justify-center space-x-3"
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
    <li id="pages" className="flex items-center ml-auto space-x-16">
      {pages.map((page) => (
        <a
          href={page.url}
          className="px-3 py-2 text-xl text-white rounded-md hover:bg-blue-700"
        >
          {page.text}
        </a>
      ))}
    </li>
  );
}
