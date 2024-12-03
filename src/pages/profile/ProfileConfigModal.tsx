import { createPortal } from "react-dom";
import LinkButton from "../../components/UI/LinkButton.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import UpdateProfile from "./UpdateProfile.tsx";
import RedefinePassword from "./RedefinePassword.tsx";

type Option = 0 | 1 | 2

type ProfileConfigModalProps = {
  toggleModal: () => void
}

export default function ProfileConfigModal({ toggleModal }: ProfileConfigModalProps) {
  const [option, setOption] = useState<Option>(0);

  return createPortal(
    <div id="blur-bg" className="fixed w-screen h-screen z-50 backdrop-blur">
      <div id="dark-bg" className="fixed w-full h-full bg-black/50" onClick={toggleModal}></div>
      <div className="flex flex-col h-full items-center overflow-auto py-8">
        <div className="relative flex flex-col justify-center items-center
            text-white z-10 gap-4 bg-primary-color h-max w-96 my-auto p-8
            rounded-3xl">
          <button
            className="absolute text-white right-4 top-2 hover:text-gray-800"
            onClick={toggleModal}>
            ✕
          </button>
          {option === 0 && <OptionsDisplay setOption={setOption}/>}
          {option === 1 && <UpdateProfile/>}
          {option === 2 && <RedefinePassword/>}
        </div>
      </div>
    </div>,
    document.getElementById("modal")!);
}

type OptionsDisplayProps = {
  setOption: Dispatch<SetStateAction<Option>>
}

function OptionsDisplay({ setOption }: OptionsDisplayProps) {

  const handleOption = (option: Option) => () => setOption(option)

  return (<>
    <LinkButton text={"Atualizar perfil"} onClick={handleOption(1)}/>
    <LinkButton text={"Redefinir senha"} onClick={handleOption(2)}/>
  </>);
}