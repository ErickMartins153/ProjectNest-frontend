import clsx from "clsx";

type LogoProps = {
  className?: string;
}

export default function Logo({className}: LogoProps){
  return (
    <div id="logo"
         className={clsx(
           "aspect-square flex items-center justify-center text-2xl text-white",
           className
         )}>
      <img src='logo-white.svg' alt="Logo do Project Nest"/>
    </div>
  );
}