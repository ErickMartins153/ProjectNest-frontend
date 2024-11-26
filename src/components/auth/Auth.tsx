import Logo from "../UI/Logo.tsx";
import Login from "./Login.tsx";
import Register from "./Register.tsx";

type AuthProps = {
  Child: typeof Login | typeof Register;
}

export default function Auth({ Child }: AuthProps) {
  return (
    <div id="root-auth" className="flex flex-col bg-black h-screen overflow-auto p-8">
      <div id="container-auth" className="flex flex-col items-center w-[32%] h-max my-auto mx-auto">
        <Logo className="aspect-square h-36 mt-auto" />
        <div className="flex flex-col p-5 rounded-3xl space-y-2 bg-primary-color
          min-w-[240px] w-full mb-auto">
            <Child />
        </div>
      </div>
    </div>
  );
}
