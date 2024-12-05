import LinkButton from "../UI/LinkButton.tsx";
import { Link, useNavigate } from "react-router-dom";
import LoginLabelTextBox from "./components/LoginLabelTextBox.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { Credenciais } from "../../store/AuthContext.tsx";
import useAuth from "../../hooks/useAuth.ts";

export default function Login() {
  const navigate = useNavigate();
  const { usuario, logar } = useAuth();
  const [credenciais, setCredenciais] = useState<Credenciais>({
    email: "",
    senha: "",
  });

  useEffect(() => {
    if (usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  function onChangeHandler<T extends keyof Credenciais>(
    field: T,
    value: ChangeEvent<HTMLInputElement>,
  ) {
    setCredenciais((prevState) => ({
      ...prevState,
      [field]: value.target.value,
    }));
  }

  function loginHandler() {
    if (!credenciais.email || !credenciais.senha) return;
    logar(credenciais);
    console.log("aqui");

    navigate("/");
  }

  return (
    <>
      <h1 className="text-center">Entrar no ProjectNest</h1>
      <form className="flex flex-col items-center justify-center space-y-8">
        <LoginLabelTextBox
          inputName="email"
          labelName="Email"
          onChange={onChangeHandler.bind(null, "email")}
        />
        <div className="flex w-full flex-col">
          <LoginLabelTextBox
            inputName="senha"
            labelName="Senha"
            hidable={true}
            onChange={onChangeHandler.bind(null, "senha")}
          />
          <Link
            to="/redefinir-senha"
            className="decorated ms-auto inline-block pe-2 text-black"
          >
            Esqueci minha senha
          </Link>
        </div>
        <LinkButton
          text="Entrar"
          onClick={() => loginHandler()}
          className="w-36 text-xl"
        />
      </form>

      <div className="text-center">
        <p className="text-white">
          Não tem uma conta?
          <Link to="/auth/register" className="decorated text-blackr inline">
            Cadastrar
          </Link>
        </p>
      </div>
    </>
  );
}
