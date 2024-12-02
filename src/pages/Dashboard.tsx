import ProjetoList from "../components/projeto/ProjetoList";
import Navbar from "../components/UI/Navbar";
import UserLabel from "../components/UI/UserLabel";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full bg-black">
      <Navbar />
      <div className="flex flex-col px-6 py-4">
        <UserLabel />
        <ProjetoList />
      </div>
    </div>
  );
}
