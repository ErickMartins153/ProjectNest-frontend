import useAuth from "../../hooks/useAuth.ts";
import { useParams } from "react-router-dom";
import OwnProfile from "./OwnProfile.tsx";
import OtherProfile from "./OtherProfile.tsx";
import Navbar from "../../components/UI/Navbar.tsx";

export type ProfileProps = {
  uuid: string
}

export default function Profile() {
  const { usuario } = useAuth();
  const { uuid } = useParams();

  return (
    <div className="flex flex-col bg-black h-screen overflow-auto">
      <Navbar />
      {usuario?.uuid === uuid ? <OwnProfile/>
        : <OtherProfile uuid={uuid!}/>}
    </div>
  );
}