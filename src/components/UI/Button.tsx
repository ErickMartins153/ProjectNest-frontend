type ButtonProps = {
  text: string;
  onClick?: () => void;

  isSelected?: boolean;
};

export default function Button({
  text,
  onClick,
  isSelected = false,
}: ButtonProps) {
  function selectHandler() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <button
      className={`flex items-center justify-center rounded-md border-2 p-4 text-white ${
        isSelected ? "bg-secondary-color" : "bg-selected-blue"
      }`}
      onClick={selectHandler}
    >
      {text}
    </button>
  );
}
