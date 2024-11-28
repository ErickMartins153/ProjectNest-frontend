import TextBox, { TextBoxProps } from "./TextBox.tsx";
import clsx from "clsx";

export type LabelTextBoxProps = TextBoxProps & {
  labelClassName?: string,
  labelTextBoxClassName?: string,
  label: string
}

export default function LabelTextBox({id, name, hidable, inputClassName, labelClassName,
                                       textBoxClassName, label, labelTextBoxClassName}: LabelTextBoxProps) {
  return (
    <div className={clsx("w-full", labelTextBoxClassName)}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <TextBox id={id} name={name} hidable={hidable}
               textBoxClassName={textBoxClassName} inputClassName={inputClassName} />
    </div>
  );
}