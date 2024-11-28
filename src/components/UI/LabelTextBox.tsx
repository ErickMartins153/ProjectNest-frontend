import TextBox, { TextBoxProps } from "./TextBox.tsx";
import clsx from "clsx";

export type LabelTextBoxProps = TextBoxProps & {
  labelClassName?: string;
  labelTextBoxClassName?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function LabelTextBox({
  id,
  name,
  hidable,
  inputClassName,
  labelClassName,
  textBoxClassName,
  label,
  labelTextBoxClassName,
  onChange,
  required,
}: LabelTextBoxProps) {
  return (
    <div className={clsx("w-full", labelTextBoxClassName)}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <TextBox
        id={id}
        name={name}
        hidable={hidable}
        textBoxClassName={textBoxClassName}
        inputClassName={inputClassName}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
