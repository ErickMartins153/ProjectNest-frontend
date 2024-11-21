import Logo from "../UI/Logo.tsx";
import TextBox from "../UI/TextBox.tsx";
import LinkButton from "../UI/LinkButton.tsx";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const labelClassName: string = "ps-3 text-white text-xl mb-2 inline-block";

  return (
    <div className="bg-black flex flex-col justify-center align-middle items-center h-screen">

      <Logo className="aspect-square h-36 "/>

      <div className="p-5 rounded-3xl bg-primary-color w-[28%] h-[40%]">
        <h1 className="text-center">Entrar no ProjectNest</h1>
        <form className="flex flex-col justify-center space-y-8 items-center h-[80%]">
          <div>
            <label htmlFor="email" className={labelClassName}>Email</label>
            <TextBox id="email" name="email"></TextBox>
          </div>
          <div>
            <div className="flex">
              <label htmlFor="email" className={labelClassName}>Senha</label>
              <Link to="/redefinir-senha" className="py-1 ml-auto pe-3 mb-2
                  text-center decorated text-black">
                Esqueci minha senha
              </Link>
            </div>
            <TextBox id="email" name="senha"></TextBox>
          </div>
          <LinkButton text="Entrar" path="#api/login" className="w-36 text-xl" />
        </form>

        <div className="border-2 text-center">
          <p className="text-white">Não tem uma conta? {' '}
            <Link to="/register" className="inline decorated text-blackr">
              Cadastre-se
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}
