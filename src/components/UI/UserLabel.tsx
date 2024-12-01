import useAuth from "../../hooks/useAuth";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

export default function UserLabel() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const goTo = (path: string) => () => navigate(path);

  return (
    <div
      className="flex flex-row self-start gap-4 my-4 cursor-pointer"
      onClick={goTo(`/profile/${usuario!.uuid}`)}
    >
      <Avatar
        url="https://i.pinimg.com/736x/a8/63/95/a86395b7138d4b0e72ccd1aef82a6e06.jpg"
        alt="Ursão"
      />
      <div
        className="flex flex-col justify-center cursor-pointer"
        onClick={goTo(`/profile/${usuario!.uuid}`)}
      >
        <h2 className="capitalize">{usuario?.apelido}</h2>
      </div>
    </div>
  );
}
