import SearchBar from "./UI/SearchBar.tsx";
import Logo from "./UI/Logo.tsx";
import LinkButton from "./UI/LinkButton.tsx";

export default function HomePage() {
  return (
    <div className="h-screen w-full bg-black">
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
          <LinkButton text="Entrar" path="/login" />
          <LinkButton text="Cadastrar" path="/register" />
        </div>
      </nav>
    </div>
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
