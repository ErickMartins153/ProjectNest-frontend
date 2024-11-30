import clsx from "clsx";
import { useNavigate } from "react-router-dom";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  const navigate = useNavigate();
  return (
    <div
      id="logo"
      className={clsx(
        "flex aspect-square items-center justify-center text-2xl text-white hover:cursor-pointer",
        className,
      )}
      onClick={() => navigate("/")}
    >
      <img src="/logo-white.svg" alt="Logo do Project Nest" />
    </div>
  );
}
