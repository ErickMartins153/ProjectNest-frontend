import { Link, useNavigate } from "react-router-dom";
import LinkButton from "../UI/LinkButton.tsx";
import LoginLabelTextBox from "./components/LoginLabelTextBox.tsx";
import { MdCheckBoxOutlineBlank } from "@react-icons/all-files/md/MdCheckBoxOutlineBlank";
import { MdCheckBox } from "@react-icons/all-files/md/MdCheckBox";
import { useState } from "react";
import { UsuarioType } from "../../models/usuarios/enums/UsuarioType.ts";
import { RegisterData } from "../../store/AuthContext.tsx";
import useAuth from "../../hooks/useAuth.ts";

type TipoUsuario = "PESSOA" | "EMPRESA";

const defaultFormData = {
  apelido: "",
  email: "",
  nome: "",
  senha: "",
  sobrenome: "",
  type: UsuarioType.PESSOA,
};

export default function Registrar() {
  const [tipo, setTipo] = useState<TipoUsuario>("PESSOA");
  const [formData, setFormData] = useState<RegisterData>(defaultFormData);
  const { registrar } = useAuth();
  const navigate = useNavigate();

  async function cadastroHandler() {
    await registrar(formData);
    navigate("/auth/login");
  }

  function changeTipo(novoTipo: TipoUsuario) {
    setTipo(novoTipo);

    setFormData((prevData) => {
      const newData = {
        apelido: prevData.apelido,
        email: prevData.email,
        senha: prevData.senha,
        type: UsuarioType[novoTipo],
      };

      if (novoTipo === "EMPRESA") {
        return {
          ...newData,
          cnpj: "",
        };
      } else {
        return {
          ...newData,
          nome: "",
          sobrenome: "",
        };
      }
    });
  }

  function updateFormData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <h1 className="text-center">Registrar no ProjectNest</h1>
      <form className="flex flex-col items-center justify-center space-y-8">
        <LoginLabelTextBox
          inputName="apelido"
          labelName="Apelido"
          onChange={updateFormData}
        />
        <LoginLabelTextBox
          inputName="email"
          labelName="Email"
          onChange={updateFormData}
        />
        <LoginLabelTextBox
          inputName="senha"
          labelName="Senha"
          hidable
          onChange={updateFormData}
        />

        <div className="text-xl text-white me-auto ps-2">
          <h2 className="mb-2 text-2xl">Tipo de Cadastro</h2>
          <fieldset className="flex flex-wrap gap-4">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => changeTipo("PESSOA")}
            >
              {tipo === "PESSOA" ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              <label htmlFor="pessoa" className="cursor-pointer">
                Pessoa
              </label>
            </div>
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => changeTipo("EMPRESA")}
            >
              {tipo === "EMPRESA" ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              <label htmlFor="pessoa" className="cursor-pointer">
                Empresa
              </label>
            </div>
          </fieldset>
        </div>

        {tipo === "PESSOA" && (
          <PessoaRegisterInputs updateFormData={updateFormData} />
        )}
        {tipo === "EMPRESA" && (
          <EmpresaRegisterInputs updateFormData={updateFormData} />
        )}

        <LinkButton
          text="Cadastrar"
          className="text-xl w-36"
          onClick={() => cadastroHandler()}
        />
      </form>

      <div className="text-center">
        <p className="text-white">
          Já possui uma conta?{" "}
          <Link to="/auth/login" className="inline decorated text-blackr">
            Entrar
          </Link>
        </p>
      </div>
    </>
  );
}

function PessoaRegisterInputs({
  updateFormData,
}: {
  updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <LoginLabelTextBox
        inputName="nome"
        labelName="Nome"
        onChange={updateFormData}
      />
      <LoginLabelTextBox
        inputName="sobrenome"
        labelName="Sobrenome"
        onChange={updateFormData}
      />
      <LoginLabelTextBox
        inputName="pronomes"
        labelName="Pronomes"
        onChange={updateFormData}
      />
    </>
  );
}

function EmpresaRegisterInputs({
  updateFormData,
}: {
  updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <LoginLabelTextBox
        inputName="cnpj"
        labelName="CNPJ"
        onChange={updateFormData}
      />
    </>
  );
}
