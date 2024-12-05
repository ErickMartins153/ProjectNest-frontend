import useAuth from "../../hooks/useAuth.ts";
import { useParams } from "react-router-dom";
import OwnProfile from "./OwnProfile.tsx";
import OtherProfile from "./OtherProfile.tsx";

export type ProfileProps = {
  uuid: string;
};

export default function Profile() {
  const { usuario } = useAuth();
  const { uuid } = useParams();

  return (
    <div className="flex h-screen flex-col overflow-auto bg-black">
      {usuario?.uuid === uuid ? <OwnProfile /> : <OtherProfile uuid={uuid!} />}
    </div>
  );
}
