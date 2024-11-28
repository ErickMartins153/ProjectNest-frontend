import ProjetoList from "../components/projeto/ProjetoList";
import Header from "../components/UI/Header";
import UserLabel from "../components/UI/UserLabel";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full bg-black">
      <Header />
      <div className="flex flex-col px-6 py-4">
        <UserLabel />
        <ProjetoList projetos={new Array(12).fill(0)} />
      </div>
    </div>
  );
}
