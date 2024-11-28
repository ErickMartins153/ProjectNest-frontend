import clsx from "clsx";
import { useState } from "react";
import { RiEyeCloseLine as ClosedEye } from "@react-icons/all-files/ri/RiEyeCloseLine";
import { RiEyeLine as OpenEye } from "@react-icons/all-files/ri/RiEyeLine";

export type TextBoxProps = {
  id: string,
  name: string,
  textBoxClassName?: string
  inputClassName?: string
  hidable?: boolean
}

export default function TextBox({id, name, textBoxClassName,
                                  inputClassName, hidable}: TextBoxProps) {
  const [hidden, setHidden] = useState(true);

  const inputPadding: string = (hidable ? "ps-4 " : "px-4 ") + "py-2";

  return (
    <div className={clsx("flex w-[100%] rounded-3xl bg-white", textBoxClassName)}>
      <input
        id={id}
        name={name}
        type={hidable && hidden ? "password" : "text"}
        className={clsx(
          "h-full w-full bg-transparent focus:outline-none",
          inputPadding,
          inputClassName,
        )}
      />
      { hidable && (
        <div onClick={() => setHidden((prev) => !prev)}
            className="flex cursor-pointer justify-center items-center
              w-[10%]">
          {hidden ? <ClosedEye/> : <OpenEye/>}
        </div>
      )}
    </div>
  );
}