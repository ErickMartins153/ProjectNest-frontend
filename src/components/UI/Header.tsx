import useAuth from "../../hooks/useAuth";
import Button from "./Button";

export default function Header() {
  const { deslogar } = useAuth();
  return (
    <header>
      <nav className="flex justify-end px-8 py-4 border-b-2 border-gray-300 shadow-sm">
        <ul className="flex flex-row items-center gap-8">
          <li key="perfil">
            <a href="">Perfil</a>
          </li>
          <li key="notificacoes">
            <a href="">Notificações</a>
          </li>
          <li>
            <Button
              text="Deslogar"
              selectable={false}
              onClick={() => deslogar()}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
