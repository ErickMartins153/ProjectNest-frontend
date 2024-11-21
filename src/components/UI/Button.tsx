import { useState } from "react";

type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  const [selected, setSelected] = useState(false);

  function selectHandler() {
    setSelected((prev) => !prev);
  }

  return (
    <button
      className={`rounded-md border-2 p-4 text-white ${selected ? "bg-[#0d99ff]" : "bg-[#b3b3b3]"}`}
      onClick={selectHandler}
    >
      <h2>{text}</h2>
    </button>
  );
}
