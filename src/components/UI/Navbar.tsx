import Logo from "./Logo.tsx";
import SearchBar from "./SearchBar.tsx";
import LinkButton from "./LinkButton.tsx";

export default function Navbar() {
  return (
    <nav className="flex h-24 flex-wrap bg-primary-color px-4 shadow-bottom">
      <Logo className="w-24" />
      <PagesDisplay
        pages={[
          { text: "Início", url: "/home" },
          { text: "Projetos", url: "/projetos" },
          { text: "Sobre", url: "/about" },
        ]}
      />
      <div className="ml-auto mr-5 flex items-center justify-center">
        <SearchBar />
      </div>
      <div
        id="auth-options"
        className="flex items-center justify-center space-x-3"
      >
        <LinkButton text="Entrar" path="/auth/login" />
        <LinkButton text="Cadastrar" path="/auth/register" />
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
    <li id="pages" className="ml-auto flex items-center space-x-16">
      {pages.map((page) => (
        <a
          href={page.url}
          className="rounded-md px-3 py-2 text-xl text-white hover:bg-blue-700"
        >
          {page.text}
        </a>
      ))}
    </li>
  );
}