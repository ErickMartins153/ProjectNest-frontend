import LinkButton from "../UI/LinkButton.tsx";
import { Link } from "react-router-dom";
import LoginLabelTextBox from "./components/LoginLabelTextBox.tsx";

export default function Login() {
  return (
    <>
      <h1 className="text-center">Entrar no ProjectNest</h1>
      <form className="flex flex-col justify-center items-center space-y-8 ">
        <LoginLabelTextBox inputName="email" labelName="Email"/>
        <div className="flex flex-col w-full">
          <LoginLabelTextBox inputName="senha" labelName="Senha" hidable={true}/>
          <Link to="/redefinir-senha" className="inline-block ms-auto decorated
              text-black pe-2">
            Esqueci minha senha
          </Link>
        </div>
        <LinkButton text="Entrar" path="#api/login" className="w-36 text-xl" />
      </form>

      <div className="text-center">
        <p className="text-white">Não tem uma conta? {' '}
          <Link to="/auth/register" className="inline decorated text-blackr">
            Cadastrar
          </Link>
        </p>
      </div>
    </>
  );
}
