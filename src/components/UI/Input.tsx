import { InputHTMLAttributes, PropsWithoutRef } from "react";

type InputProps = {
  label: string;
} & Omit<
  PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>>,
  "className" | "placeholder"
>;

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        id={`${label}-input`}
        className="w-full p-2 pt-5 text-base border-2 rounded-md peer focus:border-gray-300 focus:outline-none focus:ring-1"
      />
      <label
        htmlFor={`${label}-input`}
        className="absolute text-sm text-gray-500 transition-all left-2 top-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
      >
        {label}
      </label>
    </div>
  );
}
