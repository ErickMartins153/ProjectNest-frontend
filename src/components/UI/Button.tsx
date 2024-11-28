import { useState } from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  selectable?: boolean;
};

export default function Button({
  text,
  onClick,
  selectable = true,
}: ButtonProps) {
  const [selected, setSelected] = useState(false);

  function selectHandler() {
    if (onClick) {
      onClick();
    }
    if (selectable) {
      setSelected((prev) => !prev);
    }
  }

  return (
    <button
      className={`rounded-md border-2 p-4 text-white ${selected ? "bg-[#0d99ff]" : "bg-[#b3b3b3]"}`}
      onClick={selectHandler}
    >
      <p>{text}</p>
    </button>
  );
}
