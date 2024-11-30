import useAuth from "../../hooks/useAuth.ts";
import Navbar from "../../components/UI/Navbar.tsx";
import Avatar from "../../components/UI/Avatar.tsx";
import LabelTextBox from "../../components/UI/LabelTextBox.tsx";
import { isPessoa } from "../../models/usuarios/Pessoa.ts";
import { Empresa } from "../../models/usuarios/Empresa.ts";
import LinkButton from "../../components/UI/LinkButton.tsx";
import { ChangeEvent, useState } from "react";
import { Usuario } from "../../models/usuarios/Usuario.ts";
import {
  EmpresaUpdate,
  fromEmpresa,
  fromPessoa, isEmpresaUpdate, isPessoaUpdate,
  PessoaUpdate,
  UsuarioUpdate
} from "../../models/usuarios/UsuarioUpdate.ts";
import { usuarioService } from "../../api/usuarioService.ts";


type OnFieldChange = (
  field: keyof (PessoaUpdate & EmpresaUpdate),
  event: ChangeEvent<HTMLInputElement>
) => void;


export default function UpdateProfile() {
  const { usuario, refresh } = useAuth();
  const [ usuarioUpdate, setUsuarioUpdate ] = useState<UsuarioUpdate>(
    getUsuarioUpdate(usuario as Usuario));

  const onFieldChange: OnFieldChange = (field, event) => {
    setUsuarioUpdate((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      })
    );
  };

  function sendUpdate() {
    usuarioService.updateUsuario(usuarioUpdate, usuario!.token)
    refresh(usuario!.token)
  }

  return (<>
    <div className="flex flex-col h-screen w-full bg-black overflow-auto">
      <Navbar />
      <div className="bg-primary-color h-max m-8 p-8 rounded-3xl">
        <h1 className="text-center mb-8">Atualizar Perfil</h1>
        <form className="flex flex-col items-center gap-8">
          <div className="aspect-square h-[12rem] sm:h-[16rem] md:h-[20rem]">
            <Avatar
              url="https://i.pinimg.com/736x/a8/63/95/a86395b7138d4b0e72ccd1aef82a6e06.jpg"
              alt="Ursão" size={"100%"}
            />
          </div>

          {getLabelTextBox(usuarioUpdate.apelido, "Apelido", "apelido", onFieldChange)}

          {(isPessoaUpdate(usuarioUpdate)) &&
            getPessoaFields(usuarioUpdate, onFieldChange)}

          {isEmpresaUpdate(usuarioUpdate) &&
            getEmpresaFields(usuarioUpdate, onFieldChange)}

          <LinkButton className="h-16 w-32 text-2xl" text="Atualizar" onClick={sendUpdate}/>
        </form>
      </div>
    </div>
  </>);
}

function getUsuarioUpdate(usuario: Usuario): UsuarioUpdate {
  if (isPessoa(usuario)) return fromPessoa(usuario);
  return fromEmpresa(usuario as Empresa);
}

function getLabelTextBox(
  valuePlaceHolder: string,
  label: string,
  name: keyof (PessoaUpdate & EmpresaUpdate),
  onChangeHandler: OnFieldChange
) {
  return (<>
    <LabelTextBox
      label={label}
      labelClassName="text-white text-[1.6em] ps-4"
      labelTextBoxClassName="!w-[40%]" id={name} name={name}
      placeHolder={valuePlaceHolder} value={valuePlaceHolder}
      onChange={onChangeHandler.bind(null, name)}/>
  </>);
}

function getPessoaFields(pessoa: PessoaUpdate, handler: OnFieldChange) {
  return (<>
    {getLabelTextBox(pessoa.nome, "Nome", "nome", handler)}
    {getLabelTextBox(pessoa.sobrenome, "Sobrenome", "sobrenome", handler)}
    {getLabelTextBox((pessoa.pronomes ? pessoa.pronomes : ""), "Pronomes", "pronomes", handler)}
  </>)
}

function getEmpresaFields(empresa: EmpresaUpdate, handler: OnFieldChange) {
  return (<>
    {getLabelTextBox(empresa.cnpj, "CNPJ", "cnpj", handler)}
  </>)
}
