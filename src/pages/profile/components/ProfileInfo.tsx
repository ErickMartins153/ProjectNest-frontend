import Avatar from "../../../components/UI/Avatar.tsx";
import { Usuario } from "../../../models/usuarios/Usuario.ts";

type ProfileInfoProps = {
  usuario: Usuario;
};

export default function ProfileInfo({ usuario }: ProfileInfoProps) {
  return (
    <>
      <div className="aspect-square h-[12rem] sm:h-[16rem] md:h-[20rem]">
        <Avatar
          url="https://i.pinimg.com/736x/a8/63/95/a86395b7138d4b0e72ccd1aef82a6e06.jpg"
          alt="Ursão"
          size={"100%"}
        />
      </div>
      <div className="ps-4">
        <h2 className="text-6xl capitalize">{usuario!.apelido}</h2>
      </div>
    </>
  );
}
