import useAuth from "../../hooks/useAuth";
import Avatar from "./Avatar";

export default function UserLabel() {
  const { usuario } = useAuth();
  console.log(usuario);

  return (
    <div className="flex flex-row gap-4 my-4">
      <Avatar
        url="https://i.pinimg.com/736x/a8/63/95/a86395b7138d4b0e72ccd1aef82a6e06.jpg"
        alt="Ursão"
      />
      <div className="flex flex-col justify-center">
        <h2 className="capitalize">{usuario?.apelido}</h2>
      </div>
    </div>
  );
}
