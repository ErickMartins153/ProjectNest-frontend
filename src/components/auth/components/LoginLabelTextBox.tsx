import LabelTextBox from "../../UI/LabelTextBox.tsx";

type LoginLabelTextBoxProps = {
  inputName: string;
  labelName: string;
  hidable?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function LoginLabelTextBox({
  inputName,
  labelName,
  hidable,
  onChange,
}: LoginLabelTextBoxProps) {
  return (
    <LabelTextBox
      id={inputName}
      label={labelName}
      name={inputName}
      hidable={hidable}
      labelClassName="ps-3 text-white text-2xl inline-block"
      textBoxClassName="mt-2"
      onChange={onChange}
    />
  );
}
