import { Link } from "react-router-dom";
import LinkButton from "../UI/LinkButton.tsx";
import LoginLabelTextBox from "./components/LoginLabelTextBox.tsx";
import { MdCheckBoxOutlineBlank } from "@react-icons/all-files/md/MdCheckBoxOutlineBlank";
import { MdCheckBox } from "@react-icons/all-files/md/MdCheckBox";
import { useState } from "react";

type tipoUsuario = "pessoa" | "empresa"

export default function Registrar() {
  const [tipo, setTipo] = useState("pessoa")

  const changeTipo = (tipo2: tipoUsuario) => () => setTipo(tipo2);

  return (<>
    <h1 className="text-center">Registrar no ProjectNest</h1>
    <form className="flex flex-col items-center justify-center space-y-8">
      <LoginLabelTextBox inputName="apelido" labelName="Apelido" />
      <LoginLabelTextBox inputName="email" labelName="Email" />
      <LoginLabelTextBox inputName="password" labelName="Senha" />

      <div className="me-auto ps-2 text-xl text-white">
        <h2 className="mb-2 text-2xl">Tipo de Cadastro</h2>
        <fieldset className="flex flex-wrap gap-4">
          <div className="flex space-x-1 items-center cursor-pointer"
              onClick={changeTipo("pessoa")}>
            {tipo === "pessoa" ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
            <label htmlFor="pessoa" className="cursor-pointer">Pessoa</label>
          </div>
          <div className="flex space-x-1 items-center cursor-pointer"
              onClick={changeTipo("empresa")}>
            {tipo === "empresa" ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
            <label htmlFor="pessoa" className="cursor-pointer">Empresa</label>
          </div>
        </fieldset>
      </div>

      {tipo === "pessoa" && <PessoaRegisterInputs/>}
      {tipo === "empresa" && <EmpresaRegisterInputs/>}

      <LinkButton
        text="Cadastrar"
        path="#api/login"
        className="w-36 text-xl"
      />
    </form>

    <div className="text-center">
      <p className="text-white">
        Já possui uma conta?{" "}
        <Link to="/auth/login" className="decorated text-blackr inline">
          Entrar
        </Link>
      </p>
    </div>
  </>);
}

function PessoaRegisterInputs() {
  return (<>
    <LoginLabelTextBox inputName="nome" labelName="Nome"/>
    <LoginLabelTextBox inputName="sobrenome" labelName="Sobrenome"/>
    <LoginLabelTextBox inputName="pronomes" labelName="Pronomes"/>
  </>);
}

function EmpresaRegisterInputs() {
  return (<>
    <LoginLabelTextBox inputName="cnpj" labelName="CNPJ"/>
  </>);
}
