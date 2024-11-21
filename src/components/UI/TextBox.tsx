import clsx from "clsx";
import { useState } from "react";

type TextBoxProps = {
  id: string,
  name: string,
  classNameDiv?: string
  classNameInput?: string
  hidable?: boolean
}

export default function TextBox({id, name, classNameDiv, classNameInput, hidable}: TextBoxProps) {
  if (hidable) {
    const [hidden, setHidden] = useState(true);
  }

  return (
    <div className={clsx("flex bg-white rounded-3xl w-96", classNameDiv)}>
      <div className="flex-grow">
        <input id={id} name={name} type="password" className={clsx(
            "w-full h-full py-2 px-4 bg-transparent focus:outline-none", classNameInput)}/>
      </div>
    </div>
  );
}