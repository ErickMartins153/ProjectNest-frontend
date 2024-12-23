import clsx from "clsx";
import { useState } from "react";
import { RiEyeCloseLine as ClosedEye } from "@react-icons/all-files/ri/RiEyeCloseLine";
import { RiEyeLine as OpenEye } from "@react-icons/all-files/ri/RiEyeLine";

export type TextBoxProps = {
  id: string;
  name: string;
  textBoxClassName?: string;
  inputClassName?: string;
  placeHolder?: string;
  value?: string;
  hidable?: boolean;
  autoComplete?: "off" | "on";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function TextBox({
  id,
  name,
  textBoxClassName,
  inputClassName,
  hidable,
  onChange,
  required = false,
  autoComplete = "off",
  placeHolder,
  value,
}: TextBoxProps) {
  const [hidden, setHidden] = useState(true);

  const inputPadding: string = (hidable ? "ps-4 " : "px-4 ") + "py-2";

  return (
    <div
      className={clsx("flex w-[100%] rounded-3xl bg-white", textBoxClassName)}
    >
      <input
        id={id}
        name={name}
        type={hidable && hidden ? "password" : "text"}
        className={clsx(
          "h-full w-full bg-transparent focus:outline-none",
          inputPadding,
          inputClassName,
        )}
        onChange={onChange}
        required={required}
        placeholder={placeHolder}
        value={value}
        autoComplete={autoComplete}
      />
      {hidable && (
        <div
          onClick={() => setHidden((prev) => !prev)}
          className="flex w-[10%] cursor-pointer items-center justify-center"
        >
          {hidden ? <ClosedEye /> : <OpenEye />}
        </div>
      )}
    </div>
  );
}
