import { Link } from "react-router-dom";
import clsx from "clsx";

export type LinkButtonProps = {
  text: string;
  path: string;
  className?: string
};

export default function LinkButton({ text, className }: LinkButtonProps) {
  return (
    <Link to="/login" className="text-white no-underline">
      <button className={clsx(
          "bg-secondary-color hover:bg-selected-blue rounded-2xl px-3 py-2",
          className)}>
          {text}
      </button>
    </Link>
  );
}