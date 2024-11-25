import Logo from "../UI/Logo.tsx";
import Login from "./Login.tsx";
import Register from "./Register.tsx";

type AuthProps = {
  Child: typeof Login | typeof Register;
}

export default function Auth({ Child }: AuthProps) {
  return (
    <div className="bg-black h-screen overflow-auto">
      <div className="flex flex-col items-center w-full h-full mx-auto">
        <Logo className="aspect-square h-36 mt-auto" />
        <div className="flex-column p-5 rounded-3xl space-y-2 bg-primary-color
          min-w-[240px] w-[28%] mb-auto">
            <Child />
        </div>
      </div>
    </div>
  );
}
