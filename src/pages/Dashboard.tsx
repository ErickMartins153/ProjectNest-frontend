import ProjetoList from "../components/projeto/ProjetoList";
import UserLabel from "../components/UI/UserLabel";
import useAuth from "../hooks/useAuth";
import { useProjetos } from "../hooks/useProjetos";

export default function Dashboard() {
  const { usuario } = useAuth();
  const { projetos, refetchProjetos } = useProjetos({ token: usuario!.token });
  return (
    <div className="flex w-full flex-col bg-black">
      <div className="flex flex-col px-6 py-4">
        <UserLabel />
        <ProjetoList projetos={projetos} refetchProjetos={refetchProjetos} />
      </div>
    </div>
  );
}
