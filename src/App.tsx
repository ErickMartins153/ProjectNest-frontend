import { useState } from "react";
import {Link} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-black h-screen">
      <nav className="flex h-16 bg-primary-color shadow-bottom px-4">
        <div
          id="logo"
          className="flex w-[10%] items-center justify-center text-2xl text-white"
        >
          ProjectNest
        </div>
        <div id="pages" className="flex items-center justify-between">
          <a
            href="#home"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Início
          </a>
          <a
            href="#about"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sobre
          </a>
        </div>
        <div id="auth-options" className="flex items-center justify-center ml-auto space-x-3">
          <AuthButton text="Entrar" path="/login"/>
          <AuthButton text="Cadastrar" path="/register"/>
        </div>
      </nav>
    </div>
  );
}

type AuthButtonProps = {
  text: string;
  path: string;
}

function AuthButton({text, path}: AuthButtonProps) {
  return (
    <button className="rounded-md px-3 py-2 bg-secondaryColor text-sm font-medium text-white hover:bg-blue-700">
      {text}
    </button>
  );
}

export default App;

/*<>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src={viteLogo} className="logo" alt="Vite logo" />
    </a>
    <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
  </div>
  <h1>Vite + React</h1>
  <div className="card">
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
    <p>
      Edit <code>src/App.tsx</code> and save to test HMR
    </p>
  </div>
  <p className="read-the-docs">
    Click on the Vite and React logos to learn more
  </p>
</>*/
