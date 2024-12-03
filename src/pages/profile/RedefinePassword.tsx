import LinkButton from "../../components/UI/LinkButton.tsx";
import LabelTextBox from "../../components/UI/LabelTextBox.tsx";
import { ChangeEvent, useState } from "react";
import useAuth from "../../hooks/useAuth.ts";

type PasswordChange = {
  oldPassword: string,
  newPassword: string
}


type OnFieldChange = (
  field: keyof (PasswordChange),
  event: ChangeEvent<HTMLInputElement>
) => void;


export default function RedefinePassword() {
  const { changePassword } = useAuth();
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: ""
  })


  const onFieldChange: OnFieldChange = (field, event) => {
    setPasswordChange((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      })
    );
  };

  async function onRedefine() {
    const redefined = await changePassword(passwordChange.oldPassword, passwordChange.newPassword)
    if (redefined) {
      alert("Senha redefinida!")
    }
  }

  return (<>
    <h1 className="text-center mb-8">Redefinir Senha</h1>
    <form className="flex flex-col w-[90%] items-center gap-8 !text-black">

      <LabelTextBox
        label="Senha Antiga"
        labelClassName="!text-white text-[1.6em] ps-4"
        labelTextBoxClassName="!w-[90%]" id="old-password" name="oldPassword"
        hidable={true}
        value={passwordChange.oldPassword} onChange={onFieldChange.bind(null, "oldPassword")}/>

      <LabelTextBox
        label="Senha Nova"
        labelClassName="!text-white text-[1.6em] ps-4"
        labelTextBoxClassName="!w-[90%]" id="new-password" name="newPassword"
        hidable={true}
        value={passwordChange.newPassword} onChange={onFieldChange.bind(null, "newPassword")}/>

      <LinkButton className="!text-white h-16 w-32 text-2xl" text="Atualizar" onClick={onRedefine}/>
    </form>
  </>);

}