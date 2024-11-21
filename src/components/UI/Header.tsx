export default function Header() {
  return (
    <header>
      <nav className="flex justify-end border-b-2 border-gray-300 px-8 py-4 shadow-sm">
        <ul className="flex flex-row gap-8">
          <li key="perfil">
            <a href="">Perfil</a>
          </li>
          <li key="notificacoes">
            <a href="">Notificações</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
