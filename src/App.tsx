import ProjetoList from "./components/projeto/ProjetoList";
import Header from "./components/UI/Header";
import UserLabel from "./components/UI/UserLabel";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col border-2 px-6">
        <UserLabel />
        <ProjetoList projetos={new Array(12).fill(0)} />
      </div>
    </>
  );
}

export default App;
