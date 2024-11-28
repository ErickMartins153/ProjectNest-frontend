import { Link } from "react-router-dom";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export type LinkButtonProps = {
  text: string;
  path: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function LinkButton({
  text,
  path,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link to={path} className="text-white no-underline">
      <button
        className={clsx(
          "rounded-2xl bg-secondary-color px-3 py-2 hover:bg-selected-blue",
          className,
        )}
        {...props}
      >
        {text}
      </button>
    </Link>
  );
}
