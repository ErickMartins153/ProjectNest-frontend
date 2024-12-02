type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function Button({ text, onClick }: ButtonProps) {
  function selectHandler() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <button
      className={`flex items-center justify-center rounded-md border-2 bg-blue-500 p-4 text-white hover:bg-blue-600`}
      onClick={selectHandler}
    >
      {text}
    </button>
  );
}
